import math
from Tkinter import *
import matrix


class IcoSphere:

	def __init__(self):
		self.vertices = []
		self.faces = []
		self.midpointcache = {}
		self.idx = -1

	def create(self, recursionlevel = 1):
		#create 12 vertices of a icosahedron
		t = (1.0+math.sqrt(5.0))/2.0
		self.addVertex(matrix.Vector3D(-1.0, t, 0.0))
		self.addVertex(matrix.Vector3D(1.0, t, 0.0))
		self.addVertex(matrix.Vector3D(-1.0, -t, 0.0))
		self.addVertex(matrix.Vector3D(1.0, -t, 0.0))

		self.addVertex(matrix.Vector3D(0.0, -1.0, t))
		self.addVertex(matrix.Vector3D(0.0, 1.0, t))
		self.addVertex(matrix.Vector3D(0.0, -1.0, -t))
		self.addVertex(matrix.Vector3D(0.0, 1.0, -t))

		self.addVertex(matrix.Vector3D(t, 0.0, -1.0))
		self.addVertex(matrix.Vector3D(t, 0.0, 1.0))
		self.addVertex(matrix.Vector3D(-t, 0.0, -1.0))
		self.addVertex(matrix.Vector3D(-t, 0.0, 1.0))

		#create 20 triangles of the icosahedron
		#5 faces around point 0
		self.faces.append((0, 11, 5))
		self.faces.append((0, 5, 1))
		self.faces.append((0, 1, 7))
		self.faces.append((0, 7, 10))
		self.faces.append((0, 10, 11))

		#5 adjacent faces
		self.faces.append((1, 5, 9))
		self.faces.append((5, 11, 4))
		self.faces.append((11, 10, 2))
		self.faces.append((10, 7, 6))
		self.faces.append((7, 1, 8))

		#5 faces around point 3
		self.faces.append((3, 9, 4))
		self.faces.append((3, 4, 2))
		self.faces.append((3, 2, 6))
		self.faces.append((3, 6, 8))
		self.faces.append((3, 8, 9))

		#5 adjacent faces
		self.faces.append((4, 9, 5))
		self.faces.append((2, 4, 11))
		self.faces.append((6, 2, 10))
		self.faces.append((8, 6, 7))
		self.faces.append((9, 8, 1))

		#refine triangles
		for i in range(recursionlevel):
			faces2 = []
			for f in self.faces:
				a = self.getMidPoint(f[0], f[1])
				b = self.getMidPoint(f[1], f[2])
				c = self.getMidPoint(f[2], f[0])

				faces2.append((f[0], a, c))
				faces2.append((f[1], b, a))
				faces2.append((f[2], c, b))
				faces2.append((a, b, c))

			self.faces = faces2


	def addVertex(self, v):
		v.normalize() #radius is 1.0
		self.vertices.append(v)

		self.idx += 1

		return self.idx

	def getMidPoint(self, i1, i2):
		'''i1 and i2 are indices in the vertices array'''

		p1 = min(i1, i2)
		p2 = max(i1, i2)

		if (self.midpointcache.has_key((p1,p2))):
			return self.midpointcache[(p1,p2)]

		v = matrix.Vector3D((self.vertices[p1].x+self.vertices[p2].x)/2.0, (self.vertices[p1].y+self.vertices[p2].y)/2.0, (self.vertices[p1].z+self.vertices[p2].z)/2.0)
		i = self.addVertex(v)

		self.midpointcache[(p1,p2)] = i

		return i


class Simulation:
	''' Coordiante-system: Right-handed, Matrices are column-major ones '''

	WIDTH = 640.0
	HEIGHT = 480.0

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
			matrix.Vector3D(1.0, 0.0, 0.0), #X
			matrix.Vector3D(0.0, 1.0, 0.0), #Y
			matrix.Vector3D(0.0 ,0.0, 1.0), #Z
			]

		self.sphere = IcoSphere()
		self.sphere.create()

		self.ang = [0.0, 0.0, 0.0] # phi(x), theta(y), psi(z)
		self.trans = [0.0, 0.0, 0.0] # translation (x, y, z) (e.g. if want to move the Camera to (0, 0, 2) then (0, 0, -2) need to be entered)

		#The matrices (Scale, Shear, Rotate, Translate) apply to the View/Camera

		#The Scale Matrix
		self.Scale = matrix.Matrix(4, 4)
		Scalex = 0.5
		Scaley = 0.5
		Scalez = 0.5
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
		for v in self.sphere.vertices:
			r = self.Tsf*v
			ps = self.Proj*r
			scV = self.toScreenCoords(ps)
			t.append((scV.x, scV.y))

			#if only one vertex is in the screen (x[-1,1], y[-1,1], z[-1,1]) then 
			# draw the whole object (this could be done on polygon-level)
			if (-1.0 <= ps.x <= 1.0) and (-1.0 <= ps.y <= 1.0) and (-1.0 <= ps.z <= 1.0):
				inviewingvolume = True

		if inviewingvolume:
			fnum = len(self.sphere.faces)
			vnum = len(self.sphere.faces[0])
			for i in range(fnum):
				for j in range(vnum-1):
					x1 = t[self.sphere.faces[i][j]][0]
					y1 = t[self.sphere.faces[i][j]][1]
					x2 = t[self.sphere.faces[i][j+1]][0]
					y2 = t[self.sphere.faces[i][j+1]][1]
					self.graph.create_line(x1, y1, x2, y2, fill='white') 

				x1 = t[self.sphere.faces[i][vnum-1]][0]
				y1 = t[self.sphere.faces[i][vnum-1]][1]
				x2 = t[self.sphere.faces[i][0]][0]
				y2 = t[self.sphere.faces[i][0]][1]
				self.graph.create_line(x1, y1, x2, y2, fill='white') 

	def dragcallback(self, event):
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



