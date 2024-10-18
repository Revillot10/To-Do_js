
let newTask = document.getElementById('input-newtask');
const btnNewTask = document.getElementById('btn-newtask');
let taskList = [
  { id: 16, taskName: 'Hacer mercado', estado: false },
  { id: 60, taskName: 'Estudiar para la prueba', estado: false },
  { id: 24, taskName: 'Sacar a pasear a Tobby', estado: false },
];

//Funcion para actualizar
const renderizarTaskList = (taskList) => {
  let html = '';

  taskList.forEach((task) => {
    const statusBtnIcon = task.estado ? 'bi-clipboard-check-fill' : 'bi-clipboard-fill';
    html += `<tr>
                <td>${task.id}</td>
                <td>${task.taskName}</td>
                <td><i class="${statusBtnIcon}" onclick="changeStatusTask(${task.id})"></i></td>
                <td><i class="bi bi-trash-fill" onclick="deleteTask(${task.id})"></i></td>
            </tr>`;
  });

  document.getElementById('task-list').innerHTML = html;
  document.getElementById('task-total').innerHTML = taskList.length;
  document.getElementById('task-closed').innerHTML = taskList.filter((task) => task.estado === true).length;
};

//Funcion para cambiar estado
const changeStatusTask = (id) => {
  const task = taskList.find((task) => task.id === id);
  
  if (task) {
    task.estado = !task.estado;
  } else {
    console.log('Revisar');
  }

  renderizarTaskList(taskList);
};

//Funcion para borrar tarea
const deleteTask = (id) => {
  const index = taskList.findIndex((task) => task.id === id);

  if (index != -1) {
    taskList.splice(index, 1);
  } else {
    console.log('Revisar');
  }

  renderizarTaskList(taskList);
};

//Funcion para generar ID
const generarId = (taskList) => {
  return taskList.length ? taskList[taskList.length - 1].id + 1 : 1;
};


btnNewTask.addEventListener('click', () => {
 
  if (newTask.value.trim() !== '') {
    const task = {
      id: generarId(taskList),
      taskName: newTask.value,
      estado: false,
    };
    
    taskList.push(task);
    renderizarTaskList(taskList);
    newTask.value = '';
    newTask.focus();

  } else {
    newTask.classList.add('is-invalid');
  }
});

newTask.addEventListener('click', () => {
  newTask.classList.remove('is-invalid');
});

renderizarTaskList(taskList);
