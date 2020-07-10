const clock = document.querySelector(".js-clock .clock_text");

function getTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const time = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    clock.innerHTML = time;
    return;
}

function init() {
    getTime();
    setInterval(getTime, 1000); // 1000 milliseconds = 1 seconds
    return;
}

init();