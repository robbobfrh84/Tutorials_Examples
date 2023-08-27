import math
from Tkinter import *
import matrix



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

		#Let these be in World-coordinates (worldview-matrix already applied)
		####In right-handed, counter-clockwise order
		self.cube = [
			matrix.Vector3D(-0.5,0.5,-0.5),
			matrix.Vector3D(0.5,0.5,-0.5),
			matrix.Vector3D(0.5,-0.5,-0.5),
			matrix.Vector3D(-0.5,-0.5,-0.5),
			matrix.Vector3D(-0.5,0.5,0.5),
			matrix.Vector3D(0.5,0.5,0.5),
			matrix.Vector3D(0.5,-0.5,0.5),
			matrix.Vector3D(-0.5,-0.5,0.5)
        	]

		# Define the vertices that compose each of the 6 faces. These numbers are
		# indices to the vertices list defined above.
		self.cubefaces = [(0,1,2,3),(1,5,6,2),(5,4,7,6),(4,0,3,7),(0,4,5,1),(3,2,6,7)] 
		self.cls = ['red', 'green', 'blue', 'yellow', 'cyan', 'white']

		self.ang = [0.0, 0.0, 0.0] # phi(x), theta(y), psi(z)
		self.trans = [0.0, 0.0, -2.0] # translation (x, y, z) (e.g. if want to move the Camera to (0, 0, 2) then (0, 0, -2) need to be entered)

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
		#fov controls how much of the screen is viewed
		fov = 90.0 #between 30 and 90 ?
		zfar = 100.0
		znear = 0.1
		S = 1/(math.tan(math.radians(fov/2)))
#1st version (Perspective Projection)
		self.Proj[(0,0)] = S
		self.Proj[(1,1)] = S
		self.Proj[(2,2)] = -zfar/(zfar-znear)
		self.Proj[(3,2)] = -1.0
		self.Proj[(2,3)] = -(zfar*znear)/(zfar-znear)
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
#		A = Simulation.WIDTH/Simulation.HEIGHT
#		self.Proj[(0,0)] = S/A
#		self.Proj[(1,1)] = S
#		self.Proj[(2,2)] = (zfar+znear)/(znear-zfar)
#		self.Proj[(3,2)] = -1.0
#		self.Proj[(2,3)] = 2*(zfar*znear)/(znear-zfar)
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

		#Cube
		for i in range(len(self.cubefaces)):
			inviewingvolume = False
			poly = [] #transformed polygon
			for j in range(len(self.cubefaces[0])):
				v = self.cube[self.cubefaces[i][j]]

				# Scale, Shear, Rotate the vertex around X axis, then around Y axis, and finally around Z axis and Translate.
				r = self.Tsf*v

				# Transform the point from 3D to 2D
				ps = self.Proj*r

				# Put the screenpoint in the list of transformed vertices
				p = self.toScreenCoords(ps)
				x = int(p.x)
				y = int(p.y)
				poly.append((x, y))

				#if only one vertex is in the screen (x[-1,1], y[-1,1], z[-1,1]) then draw the whole polygon
				if (-1.0 <= ps.x <= 1.0) and (-1.0 <= ps.y <= 1.0) and (-1.0 <= ps.z <= 1.0):
					inviewingvolume = True

			if inviewingvolume:
				if self.isPolygonFrontFace(poly): #Backface culling
					self.graph.create_polygon(*poly, fill=self.cls[i])


	def isPolygonFrontFace(self, pts):#Clockwise?
		summa = 0.0
		num = len(pts)
		for i in range(num-1):
			summa += (pts[i+1][0]-pts[i][0])*(pts[i+1][1]+pts[i][1])

		summa += (pts[0][0]-pts[num-1][0])*(pts[0][1]+pts[num-1][1])

		return summa > 0.0


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



