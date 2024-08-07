let save = document.getElementById("btn");
let task_value = document.getElementById("task_value");
let task_list = document.getElementById("task_lists");
let arr = JSON.parse(localStorage.getItem('arr')) || [];

function displayTask() {
    task_list.innerHTML = "";
    arr.forEach((item, index) => {
        let li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `
            <div>
                <input type="checkbox" class="mr-2" ${item.completed ? "checked" : ""} data-index="${index}">
                <span class="${item.completed ? "completed" : ""}">${item.name}</span>
            </div>
            <div>
                <button class="btn btn-primary btn-sm edit-btn" data-index="${index}">Edit</button>
                <button class="btn btn-danger btn-sm delete-btn" data-index="${index}">Delete</button>
            </div>`;
        task_list.appendChild(li);
    });

    // Add event listeners for checkboxes, edit and delete buttons
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', toggleComplete);
    });

    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', editTask);
    });

    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', deleteTask);
    });
}

function addTask() {
    let new_task = task_value.value.trim();
    if (new_task !== "") {
        arr.push({ name: new_task, completed: false });
        task_value.value = "";
        displayTask();
        localStorage.setItem('arr', JSON.stringify(arr));
    }
}

function editTask(event) {
    let index = event.target.getAttribute('data-index');
    let new_task = prompt("Edit your task", arr[index].name);
    if (new_task !== null) {
        arr[index].name = new_task.trim();
        displayTask();
        localStorage.setItem('arr', JSON.stringify(arr));
    }
}

function deleteTask(event) {
    let index = event.target.getAttribute('data-index');
    arr.splice(index, 1);
    displayTask();
    localStorage.setItem('arr', JSON.stringify(arr));
}

function toggleComplete(event) {
    let index = event.target.getAttribute('data-index');
    arr[index].completed = event.target.checked;
    displayTask();
    localStorage.setItem('arr', JSON.stringify(arr));
}

displayTask();

save.addEventListener("click", function(event) {
    event.preventDefault();
    addTask();
});

task_value.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        addTask();
    }
});
