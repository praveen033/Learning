document.addEventListener("DOMContentLoaded", () => {
  const todoinput = document.getElementById("todo-input");
  const add_task = document.getElementById("add-task-btn");
  const list = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => loadtasks(task));

  add_task.addEventListener("click", () => {
    const task_text = todoinput.value.trim();
    if (task_text === "") return;

    const new_task = { id: Date.now(), text: task_text, completed: false };
    tasks.push(new_task);
    savetasks();

    loadtasks(new_task);
    todoinput.value = "";
    console.log(tasks);
  });

  function savetasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function loadtasks(task) {
    const li = document.createElement("li");
    li.setAttribute("Data_ID", task.id);
    if (task.completed) li.classList.add("complated");
    li.innerHTML = `<span>${task.text}</span>
    <button>Delete</button>`;

    //list.append(li);
    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;
      else {
        task.completed !== task.completed;
        li.classList.toggle("completed");
        savetasks();
      }
    });

    li.querySelector("button").addEventListener("click", (e) => {
      // e.stopPropogation();
      task = tasks.filter((t) => t.id !== task.id);
      li.remove();
      savetasks();
    });

    list.appendChild(li);
  }
});
