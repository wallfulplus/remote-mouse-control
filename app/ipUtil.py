import socket

class IpUtil:
    @staticmethod
    def getLocalIp():
        res = []
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        try:
            s.connect(('8.8.8.8', 80))
            ip = s.getsockname()[0]
            res = [0, ip]
        except Exception as e:
            res = [e, '127.0.0.1']
        s.close()
        return res
