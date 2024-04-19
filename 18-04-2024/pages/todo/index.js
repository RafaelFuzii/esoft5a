const lsVisistorsKey = '@visitorsCounter'

const defaultLsVisitors = {
  count: 0,
  lastVisit: getCurrentDateAndTime(),
}

function getCurrentDateAndTime() {
  const locale = 'pt-BR'
  const date = new Date()

  options = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }

  const time = new Intl.DateTimeFormat(locale, options).format(date)
  return time
}

function countVisitors() {
  const lsVisitors =
    localStorage.getItem(lsVisistorsKey) || JSON.stringify(defaultLsVisitors)
  const lsVisitorsObj = JSON.parse(lsVisitors)

  lsVisitorsObj.count++
  lsVisitorsObj.lastVisit = getCurrentDateAndTime()

  localStorage.setItem(lsVisistorsKey, JSON.stringify(lsVisitorsObj))

  const p = document.createElement('p')
  p.id = 'visitors-counter'
  p.textContent = `Esta página foi visitada ${lsVisitorsObj.count} vezes. A última visita foi: ${lsVisitorsObj.lastVisit}`

  const footer = document.querySelector('footer')

  footer.appendChild(p)
}

document.addEventListener('DOMContentLoaded', function () {
  countVisitors()
})

// TASKS

document.addEventListener("DOMContentLoaded", function() {
    // Limpar localStorage ao recarregar a página
    localStorage.removeItem("tasks");

    const form = document.getElementById("todo-form");
    const input = document.getElementById("todo-input");
    const todoList = document.getElementById("todo-list");

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const todoText = input.value.trim();
        if (todoText !== "") {
            addTodoToList(todoText);
            input.value = "";
        }
    });

    function addTodoToList(todo) {
        const li = document.createElement("li");
        li.textContent = todo;
        todoList.appendChild(li);
        saveTasksToLocalStorage();
    }

    function saveTasksToLocalStorage() {
        const tasks = Array.from(todoList.querySelectorAll("li")).map(li => li.textContent);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasksFromLocalStorage() {
        let tasks;
        if (localStorage.getItem("tasks") === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem("tasks"));
        }
        tasks.forEach(function(task) {
            addTodoToList(task);
        });
    }

    loadTasksFromLocalStorage();
});
