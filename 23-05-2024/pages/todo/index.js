const taskKey = '@tasks'

function openDialog(e) {
  e.preventDefault()
  const modal = document.getElementById('filter-dialog')
  modal.style.display = 'block'

  const button = e.target;
  const taskTitle = button.getAttribute('data-title');
  const taskDescription = button.getAttribute('data-description');

  const editTitleInput = document.getElementById('edit-title');
  const editDescTextarea = document.getElementById('edit-desc');

  editTitleInput.value = taskTitle;
  editDescTextarea.value = taskDescription;
}

function closeFilters() {
  const modal = document.getElementById('filter-dialog')
  modal.style.display = 'none'
}

function addTask(event) {
  event.preventDefault(); // Evita o recarregamento da página
  const taskId = new Date().getTime();
  const taskList = document.querySelector('#taskList');

  const form = document.querySelector('#taskForm');
  const formData = new FormData(form);

  const taskTitle = formData.get('title');
  const taskDescription = formData.get('description');

  const li = document.createElement('li');
  li.id = taskId;

  const editButton = document.createElement('button');
  editButton.innerText = '✏️';
  editButton.style.backgroundColor = '#676767';
  editButton.style.borderRadius = '5px';
  editButton.style.border = 'none';
  editButton.style.cursor = 'pointer';
  editButton.setAttribute('onclick', 'openDialog(event)');
  editButton.setAttribute('title', 'Editar tarefa');
  editButton.setAttribute('data-title', taskTitle);
  editButton.setAttribute('data-description', taskDescription);

  li.appendChild(editButton);

  li.innerHTML += `
      <h2>${taskTitle}</h2>
      <p>${taskDescription}</p>
  `;

  taskList.appendChild(li);

  // Salvar tarefas no localStorage
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push({ id: taskId, title: taskTitle, description: taskDescription });
  localStorage.setItem('tasks', JSON.stringify(tasks));

  form.reset();
}


