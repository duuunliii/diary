let todoAddBtn = document.querySelector('.todo-add-btn')
let todoList = document.querySelector('.todo-list')
let todoModal = document.querySelector('.todo-modal')
let todoForm = todoModal.querySelector('#todo-form')
let todoInput = todoModal.querySelector('#todo-input')
let todoCancelBtn = todoModal.querySelector('.cancel-btn')

const TODO_LS = 'todo'

const TODO_LI_CLASS = 'todo-item'
const TODO_DONE_BTN_CLASS = 'todo-done-btn'
const TODO_NAME_CLASS = 'todo-name'
const TODO_DELETE_BTN_CLASS = 'todo-delete-btn'

let todoArray = []
let todoID = -1

function makeTodoModal() {
  todoModal.classList.add(ACTIVE_CLASS)
  overlay.classList.add(ACTIVE_CLASS)
}

function deleteTodoModal() {
  todoModal.classList.remove(ACTIVE_CLASS)
  overlay.classList.remove(ACTIVE_CLASS)
}

function saveTodo() {
  localStorage.setItem(TODO_LS, JSON.stringify(todoArray))
}

function submitTodo(evt) {
  evt.preventDefault()
  const submitName = todoInput.value

  if (submitName.trim() !== '') {
    paintTodo(submitName, 'notDone')
    deleteTodoModal()
  } else {
    window.alert('할 일을 입력해주세요.')
  }

  todoInput.value = ''
}

function deleteTodo(evt) {
  const btn = evt.target

  //html
  const li = btn.parentNode
  todoList.removeChild(li)

  //local storage
  const cleanedArray = todoArray.filter(function (todo) {
    return todo.id !== parseInt(li.id)
  })

  todoArray = cleanedArray
  saveTodo()
}

function changeTodoState(evt) {
  let btn = evt.target

  if (btn.nodeName !== 'BUTTON') {
    btn = btn.parentNode
  }

  const li = btn.parentNode

  //html
  li.classList.toggle(ACTIVE_CLASS)

  //local storage
  todoArray.forEach(function (todo) {
    if (todo.id === parseInt(li.id)) {
      if (todo.state === 'notDone') {
        todo.state = 'done'
      } else {
        todo.state = 'notDone'
      }
    }
  })

  saveTodo()
}

function paintTodo(name, state) {
  const li = document.createElement('li')
  const doneBtn = document.createElement('button')
  const todoName = document.createElement('span')
  const deletBtn = document.createElement('button')

  todoID++

  if (state == 'done') {
    li.classList.add(ACTIVE_CLASS)
  }

  li.classList.add(TODO_LI_CLASS)
  doneBtn.classList.add(TODO_DONE_BTN_CLASS)
  todoName.classList.add(TODO_NAME_CLASS)
  deletBtn.classList.add(TODO_DELETE_BTN_CLASS)

  doneBtn.innerHTML =
    '<img src="./assets/todo-default.png" alt="Do not done" class="not-done"/> <img src="./assets/todo-done.png" alt="Done" class="done" />'
  todoName.innerHTML = name

  li.appendChild(doneBtn)
  doneBtn.appendChild(todoName)
  li.appendChild(deletBtn)
  li.id = todoID
  todoList.appendChild(li)

  doneBtn.addEventListener('click', changeTodoState)
  deletBtn.addEventListener('click', deleteTodo)

  const todoObj = {
    name: name,
    state: state,
    id: todoID,
  }

  todoArray.push(todoObj)
  saveTodo()
}

function loadTodo() {
  const currentTodos = localStorage.getItem(TODO_LS)
  if (currentTodos !== null) {
    const parsedTodo = JSON.parse(currentTodos)
    parsedTodo.forEach(function (todo) {
      paintTodo(todo.name, todo.state)
    })
  }
}

function init() {
  todoAddBtn.addEventListener('click', makeTodoModal)
  todoCancelBtn.addEventListener('click', deleteTodoModal)
  todoForm.addEventListener('submit', submitTodo)
  loadTodo()
}

init()
