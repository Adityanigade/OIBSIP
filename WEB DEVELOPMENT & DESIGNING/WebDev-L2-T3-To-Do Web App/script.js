const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const pendingList = document.getElementById("pendingList");
const completedList = document.getElementById("completedList");
const pendingCount = document.getElementById("pendingCount");
const completedCount = document.getElementById("completedCount");
const pendingEmpty = document.getElementById("pendingEmpty");
const completedEmpty = document.getElementById("completedEmpty");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function formatDate(date) {
    return new Date(date).toLocaleString();
}

function updateCounts() {
    const pending = tasks.filter(task => !task.completed).length;
    const completed = tasks.filter(task => task.completed).length;

    pendingCount.textContent = `${pending} Pending`;
    completedCount.textContent = `${completed} Completed`;

    pendingEmpty.style.display = pending ? "none" : "block";
    completedEmpty.style.display = completed ? "none" : "block";
}

function renderTasks() {
    pendingList.innerHTML = "";
    completedList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        const text = document.createElement("div");
        text.className = "task-text";
        text.textContent = task.text;

        const time = document.createElement("div");
        time.className = "time";

        if (task.completed) {
            time.textContent =
                `Added: ${formatDate(task.createdAt)} | Completed: ${formatDate(task.completedAt)}`;
        } else {
            time.textContent =
                `Added: ${formatDate(task.createdAt)}`;
        }

        const actions = document.createElement("div");
        actions.className = "actions";

        const toggleBtn = document.createElement("button");
        toggleBtn.className = task.completed ? "undo" : "complete";
        toggleBtn.textContent = task.completed ? "Undo" : "Complete";

        toggleBtn.onclick = () => {
            task.completed = !task.completed;

            if (task.completed) {
                task.completedAt = new Date().toISOString();
            } else {
                task.completedAt = null;
            }

            saveTasks();
            renderTasks();
        };

        const editBtn = document.createElement("button");
        editBtn.className = "edit";
        editBtn.textContent = "Edit";

        editBtn.onclick = () => {

            const input = document.createElement("input");
            input.type = "text";
            input.value = task.text;
            input.className = "edit-input";

            li.replaceChild(input, text);

            input.focus();

            input.addEventListener("keypress", e => {

                if (e.key === "Enter") {

                    const value = input.value.trim();

                    if (value !== "") {
                        task.text = value;
                        saveTasks();
                        renderTasks();
                    }

                }

            });

            input.addEventListener("blur", () => {

                const value = input.value.trim();

                if (value !== "") {
                    task.text = value;
                }

                saveTasks();
                renderTasks();

            });

        };

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete";
        deleteBtn.textContent = "Delete";

        deleteBtn.onclick = () => {

            tasks = tasks.filter(t => t.id !== task.id);

            saveTasks();
            renderTasks();

        };

        actions.append(toggleBtn, editBtn, deleteBtn);

        li.append(text);
        li.append(time);
        li.append(actions);

        if (task.completed) {
            completedList.appendChild(li);
        } else {
            pendingList.appendChild(li);
        }

    });

    updateCounts();
}

addBtn.onclick = () => {

    const value = taskInput.value.trim();

    if (value === "") {
        alert("Please enter a task.");
        return;
    }

    tasks.unshift({
        id: Date.now(),
        text: value,
        completed: false,
        createdAt: new Date().toISOString(),
        completedAt: null
    });

    taskInput.value = "";

    saveTasks();
    renderTasks();

};

taskInput.addEventListener("keypress", e => {

    if (e.key === "Enter") {
        addBtn.click();
    }

});

renderTasks();