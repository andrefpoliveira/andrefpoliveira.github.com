var prev_button = 0;
var buttons = document.getElementsByClassName("work_button");
var details = document.getElementsByClassName("work_details");

function seeWork(id) {
    if (id == prev_button) return;

    buttons[prev_button].classList.remove("selected");
    details[prev_button].classList.remove("visible");

    buttons[id].classList.add("selected");
    details[id].classList.add("visible");

    prev_button = id;
}