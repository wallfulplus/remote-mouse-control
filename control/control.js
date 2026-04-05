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

const speed = 2;
const TICK = 120;
const accumulation = TICK/8;
const packet = {
    active: {x: 0, y: 0, click: 0}
};
const clear = () => {
    packet.active.x = 0;
    packet.active.y = 0;
    packet.active.click = 0;
}


setInterval(()=>{
    if (ws.readyState === WebSocket.OPEN) {
        ws.send(`${packet.active.x} ${packet.active.y} ${packet.active.click}`);
        clear();
    }
}, TICK)

let pressInterval = null;
const press = (mov) => {
    packet.active.x += mov.active.x;
    packet.active.y += mov.active.y;
    packet.active.click = mov.active.click;
    if(pressInterval != null){
        clearInterval(pressInterval);
    }
    pressInterval = setInterval(()=>{
        packet.active.x += mov.active.x;
        packet.active.y += mov.active.y;
    }, accumulation);
}

const stop = () => {
    if(pressInterval != null){
        clearInterval(pressInterval);
    }
}

const bindControl = (element, mov) => {
    if (!element) return;
    element.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        press(mov);
    });
    element.addEventListener('pointerup', (e) => {
        e.preventDefault();
        stop();
    });
    element.addEventListener('pointerleave', (e) => {
        e.preventDefault();
        stop();
    });
    element.addEventListener('pointercancel', (e) => {
        e.preventDefault();
        stop();
    });
};

bindControl(up, {active: {x: 0, y: -speed, click: 0}});
bindControl(down, {active: {x: 0, y: speed, click: 0}});
bindControl(left, {active: {x: -speed, y: 0, click: 0}});
bindControl(right, {active: {x: speed, y: 0, click: 0}});
bindControl(clickLeft, {active: {x: 0, y: 0, click: 1}});
// 還沒想好要幹嘛
bindControl(releaseleft, `0 0 0`);

