let todoAddBtn = document.querySelector('.todo-add-btn')
let todoModal = document.querySelector('.todo-modal')
let todoModalCancelBtn = cancelBtn[3]

let todoDoneBtn = document.querySelector('.todo-done-btn')

function makeTodoModal() {
  todoModal.classList.add(ACTIVE_CLASS)
  overlay.classList.add(ACTIVE_CLASS)
}

function deleteTodoModal() {
  todoModal.classList.remove(ACTIVE_CLASS)
  overlay.classList.remove(ACTIVE_CLASS)
}

function doneTodo() {}

todoAddBtn.addEventListener('click', makeTodoModal)
todoModalCancelBtn.addEventListener('click', deleteTodoModal)
