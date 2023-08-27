import math
from Tkinter import *
import tkFont
import matrix


class Simulation:
	''' Coordiante-system: Right-handed, Matrices are column-major ones '''

	WIDTH = 640.0
	HEIGHT = 480.0

	SPEED = 0.05

	EPSILON = 1.0e-8
	ZERO = EPSILON

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
		#In right-handed, counter-clockwise order
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

		#e.g. (7.0, 0.0, 0.0) is a point of the plane of the wall on the positive X axis (on the right)
		self.walls = [matrix.Vector3D(7.0, 0.0, 0.0), matrix.Vector3D(-7.0, 0.0, 0.0), matrix.Vector3D(0.0, 7.0, 0.0), matrix.Vector3D(0.0, -7.0, 0.0), matrix.Vector3D(0.0, 0.0, 7.0), matrix.Vector3D(0.0, 0.0, -7.0)]
		self.wallsnormals = [matrix.Vector3D(-1.0, 0.0, 0.0), matrix.Vector3D(1.0, 0.0, 0.0), matrix.Vector3D(0.0, -1.0, 0.0), matrix.Vector3D(0.0, 1.0, 0.0), matrix.Vector3D(0.0, 0.0, -1.0), matrix.Vector3D(0.0, 0.0, 1.0)]

#################
#		self.cubenormals = []
#		for i in range(len(self.cubefaces)):
#			poly = []
#			for j in range(len(self.cubefaces[i])):
#				poly.append(self.cube[self.cubefaces[i][j]])

#			self.cubenormals.append(self.calcNormalVec(poly))
#################

		self.ang = [0.0, 0.0, 0.0] # phi(x), theta(y), psi(z) of the camera
		self.trans = [0.0, 0.0, 2.0] # translation (x, y, z) of the camera

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
		self.Tr[(0,3)] = self.trans[0]
		self.Tr[(1,3)] = self.trans[1]
		self.Tr[(2,3)] = self.trans[2]

		#The Projection Matrix
		self.Proj = matrix.Matrix(4, 4)	
		#foc controls how much of the screen is viewed
		fov = 60.0 #between 30 and 90 ?
		zfar = 100.0
		znear = 0.1
		S = 1/(math.tan(math.radians(fov/2)))
		A = Simulation.WIDTH/Simulation.HEIGHT
		self.Proj[(0,0)] = S/A
		self.Proj[(1,1)] = S
		self.Proj[(2,2)] = (zfar+znear)/(znear-zfar)
		self.Proj[(3,2)] = -1.0
		self.Proj[(2,3)] = 2*(zfar*znear)/(znear-zfar)
#		self.Proj[(3,3)] = 0.0

		#ToScreen Matrix
		self.toSC = matrix.Matrix(4, 4)
		self.toSC[(0,0)] = Simulation.WIDTH/2
		self.toSC[(1,1)] = -Simulation.HEIGHT/2
		self.toSC[(0,3)] = Simulation.WIDTH/2
		self.toSC[(1,3)] = Simulation.HEIGHT/2

#		self.root.bind("<B1-Motion>", self.dragcallback)
#		self.root.bind("<ButtonRelease-1>", self.releasecallback)
		self.root.bind("<Key>", self.keycallback)
#		self.root.bind("<KeyRelease>", self.keyreleasecallback)

		self.fnt = tkFont.Font(family='Helvetica', size=12, weight='bold')

		self.update()
		mainloop()

	def update(self):
		# Main simulation loop.
		self.graph.delete(ALL)

		self.Rotx[(1,1)] = math.cos(math.radians(360.0-self.ang[0]))
		self.Rotx[(1,2)] = -math.sin(math.radians(360.0-self.ang[0]))
		self.Rotx[(2,1)] = math.sin(math.radians(360.0-self.ang[0]))
		self.Rotx[(2,2)] = math.cos(math.radians(360.0-self.ang[0]))

		self.Roty[(0,0)] = math.cos(math.radians(360.0-self.ang[1]))
		self.Roty[(0,2)] = math.sin(math.radians(360.0-self.ang[1]))
		self.Roty[(2,0)] = -math.sin(math.radians(360.0-self.ang[1]))
		self.Roty[(2,2)] = math.cos(math.radians(360.0-self.ang[1]))

		self.Rotz[(0,0)] = math.cos(math.radians(360.0-self.ang[2]))
		self.Rotz[(0,1)] = -math.sin(math.radians(360.0-self.ang[2]))
		self.Rotz[(1,0)] = math.sin(math.radians(360.0-self.ang[2]))
		self.Rotz[(1,1)] = math.cos(math.radians(360.0-self.ang[2]))

		#The Rotation matrix
		self.Rot = self.Rotx*self.Roty*self.Rotz

		#Translation (just copying)
		self.Tr[(0,3)] = -self.trans[0]
		self.Tr[(1,3)] = -self.trans[1]
		self.Tr[(2,3)] = -self.trans[2]

		#The Transformation matrix
		self.Tsf = self.Scale*self.Shear*self.Rot*self.Tr

		#Computing the normals in __init__ and only rotating them here is the same.
#		print '+++++++++++++++'
#		for i in range(len(self.cubenormals)):
#			print self.Rot*self.cubenormals[i]
#		print '+++++++++++++++'

#		print '************'
		#Cube
		for i in range(len(self.cubefaces)):
			poly = [] #transformed polygon
			for j in range(len(self.cubefaces[0])):
				v = self.cube[self.cubefaces[i][j]]

				# Scale, Shear, Rotate the vertex around X axis, then around Y axis, and finally around Z axis and Translate.
				r = self.Tsf*v

				poly.append(r)

			n = self.calcNormalVec(poly)
#			print n

			if not self.isPolygonFrontFace(poly[0], n): #Backface culling
				continue

			poly2d = []
			inviewingvolume = False
			for j in range(len(poly)):
				# Transform the point from 3D to 2D
				ps = self.Proj*poly[j]

				# Put the screenpoint in the list of transformed vertices
				p = self.toSC*ps
				x = int(p.x)
				y = int(p.y)
				poly2d.append((x, y))

				#if only one point is in the screen (x[-1,1], y[-1,1], z[-1,1]) then draw the whole polygon
				if (-1.0 <= ps.x <= 1.0) and (-1.0 <= ps.y <= 1.0) and (-1.0 <= ps.z <= 1.0):
					inviewingvolume = True

			if inviewingvolume:
				self.graph.create_polygon(*poly2d, fill=self.cls[i]) 

		#Texts (these are in camera-CS)
		txt1 = 'xpos: '+str(self.trans[0])+' ypos: '+str(self.trans[1])+' zpos: '+str(self.trans[2])
		txt2 = 'xrot: '+str(self.ang[0])+' yrot: '+str(self.ang[1])+' zrot: '+str(self.ang[2])

		self.idTxt1 = self.graph.create_text(30,30, text=txt1, fill='white', anchor=SW, font=self.fnt)
		self.idTxt2 = self.graph.create_text(30,60, text=txt2, fill='white', anchor=SW, font=self.fnt)

		vFwd = self.getForwardVec2(self.ang[1])
		txt3 = 'Fwd: '+str(vFwd)
		self.idTxt3 = self.graph.create_text(30,90, text=txt3, fill='white', anchor=SW, font=self.fnt)

	def isPolygonFrontFace(self, v, n):#Clockwise?
		'''v is a vertex of the polygon, n is the normal-vector of the polygon.'''

		#The camera should be at (0.0, 0.0, 0.0) but that doesn't work well.
		#It seems that the camera is at (0.0, 0.0, 1.0)
		c = matrix.Vector3D(0.0, 0.0, 1.0)
		vv = v-c

		r = vv.dot(n)

		return r < 0.0

	def calcNormalVec(self, p):
		'''p is an array of vertices of the polygon/face'''

		v1 = p[0]-p[1]
		v2 = p[0]-p[3]

		v = v1.cross(v2)
		v.normalize()

		return v

	def getForwardVec1(self): #Where the camera is facing. Inverting a matrix is slow
		m = self.Rot.invert()

		f1 = m[(0,2)]
		f2 = m[(1,2)]
		f3 = m[(2,2)]
			
		v = matrix.Vector3D(f1, f2, f3)
		v.normalize()

		#Forward vector is really backward one, so need to be negated
		return -v

	def getForwardVec2(self, yrot): #Where the camera is facing.
		f1 = -math.sin(math.radians(yrot))
		f2 = 0.0
		f3 = -math.cos(math.radians(yrot))
		v = matrix.Vector3D(f1, f2, f3)

		return v

	def isCollisionPlanes(self, campos, camdir):
		num = len(self.walls)
		for i in range(num):
			iscol, dist = self.isCollisionPlane(self.walls[i], self.wallsnormals[i], campos, camdir)

			if iscol and dist < 0.1:
#				print i+1, dist
				return True

		return False
			

	def isCollisionPlane(self, p, n, campos, camdir):
		'''instead of pointonplane (p) and normalofplane (n) we could pass a polygon and calculate its normal vector here. campos is the position of the camera and camdir is the forward vector of the camera'''

		dist = 0.0

		#Dot Product Between Plane Normal And Ray Direction
		dotprod = camdir.dot(n)

		#Determine If Ray Parallel To Plane
		if ((dotprod < Simulation.ZERO) and (dotprod > -Simulation.ZERO)):
			return False, dist

		#Find Distance To Collision Point
		dist = (n.dot(p-campos))/dotprod

		#Test If Collision Behind Start
		if (dist < -Simulation.ZERO):
			return False, dist
 
		return True, dist

	def isCollisionCube(self, campos):
		'''Checks if the camera is inside the cube (this is the bounding-box-technique (bbt) but we have a cube so we dont't need to calculate a bb) '''

		if (campos.z >= self.cube[self.cubefaces[0][0]].z and campos.z <= self.cube[self.cubefaces[2][0]].z) and (campos.y >= self.cube[self.cubefaces[5][0]].y and campos.y <= self.cube[self.cubefaces[4][0]].y) and (campos.x >= self.cube[self.cubefaces[3][0]].x and campos.x <= self.cube[self.cubefaces[1][0]].x):
			return True
		
		return False


	def keycallback(self, event):
#		print event.char
#		print event.keycode
#		print event.keysym

		#Foward
		if event.keysym == 'Up':
			vFwd = self.getForwardVec2(self.ang[1])

			#Is there a collison?
			pos = matrix.Vector3D(self.trans[0]+vFwd.x*Simulation.SPEED, self.trans[1], self.trans[2]+vFwd.z*Simulation.SPEED)
			if self.isCollisionPlanes(pos, vFwd):
				return

			if self.isCollisionCube(pos):
				return

			self.trans[0] += vFwd.x*Simulation.SPEED
			self.trans[2] += vFwd.z*Simulation.SPEED

		#Backward
		elif event.keysym == 'Down':
			vFwd = self.getForwardVec2(self.ang[1])
			vBck = -vFwd

			#Is there a collison?
			pos = matrix.Vector3D(self.trans[0]-vFwd.x*Simulation.SPEED, self.trans[1], self.trans[2]-vFwd.z*Simulation.SPEED)
			if self.isCollisionPlanes(pos, vBck):
				return

			if self.isCollisionCube(pos):
				return

			self.trans[0] -= vFwd.x*Simulation.SPEED
			self.trans[2] -= vFwd.z*Simulation.SPEED

		#Turn right
		elif event.keysym == 'Right':
			self.ang[1] -= 1.5
		#Turn left
		elif event.keysym == 'Left':
			self.ang[1] += 1.5
		#Upwards
		elif event.keysym == 'u':
			#Is there a collison?
			pos = matrix.Vector3D(self.trans[0], self.trans[1]+Simulation.SPEED, self.trans[2])
			vUp = matrix.Vector3D(0.0, 1.0, 0.0)
			if self.isCollisionPlanes(pos, vUp):
				return

			if self.isCollisionCube(pos):
				return

			self.trans[1] += Simulation.SPEED
		#Downwards
		elif event.keysym == 'd':
			#Is there a collison?
			pos = matrix.Vector3D(self.trans[0], self.trans[1]-Simulation.SPEED, self.trans[2])
			vDwn = matrix.Vector3D(0.0, -1.0, 0.0)
			if self.isCollisionPlanes(pos, vDwn):
				return

			if self.isCollisionCube(pos):
				return

			self.trans[1] -= Simulation.SPEED
		#Quit
		elif event.keysym == 'Escape':
			self.quit()

		if self.ang[1] >= 360.0:
			self.ang[1] -= 360.0
		if self.ang[1] < 0.0:
			self.ang[1] += 360.0

		self.update()

	def quit(self):
		self.root.quit()


if __name__ == "__main__":
	Simulation()



