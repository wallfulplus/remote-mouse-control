import asyncio
import websockets 
import json
from ipUtil import IpUtil
from control import Control

control = Control()

async def handler(ws):
    path = ws.request.path
    print([ws,path])
    if path == "/":
        [ok, ip] = IpUtil.getLocalIp()
        if ok == 0:
            await ws.send(json.dumps({"status": 0, "ip": ip}))
        else:
            await ws.send(json.dumps({"status": "server Error[1]", "ip": ip}))
    if path =="/control":
        async for msg in ws:    
            data = json.loads(msg)    
            action = data['action']
            control.move(action['x'], action['y'])
            control.update()
            if action['click'] == 'click':
                control.clickLeft(True)


async def main():
    async with websockets.serve(handler, "0.0.0.0", 8765):
        print("WebSocket serve at ws://0.0.0.0:8765")
        await asyncio.Future()

if __name__ == "__main__":
    asyncio.run(main())