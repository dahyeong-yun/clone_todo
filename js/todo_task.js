const todo_form = document.querySelector(".js-to-do");
const todo_input = form.querySelector(".js-add-to-do"); // form 내 input
const todo_list = form.querySelector(".js-list"); // form 내 input

let todo_arr = [];

function init() {
    load_todo();
}

function load_todo() {
    const load_todo_str = localStorage.getItem("to_do");
    if(load_todo_str !== null) {
        const parsed_todo = JSON.parse(load_todo_str);
        parsed_todo.forEach(function(todo){
            add_todo(todo.value);
        })
    }

}

/**
 * 쿠키에 todo 리스트 저장
 */
function persist_todo() { 
    const todo_json_str = JSON.stringify(todo_arr);
    localStorage.setItem("to_do", todo_json_str); // 기존 것은 어떻게 되는지, 덮어 씌우는 것인지
}

/**
 * todo 리스트 추가 저장
 */
function save_todo(text) {
    const todo_obj = {
        id : todo_arr.length + 1,
        value : text
    };
    todo_arr.push(todo_obj);
    persist_todo();
}

/**
 * 
 */
function handle_delete(event) {

}

/**
 * todo 항목을 markup에 추가
 */
function add_todo(text) {
    const todo = document.createElement("li");
    todo.className = "todo";
    todo.id = toDos.length + 1;
    
    const del_btn = document.createElement("span");
    del_btn.innerHTML = "❌";
    del_btn.className = "toDo_button";
    del_btn.addEventListener("click", handle_delete);
    
    const label = document.createElement("label");
    label.innerHTML = text;
    todo.appendChild(del_btn);
    todo.appendChild(label);
    
    list.appendChild(todo); // markup의 ul > 로 추가
    
    save_todo(text);
}

function on_submit(event) {

}


form.addEventListener("submit", on_submit);

init();