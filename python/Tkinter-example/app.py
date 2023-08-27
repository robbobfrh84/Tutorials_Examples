from Tkinter import *
import ttk
from time import sleep

class Application(Frame):


    def __init__(self, master=None):
        Frame.__init__(self, master)
        self.pack()
        self.createWidgets()
        self.buildCanvas()
        self.animate()


    def createWidgets(self):

        style = ttk.Style()
        style.map("C.TButton", foreground=[('pressed', 'red'), ('active', 'blue')],
            background=[('pressed', '!disabled', 'black'),('active', 'white')])

        self.label = Label(self)
        self.label["text"] = "I am a label"
        self.label["fg"] = "blue"
        self.label["bg"] = "#ccc"
        self.label.pack({"side": "top"})

        self.QUIT = ttk.Button(self, text="QUIT", style="C.TButton")
        self.QUIT["command"] =  self.quit
        self.QUIT.pack()

        self.hi_there = ttk.Button(self, text="stop", style="C.TButton")
        self.hi_there["command"] = self.stop_resume
        self.hi_there.pack({"side": "bottom"})


    def buildCanvas(self):
        self.fill = "green"
        self.x = 1
        self.y = 1
        self.isStopped = False
        self.canvas = Canvas(self, width=200, height=190, bg="#333")
        self.oval = self.canvas.create_oval(
            10, 50, 60, 100, outline="blue", width="5", fill=self.fill)
        self.canvas.pack()



    def stop_resume(self):
        if (self.hi_there["text"] == "stop"):
            self.x = 0
            self.y = 0
            self.fill = "red"
            self.hi_there["text"] = "resume"
        else:
            self.x = 1
            self.y = 1
            self.fill = "green"
            self.hi_there["text"] = "stop"
        self.canvas.itemconfig(self.oval, fill=self.fill)


    def animate(self):
        x, y = self.canvas.coords(self.oval)[0], self.canvas.coords(self.oval)[1]
        if x > 150: self.x = -1
        if x <= 5: self.x = 1
        if y > 140: self.y = -1
        if y <= 5: self.y = 1
        self.canvas.move(self.oval, self.x, self.y)
        self.canvas.after(20, self.animate)



root = Tk()
root.title("! Basic Tkinter Example !")
root.geometry("400x300+10+30") # Positioning Y is from absolute top. but mac forces it down.

app = Application(master=root)
app.mainloop()
root.destroy()
