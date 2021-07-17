let userNameBtn = document.querySelector('.user-name-change-btn')
let userNameModal = document.querySelector('.user-name-modal')

let userImgBtn = document.querySelector('.user-img-change-btn')
let userImgModal = document.querySelector('.user-img-modal')

let cancelBtn = document.querySelectorAll('.cancel-btn')
let imgCancelBtn = cancelBtn[0]
let nameCancelBtn = cancelBtn[1]

let overlay = document.querySelector('.overlay')

const ACTIVE_CLASS = 'is-active'

function makeNameModal() {
  userNameModal.classList.add(ACTIVE_CLASS)
  overlay.classList.add(ACTIVE_CLASS)
}

function makeImgModal() {
  userImgModal.classList.add(ACTIVE_CLASS)
  overlay.classList.add(ACTIVE_CLASS)
}

function deleteNameModal() {
  userNameModal.classList.remove(ACTIVE_CLASS)
  overlay.classList.remove(ACTIVE_CLASS)
}

function deleteImgModal() {
  userImgModal.classList.remove(ACTIVE_CLASS)
  overlay.classList.remove(ACTIVE_CLASS)
}

userNameBtn.addEventListener('click', makeNameModal)
nameCancelBtn.addEventListener('click', deleteNameModal)

userImgBtn.addEventListener('click', makeImgModal)
imgCancelBtn.addEventListener('click', deleteImgModal)
