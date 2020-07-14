const name_container = document.querySelector(".js-name");

function init() {
    load_name();
    return; // 이 부분을 주고 말고의 차이가 있을까?
}

function load_name() {
    const name = localStorage.getItem("username");
    if(name === null) {
        paint_name_input();
    } else {
        set_name(name);
    }
}

function paint_name_input() {
    const input = document.createElement("input");
    input.placeholder = "Type your name here";
    input.type = "text";
    input.className = "name_input";
    
    const form = document.createElement("form");
    form.addEventListener("submit", handle_submit);
    form.append(input);
    
    name_container.appendChild(form);
}

function handle_submit(event) {
    event.preventDefalut();
    const form = event.target;
    const input = form.querySelector("input");
    const value = input.value;
    localStorage.setItem("username", value);
    set_name(value);
}

function set_name(name) {
    name_container.innerHTML = "";
    const title = document.createElement("span");
    title.className = "name_text";
    title.innerHTML = `Hello ${name}!`;
    name_container.appendChild(title);
}

init();