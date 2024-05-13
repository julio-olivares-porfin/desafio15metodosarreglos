document.addEventListener('DOMContentLoaded', ()=>{
  const addButton = document.querySelector('#boton-agregar-tarea')
  addButton.addEventListener('click', addTask)

  updateTaskCounts()
})

let tasks = []

let counter = 1;
const generateId = () =>{
  return counter++
}

const addTask = () =>{
  const taskInput = document.querySelector('#nueva-tarea')
  const taskName = taskInput.value.trim()
  if(taskName !== ''){
    const taskId = generateId()
    const task = {
      id: taskId,
      taskName: taskName,
      completed: false
    }
    tasks.push(task)
    taskInput.value = ''
    renderTasks()
    updateTaskCounts()
  }else{
    alert('Ingresa una tarea')
  }
}

const toggleTaskStatus = (taskId) =>{
  const taskIndex = tasks.findIndex(task => task.id === taskId)
  if(taskIndex !== -1){
    tasks[taskIndex].completed = !tasks[taskIndex].completed
    if(tasks[taskIndex].completed){
      renderTasks()
      updateTaskCounts()
    }
  }
}

const deleteTask = (taskId) =>{
  tasks = tasks.filter(task => task.id !== taskId)
  renderTasks()
  updateTaskCounts()
}


const updateTaskCounts = () => {
  const totalTasksElement = document.querySelector('#total-tarea');
  const doneTasksElement = document.querySelector('#realizado-tarea');

  totalTasksElement.textContent = tasks.length;
  doneTasksElement.textContent = tasks.filter(task => task.completed).length;
}

let taskSection = document.querySelector('#seccion-tareas')
const renderTasks = () =>{
  let template = ''
  tasks.forEach((task =>{
    template += `
      <div class="seccion-tareas-contenedor fila">
        <div class="titulo-tarea-contenedor fila">
          <div class="id-titulo">
            ${task.completed === true ? `<h3 id="id-tarea" class="realizado-texto">${task.id}</h3>` : `<h3 id="id-tarea">${task.id}</h3>`}
          </div>
          <div id="nombre-tarea" class="titulo-tarea">
            ${task.completed === true ? `<h3 class="realizado-texto">${task.taskName}</h3>` : `<h3>${task.taskName}</h3>`}
          </div>
        </div>
        <div class="realizado fila">
          <div>
            ${task.completed === true ? `<a id="boton-realizado-${task.id}" class="disabled">Realizado</a>` : `<a id="boton-realizado-${task.id}" class="boton-realizado">Realizado</a>`}
          </div>
          <div>
            <a id="boton-eliminar-${task.id}" class="boton-eliminar">Borrar</a>
          </div>
        </div>
      </div>
      `
  }))
  taskSection.innerHTML = template

  tasks.forEach((task =>{
    const doneButton = document.querySelector(`#boton-realizado-${task.id}`)
    doneButton.addEventListener('click', () => {
      toggleTaskStatus(task.id)
      updateTaskCounts()
    })
  }))

  tasks.forEach(task =>{
    const deleteButton = document.querySelector(`#boton-eliminar-${task.id}`)
    deleteButton.addEventListener('click', () => {
      deleteTask(task.id)
      updateTaskCounts()
    })
  })

  updateTaskCounts()
}

