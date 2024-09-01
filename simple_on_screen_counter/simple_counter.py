import time
import keyboard
import sys
from tkinter import *
from tkinter import messagebox

 
root = Tk()
# Make background transparent.
root.configure(bg="")

# Places the window on the screen.
# Tinker with this until it's in the spot you want.
root.geometry("+1650+830")

# Brings window on top of all other windows.
root.wm_attributes("-topmost", True)
root.wm_attributes("-transparentcolor", "black")

# Window size + title.
root.geometry("300x250")
root.title("Simple Counter")

# Make window not resizable + fixed in place.
root.resizable(width=False, height=False)
root.overrideredirect(True)
  
# Declaration of variables
counter_strvar = StringVar()
counter_strvar.set("0")

label = Label(root, textvariable=counter_strvar, bg='black', fg='red', font=("Courier", 88))
label.pack(ipadx=100, ipady=100)

global counter
global MAX_COUNTER_VAL

counter = 0
MAX_COUNTER_VAL = 99
  
def increment_counter():
    global counter
    if counter < MAX_COUNTER_VAL:
        counter += 1
        counter_strvar.set(str(counter))
        
        # Update GUI window.
        root.update()
  
    else:
        messagebox.showinfo("Max value reached", "Max counter value reached, resetting to 0.")
        
        counter = 0
        counter_strvar.set(str(counter))
        
        root.update()


def reset_counter():
    counter = 0
    counter_strvar.set(str(counter))

    root.update()

def close_counter():
    global root
    root.quit()
    sys.exit()

keyboard.add_hotkey('`', increment_counter)
keyboard.add_hotkey('ctrl+`', reset_counter)
keyboard.add_hotkey('alt+`', close_counter)

root.mainloop()
