const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');

window.addEventListener('DOMContentLoaded', () => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => addTask(task.text, task.completed));
});

form.addEventListener('submit', e => {
  e.preventDefault();
  const text = input.value.trim();
  if (text !== '') {
    addTask(text);
    input.value = '';
  }
});

function addTask(text, completed = false) {
  const li = document.createElement('li');
  li.textContent = text;
  if (completed) li.classList.add('completed');

  li.addEventListener('click', () => {
    li.classList.toggle('completed');
    saveTasks();
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '✖';
  deleteBtn.className = 'delete-btn';
  deleteBtn.addEventListener('click', e => {
    e.stopPropagation();
    li.remove();
    saveTasks();
  });

  li.appendChild(deleteBtn);
  list.appendChild(li);
  saveTasks();
}

function saveTasks() {
  const tasks = [];
  list.querySelectorAll('li').forEach(li => {
    tasks.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
