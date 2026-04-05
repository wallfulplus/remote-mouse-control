import pyautogui

class Control:

    def __init__(self):
        print("remote control start ...")
        self.mouseX, self.mouseY = pyautogui.position()
    
    def getMousePosition(self):
        print(f"getMousePosition => {[self.mouseX, self.mouseY]}")
        return [self.mouseX, self.mouseY]

    def move(self, x, y):
        self.mouseX += x
        self.mouseY += y

    def clickLeft(self, down=True):
        if down:
            pyautogui.mouseDown(button='left', duration=1)
            pyautogui.mouseUp(button='left')
        else: 
            pyautogui.mouseUp(button='left')

    def update(self):
        pyautogui.moveTo(self.mouseX, self.mouseY, duration=0.1)