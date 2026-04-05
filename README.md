# Remote Control

這個專案是一個簡單的手機遠端控制系統，透過本機端 Python WebSocket 伺服器與網頁，讓手機掃描 QR Code 後即可遠端控制電腦的滑鼠移動與左鍵點擊。

This project is a simple mobile remote control system. By using a local Python WebSocket server and a  web page, it allows a mobile phone to control computer mouse movement and left-clicks after scanning a QR Code.

---

## Describe

- 啟動 Python WebSocket 伺服器
Python WebSocket Server establishes a real-time communication channel.
- 取得本機 IP 地址
Simplifies mobile connection within the same LAN
- 在 `index.html` 頁面產生 QR Code 手機掃描 QR Code 開啟控制頁面
Generates a connection QR code on the index.html page
- 控制頁面透過 WebSocket 傳送滑鼠移動與點擊指令給伺服器
Sends mouse movement and click commands via a web interface
- 伺服器透過 `pyautogui` 操控電腦滑鼠
The server executes mouse actions using pyautogui

---

## quick start

##### step1
`pip install -r requirements.txt`
##### step2
`py .\app\server.py` or `python .\app\server.py`
##### step3
`python -m http.server 3000 --bind 0.0.0.0`
##### step4
open [http://localhost:3000/index.html](http://localhost:3000/index.html)
use mobile scan into it

---

## Demo
[遠端控制滑鼠 demo](https://www.youtube.com/watch?v=tWC5Qr4Vks4)