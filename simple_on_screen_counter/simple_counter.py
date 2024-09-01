import time
from tkinter import *
from tkinter import messagebox
 
 
root = Tk()
# Make background transparent.
root.configure(bg="")

# Places the window on the screen.
root.geometry("+250+250")

# Brings window on top of all other windows.
root.wm_attributes("-topmost", True)
root.wm_attributes("-transparentcolor", "white")

root.geometry("300x250")
root.title("Simple Counter")

# Make window not resizable.
root.resizable(width=False, height=False)
  
# Declaration of variables
counter_strvar = StringVar()
counter_strvar.set("0")

label = Label(root, textvariable=counter_strvar)
label.pack(ipadx=10, ipady=10)



global counter
global MAX_COUNTER_VAL

counter = 0
MAX_COUNTER_VAL = 3

# User input - not needed for now.  
# secondEntry= Entry(root, width=3, font=("Arial",18,""),
#                    textvariable=second)
# secondEntry.place(x=180,y=20)
  
def increment_counter():
    global counter
    if counter < MAX_COUNTER_VAL:
        counter += 1
        counter_strvar.set(str(counter))
        
        # Update GUI window.
        root.update()
  
        # when temp value = 0; then a messagebox pop's up
        # with a message:"Time's up"
    else:
        messagebox.showinfo("Simple counter notification", "Max counter value reached, resetting to 0.")
        
        counter = 0
        counter_strvar.set(str(counter))
        
        root.update()


def reset_counter():
    messagebox.showinfo("Simple counter notification", "Resetting counter.")
    time.sleep(1)

    counter = 0
    counter_strvar.set(str(counter))

    root.update()

# button widget
increment_btn = Button(root, text='Increment counter', bd='5', command=increment_counter)
increment_btn.place(x=70, y=120)

reset_btn = Button(root, text="Reset counter", bd='5', command=reset_counter)
reset_btn.place(x=70, y=150)

root.mainloop()
