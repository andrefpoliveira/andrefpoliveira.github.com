function generate() {
    input1 = document.getElementById("size1").value;
    input2 = document.getElementById("size2").value;

    if (input1 === "" || input2 === "") return;

    var l1 = generate_list(parseInt(input1));
    var l2 = generate_list(parseInt(input2), l1);

    arrays_text = document.getElementById("arrays");
    arrays_text.innerHTML = "Array #1: [" + l1.join(", ").toString() + "]<br>Array #2: [" + l2.join(", ").toString() + "]";
    arrays_text.style.visibility = "visible";

    subs1 = problem1(l1);
    subs2 = problem1(l2);
    p2 = problem2(l1, l2);

    sols_text = document.getElementById("solution");
    sols_text.innerHTML = "Problem 1 for array #1: " + subs1 + "<br>Problem 1 for array #2: " + subs2 + "<br>Problem 2: " + p2;
    sols_text.style.visibility = "visible";
}

function generate_random_number(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function problem1(ns) {
    subs = generate_subs(ns);
    
    max_len = 0;
    count = 0;

    subs.forEach(elem => {
        if (elem.length > max_len) {
            max_len = elem.length;
            count = 1;
        } else if (elem.length == max_len) {
            count++;
        }
    })
    return [max_len, count];
}

function set_contains(s1, arr2){
    var found = false;
    s1.forEach(arr1 => {
        if (arr1.length === arr2.length &&
            arr1.every((value, index) => value === arr2[index])) found = true;
    })
    return found;
}

function problem2(ns, ns2) {
    s1 = generate_subs(ns)
    s2 = generate_subs(ns2)

    max_len = 0;
    count = 0;

    s1.forEach(elem => {
        console.log(set_contains(s2, elem));
        if (set_contains(s2, elem)) {
            if (elem.length > max_len) {
                max_len = elem.length;
                count = 1;
            } else if (elem.length == max_len) {
                count++;
            }
        }
    })
    return [max_len, count];
}

function generate_list(size, previous_list) {
    l = [];
    for (let i = 0; i < size; i++) {
        if (previous_list !== undefined && i < previous_list.length && Math.random() > 0.8) {
            l.push(previous_list[i]);
        } else {
            l.push(generate_random_number(1, 50));
        }
    }
    return l
}

function get_last_element(s) {
    let value;
    for(value of s);
    return value;
}

function generate_subs(ns) {
    subs = new Set()
    subs.add([]);
    for (let n of ns) {
        new_subs = new Set();
        subs.forEach((s) => {
            if (s.length == 0 || n > get_last_element(s)) {
                copy = [...s]
                copy.push(n)
                new_subs.add(copy)
            }
        })

        total_set = new Set()
        subs.forEach(elem => total_set.add(elem))
        new_subs.forEach(elem => total_set.add(elem))
        subs = total_set
    }
    return subs;
}