import math
from Tkinter import *
import matrix


class Circle3D:
	STEP = 6*0.017453292 # x* (1 degree in radians)

	def __init__(self):
		begPt = matrix.Vector3D(0.0, 0.5, 0.0)
		self.vertices = [begPt]


	def create(self):
		#first convert to polar coordinates in 2D because the circle will be drawn in 2D and then it can be rotated
		r, rtheta = self.toPolar(self.vertices[0])

		#rotate to get the vertices
		num = int(2*math.pi/Circle3D.STEP)
		i = 0.0
		while(i < num):
			rtheta += Circle3D.STEP
			p3 = self.toRectangular2D(r, rtheta)
			self.vertices.append(p3)
			i += 1


	def rotate(self, angle):
		vts = []
		for i in range(len(self.vertices)):
			r = self.vertices[i].rotateX(angle[0]).rotateY(angle[1]).rotateZ(angle[2])
			vts.append(r)

		return vts


	def toSpherical(self, v):
		r = math.sqrt(math.pow(v.x, 2)+math.pow(v.y, 2)+math.pow(v.z, 2))
		rphi = math.atan2(v.y, v.x)
		rtheta = math.acos(v.z/r)

		return r, rphi, rtheta


	def toRectangular(self, r, rphi, rtheta):
		x = r*math.sin(rtheta)*math.cos(rphi)
		y = r*math.sin(rtheta)*math.sin(rphi)
		z = r*math.cos(rtheta)

		return matrix.Vector3D(x, y, z)


	def toPolar(self, v): #2D
		r = math.sqrt(math.pow(v.x, 2)+math.pow(v.y, 2))
		rtheta = math.atan2(v.y, v.x)

		return r, rtheta


	def toRectangular2D(self, r, rtheta):
		x = r*math.cos(rtheta)
		y = r*math.sin(rtheta)

		return matrix.Vector3D(x, y, 0)


class Simulation:
	''' Coordiante-system: Right-handed, Matrices are column-major ones '''

	WIDTH = 640.0
	HEIGHT = 640.0

	RATE = 3
	SPEED = 2

	def __init__(self):
		self.root = Tk()
		self.root.resizable(False, False)
		self.root.title('3D')
		left = (self.root.winfo_screenwidth() - Simulation.WIDTH) / 2
		top = (self.root.winfo_screenheight() - Simulation.HEIGHT) / 2
		self.root.geometry('%dx%d+%d+%d' % (Simulation.WIDTH, Simulation.HEIGHT, left, top))
		self.graph = Canvas(self.root, width=Simulation.WIDTH, height=Simulation.HEIGHT, background='black')
		self.graph.pack()

		#The vectors of the Coordinate System (CS)
		self.cs = [
			matrix.Vector3D(0.0, 0.0, 0.0), #Origin
			matrix.Vector3D(0.5, 0.0, 0.0), #X
			matrix.Vector3D(0.0, 0.5, 0.0), #Y
			matrix.Vector3D(0.0 ,0.0, 0.5), #Z
			]

		self.c3d = Circle3D()
		self.c3d.create()

		self.ang = [0.0, 0.0, 0.0] # phi(x), theta(y), psi(z)
		self.trans = [0.0, 0.0, 0.0] # translation (x, y, z) (e.g. if want to move the Camera to (0, 0, 2) then (0, 0, -2) need to be entered)

		#The matrices (Scale, Shear, Rotate, Translate) apply to the View/Camera

		#The Scale Matrix
		self.Scale = matrix.Matrix(4, 4)
		Scalex = 1.0
		Scaley = 1.0
		Scalez = 1.0
		self.Scale[(0,0)] = Scalex
		self.Scale[(1,1)] = Scaley
		self.Scale[(2,2)] = Scalez

		#The Shear Matrix
		self.Shearxy = matrix.Matrix(4, 4)
		self.Shearxy[(0,2)] = 0.0
		self.Shearxy[(1,2)] = 0.0
		self.Shearxz = matrix.Matrix(4, 4)
		self.Shearxz[(0,1)] = 0.0
		self.Shearxz[(2,1)] = 0.0
		self.Shearyz = matrix.Matrix(4, 4)
		self.Shearyz[(1,0)] = 0.0
		self.Shearyz[(2,0)] = 0.0
		self.Shear = self.Shearxy*self.Shearxz*self.Shearyz

		#The Rotation Matrices
		self.Rotx = matrix.Matrix(4,4)
		self.Roty = matrix.Matrix(4,4)
		self.Rotz = matrix.Matrix(4,4)

		#The Translation Matrix (will contain xoffset, yoffset, zoffset)
		self.Tr = matrix.Matrix(4, 4)	

		#The Projection Matrix
		self.Proj = matrix.Matrix(4, 4)	
		#foc controls how much of the screen is viewed
		fov = 90.0 #between 30 and 90 ?
		zfar = 100.0
		znear = 0.1
		S = 1/(math.tan(math.radians(fov/2)))
#1st version (Perspective Projection)
#		self.Proj[(0,0)] = S
#		self.Proj[(1,1)] = S
#		self.Proj[(2,2)] = -zfar/(zfar-znear)
#		self.Proj[(3,2)] = -1.0
#		self.Proj[(2,3)] = -(zfar*znear)/(zfar-znear)
#		self.Proj[(3,3)] = 0.0 #this should be zero acc. to the docs but it doesn't work

#2nd version (Simple Projection)
#		self.Proj[(2,3)] = -1.0
#		self.Proj[(3,3)] = 0.0

#3rd version (Perspective Projection) (Dr HS Fortuna Playstation)
#		A = Simulation.WIDTH/Simulation.HEIGHT
#		self.Proj[(0,0)] = S/A
#		self.Proj[(1,1)] = S
#		self.Proj[(2,2)] = (zfar+znear)/(zfar-znear)
#		self.Proj[(3,2)] = -1.0
#		self.Proj[(2,3)] = -2*(zfar*znear)/(zfar-znear)
#		self.Proj[(3,3)] = 0.0

#4th version (Perspective Projection) (OpenGL)
		A = Simulation.WIDTH/Simulation.HEIGHT
		self.Proj[(0,0)] = S/A
		self.Proj[(1,1)] = S
		self.Proj[(2,2)] = (zfar+znear)/(znear-zfar)
		self.Proj[(3,2)] = -1.0
		self.Proj[(2,3)] = 2*(zfar*znear)/(znear-zfar)
#		self.Proj[(3,3)] = 0.0

		self.lctrl_pressed = False

		self.root.bind("<B1-Motion>", self.dragcallback)
		self.root.bind("<ButtonRelease-1>", self.releasecallback)
		self.root.bind("<Key>", self.keycallback)
		self.root.bind("<KeyRelease>", self.keyreleasecallback)

		self.cnt = Simulation.RATE
		self.prevmouseX = 0.0
		self.prevmouseY = 0.0

		self.update()
		mainloop()

	def toScreenCoords(self, pv):
#		print str(pv)
		#Projection will project to [-1; 1] so the points need to be scaled on screen
#		px = min(((pv.x+1)*0.5*Simulation.WIDTH), Simulation.WIDTH-1)
		#Reflect the Y-coordinate because the screen it goes downwards
#		py = min(((1-(pv.y+1)*0.5)*Simulation.HEIGHT), Simulation.HEIGHT-1)

#		return matrix.Vector3D(int(px), int(py), 1)

		#Screen matrix
		SC = matrix.Matrix(4, 4)
		SC[(0,0)] = Simulation.WIDTH/2
		SC[(1,1)] = -Simulation.HEIGHT/2
		SC[(0,3)] = Simulation.WIDTH/2
		SC[(1,3)] = Simulation.HEIGHT/2

		return SC*pv

	def update(self):
		# Main simulation loop.
		self.graph.delete(ALL)

		self.Rotx[(1,1)] = math.cos(math.radians(self.ang[0]))
		self.Rotx[(1,2)] = -math.sin(math.radians(self.ang[0]))
		self.Rotx[(2,1)] = math.sin(math.radians(self.ang[0]))
		self.Rotx[(2,2)] = math.cos(math.radians(self.ang[0]))

		self.Roty[(0,0)] = math.cos(math.radians(self.ang[1]))
		self.Roty[(0,2)] = math.sin(math.radians(self.ang[1]))
		self.Roty[(2,0)] = -math.sin(math.radians(self.ang[1]))
		self.Roty[(2,2)] = math.cos(math.radians(self.ang[1]))

		self.Rotz[(0,0)] = math.cos(math.radians(self.ang[2]))
		self.Rotz[(0,1)] = -math.sin(math.radians(self.ang[2]))
		self.Rotz[(1,0)] = math.sin(math.radians(self.ang[2]))
		self.Rotz[(1,1)] = math.cos(math.radians(self.ang[2]))

		#The Rotation matrix
		self.Rot = self.Rotx*self.Roty*self.Rotz

		self.Tr[(0,3)] = self.trans[0]
		self.Tr[(1,3)] = self.trans[1]
		self.Tr[(2,3)] = self.trans[2]

		#The Transformation matrix
		self.Tsf = self.Scale*self.Shear*self.Rot*self.Tr

		inviewingvolume = False

		#First draw the lines of the CS
		tvs = [] #transformed vectors
		for v in self.cs:
			r = self.Tsf*v
			ps = self.Proj*r
			tvs.append(self.toScreenCoords(ps))

			#if only one vertex is in the screen (x[-1,1], y[-1,1], z[-1,1]) then 
			# draw the whole object (this could be done on polygon-level)
			if (-1.0 <= ps.x <= 1.0) and (-1.0 <= ps.y <= 1.0) and (-1.0 <= ps.z <= 1.0):
				inviewingvolume = True

		if inviewingvolume:
			self.graph.create_line(tvs[0].x, tvs[0].y, tvs[1].x, tvs[1].y, fill='red') 
			self.graph.create_line(tvs[0].x, tvs[0].y, tvs[2].x, tvs[2].y, fill='green') 
			self.graph.create_line(tvs[0].x, tvs[0].y, tvs[3].x, tvs[3].y, fill='blue') 
		#End of drawing of the lines of the CS

		inviewingvolume = False

		t = []
		for v in self.c3d.vertices:
			r = self.Tsf*v
			ps = self.Proj*r
			scV = self.toScreenCoords(ps)
			t.append((scV.x, scV.y))

			#if only one vertex is in the screen (x[-1,1], y[-1,1], z[-1,1]) then 
			# draw the whole object (this could be done on polygon-level)
			if (-1.0 <= ps.x <= 1.0) and (-1.0 <= ps.y <= 1.0) and (-1.0 <= ps.z <= 1.0):
				inviewingvolume = True

		if inviewingvolume:
			#create_polygon treats the circle as an opaque polygon
#			cc = self.graph.create_polygon(*t, outline="white")#, width=4)#, fill="white")
			#so we will draw the lines ourselves
			for i in range(len(t)-1):
				self.graph.create_line(t[i][0], t[i][1], t[i+1][0], t[i+1][1], fill='white') 
			self.graph.create_line(t[len(t)-1][0], t[len(t)-1][1], t[0][0], t[0][1], fill='white') 


	def dragcallback(self, event):
#		It's also possible to use the angle calculated from the mousepos-change from the center of the screen:
#		dx = event.x - Simulation.WIDTH/2
#		dy = event.y - Simulation.HEIGHT/2
#		ang = math.degrees(math.atan2(dy, dx))

#		if ang < 0.0:
#			ang += 360.0
		self.cnt -= 1
		if self.cnt == 0:
			self.cnt = Simulation.RATE
			diffX = event.x-self.prevmouseX
			diffY = event.y-self.prevmouseY

			if not self.lctrl_pressed:
				self.ang[0] += diffY*Simulation.SPEED
				self.ang[1] += diffX*Simulation.SPEED

				if self.ang[0] >= 360.0:
					self.ang[0] -= 360.0
				if self.ang[0] < 0.0:
					self.ang[0] += 360.0
				if self.ang[1] >= 360.0:
					self.ang[1] -= 360.0
				if self.ang[1] < 0.0:
					self.ang[1] += 360.0

			else:
				self.ang[2] += diffX*Simulation.SPEED
				if self.ang[2] >= 360.0:
					self.ang[2] -= 360.0
				if self.ang[2] < 0.0:
					self.ang[2] += 360.0

			self.update()

		self.prevmouseX = event.x
		self.prevmouseY = event.y


	def releasecallback(self, event):
		self.cnt = Simulation.RATE
		self.prevmouseX = 0.0
		self.prevmouseY = 0.0


	def keycallback(self, event):
#		print event.char
#		print event.keycode
#		print event.keysym
		if event.keysym == "Control_L":
			self.lctrl_pressed = True


	def keyreleasecallback(self, event):
		if event.keysym == "Control_L":
			self.lctrl_pressed = False


if __name__ == "__main__":
	Simulation()



