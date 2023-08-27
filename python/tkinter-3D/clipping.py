import math
from Tkinter import *
import matrix



class Simulation:
	''' Coordiante-system: Right-handed, Matrices are column-major ones '''

	WIDTH = 640.0
	HEIGHT = 640.0

	RATE = 3
	SPEED = 2

	#Clipping
	CL_INSIDE	= 0
	CL_LEFT		= 1
	CL_RIGHT	= 2
	CL_BOTTOM	= 4
	CL_TOP		= 8
	CL_FRONT	= 16
	CL_BACK		= 32

	PLANE = 1	# [-1, 1] the clipping planes


	def computeOutCode(self, x, y, z):
		clcode = Simulation.CL_INSIDE

		if (x < -Simulation.PLANE):
			clcode |= Simulation.CL_LEFT
		elif (x > Simulation.PLANE):
			clcode |= Simulation.CL_RIGHT
		if (y < -Simulation.PLANE):
			clcode |= Simulation.CL_BOTTOM
		elif (y > Simulation.PLANE):
			clcode |= Simulation.CL_TOP
		if (z > Simulation.PLANE):
			clcode |= Simulation.CL_FRONT
		elif (z < -Simulation.PLANE):
			clcode |= Simulation.CL_BACK

		return clcode


	def clipping(self, v0, v1):
		x0 = v0.x
		y0 = v0.y
		z0 = v0.z
		x1 = v1.x
		y1 = v1.y
		z1 = v1.z

		outcode0 = self.computeOutCode(x0, y0, z0)
		outcode1 = self.computeOutCode(x1, y1, z1)
		accept = False

		while(True):
			if (not(outcode0 | outcode1)):
				accept = True
				break
			elif (outcode0 & outcode1):
				break
			else:
				x = y = z = 0.0
				outcode = outcode0
				if (outcode1 != Simulation.CL_INSIDE):
					outcode = outcode1

				if (outcode & Simulation.CL_TOP):
					x = x0+(x1-x0)*(Simulation.PLANE-y0)/(y1-y0)
					z = z0+(z1-z0)*(Simulation.PLANE-y0)/(y1-y0)
					y = Simulation.PLANE
				elif (outcode & Simulation.CL_BOTTOM):
					x = x0+(x1-x0)*(-Simulation.PLANE-y0)/(y1-y0)
					z = z0+(z1-z0)*(-Simulation.PLANE-y0)/(y1-y0)
					y = -Simulation.PLANE
				elif (outcode & Simulation.CL_RIGHT):
					y = y0+(y1-y0)*(Simulation.PLANE-x0)/(x1-x0)
					z = z0+(z1-z0)*(Simulation.PLANE-x0)/(x1-x0)
					x = Simulation.PLANE
				elif (outcode & Simulation.CL_LEFT):
					y = y0+(y1-y0)*(-Simulation.PLANE-x0)/(x1-x0)
					z = z0+(z1-z0)*(-Simulation.PLANE-x0)/(x1-x0)
					x = -Simulation.PLANE
				elif (outcode & Simulation.CL_FRONT):
					x = x0+(x1-x0)*(Simulation.PLANE-z0)/(z1-z0)
					y = y0+(y1-y0)*(Simulation.PLANE-z0)/(z1-z0)
					z = Simulation.PLANE
				elif (outcode & Simulation.CL_BACK):
					x = x0+(x1-x0)*(-Simulation.PLANE-z0)/(z1-z0)
					y = y0+(y1-y0)*(-Simulation.PLANE-z0)/(z1-z0)
					z = -Simulation.PLANE

				if (outcode == outcode0):
					x0 = x
					y0 = y
					z0 = z
					outcode0 = self.computeOutCode(x0, y0, z0)
				else:
					x1 = x
					y1 = y
					z1 = z
					outcode1 = self.computeOutCode(x1, y1, z1)

		return accept, matrix.Vector3D(x0, y0, z0), matrix.Vector3D(x1, y1, z1)


	def __init__(self):
		self.root = Tk()
		self.root.resizable(False, False)
		self.root.title('3D')
		left = (self.root.winfo_screenwidth() - Simulation.WIDTH) / 2
		top = (self.root.winfo_screenheight() - Simulation.HEIGHT) / 2
		self.root.geometry('%dx%d+%d+%d' % (Simulation.WIDTH, Simulation.HEIGHT, left, top))
		self.graph = Canvas(self.root, width=Simulation.WIDTH, height=Simulation.HEIGHT, background='black')
		self.graph.pack()

		#normal vectors
		self.nx = matrix.Vector3D(1, 0, 0)	# normal vector of x=-1 or x=1 plane
		self.ny = matrix.Vector3D(0, 1, 0)	# normal vector of y=-1 or y=1 plane
		self.nz = matrix.Vector3D(0, 0, 1)	# normal vector of z=-1 or z=1 plane

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
		#Projection will project to [-1; 1] so the points need to be scaled on screen
		px = min(((pv.x+1)*0.5*Simulation.WIDTH), Simulation.WIDTH-1)
		#Reflect the Y-coordinate because the screen it goes downwards
		py = min(((1-(pv.y+1)*0.5)*Simulation.HEIGHT), Simulation.HEIGHT-1)

		return matrix.Vector3D(int(px), int(py), 1)


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
		inviewingvolume = len(self.cubefaces[0])*[False] 
		for i in range(len(self.cubefaces)):
			pvs = []		# projected vertices
			for j in range(len(self.cubefaces[0])):
				v = self.cube[self.cubefaces[i][j]]

				# Scale, Shear, Rotate the vertex around X axis, then around Y axis, and finally around Z axis and Translate.
				r = self.Tsf*v

				# Transform the point from 3D to 2D
				ps = self.Proj*r
				pvs.append(ps)

				if (-1.0 <= ps.x <= 1.0) and (-1.0 <= ps.y <= 1.0) and (-1.0 <= ps.z <= 1.0):
					inviewingvolume[j] = True
				else:
					inviewingvolume[j] = False

			if True in inviewingvolume:
				cpvs = []	# clipped pvs
				#clipping
				for j in range(len(pvs)-1):
					res, ps1, ps2 = self.clipping(pvs[j], pvs[j+1])

					if (res):
						cpvs.append((ps1, ps2))

				res, ps1, ps2 = self.clipping(pvs[len(pvs)-1], pvs[0])

				if (res):
					cpvs.append((ps1, ps2))
						
				for j in range(len(cpvs)):
					# Put the screenpoint in the list of transformed vertices
					p1 = self.toScreenCoords(cpvs[j][0])
					x1 = int(p1.x)
					y1 = int(p1.y)
					p2 = self.toScreenCoords(cpvs[j][1])
					x2 = int(p2.x)
					y2 = int(p2.y)

					self.graph.create_line(x1, y1, x2, y2, fill='white') 


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



