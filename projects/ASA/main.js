function generate() {
    input1 = document.getElementById("size1").value;
    input2 = document.getElementById("size2").value;

    if (input1 === "" || input2 === "") return;

    var l1 = generate_list(parseInt(input1));
    var l2 = generate_list(parseInt(input2), l1);

    arrays_text = document.getElementById("arrays");
    arrays_text.innerHTML = "Array #1: [" + l1.join(", ").toString() + "]<br>Array #2: [" + l2.join(", ").toString() + "]";
    arrays_text.style.visibility = "visible";
}

function generate_random_number(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generate_list(size, previous_list) {
    l = [];
    for (let i = 0; i < size; i++) {
        if (previous_list !== undefined && i < previous_list.length && Math.random() > 0.2) {
            l.push(previous_list[i]);
        } else {
            l.push(generate_random_number(1, 50));
        }
    }
    return l
}