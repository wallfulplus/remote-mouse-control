const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const ip = urlParams.get('ip');

const up = document.querySelector('.up');
const left = document.querySelector('.left');
const right = document.querySelector('.right');
const down = document.querySelector('.down');
const clickLeft = document.querySelector('.clickleft');
const releaseleft = document.querySelector('.releaseleft');

const ws = new WebSocket(`ws://${ip}:8765/control`);

const speed = 10

const press = (mov) => {
    if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ action: mov }));
    }
}

const bindControl = (element, mov) => {
    if (!element) return;
    element.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        press(mov);
    });
};

bindControl(up, { x: 0, y: -speed, click: '' });
bindControl(down, { x: 0, y: speed, click: '' });
bindControl(left, { x: -speed, y: 0, click: '' });
bindControl(right, { x: speed, y: 0, click: '' });
bindControl(clickLeft, { x: 0, y: 0, click: 'click' });
bindControl(releaseleft, { x: 0, y: 0, click: 'release' });

