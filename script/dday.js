let ddayAddBtn = document.querySelector('.d-day-add-btn')
let ddayList = document.querySelector('.d-day-list')
let ddayModal = document.querySelector('.d-day-modal')
let ddayForm = ddayModal.querySelector('#d-day-form')
let ddayNameInput = ddayModal.querySelector('#d-day-name-input')
let ddayDateInput = ddayModal.querySelector('#d-day-date-input')
let ddayCancelBtn = ddayModal.querySelector('.cancel-btn')

const DDAY_LS = 'dday'

const LI_CLASS = 'd-day-item'
const NAME_BTN_CLASS = 'd-day-name-btn'
const INPUT_DATE_CLASS = 'input-date'
const DDAY_CLASS = 'd-day-date'
const DELETE_BTN_CLASS = 'd-day-delete-btn'

let ddayArray = []
let newID = -1

function makeDdayModal() {
  ddayModal.classList.add(ACTIVE_CLASS)
  overlay.classList.add(ACTIVE_CLASS)
}

function deleteDdayModal() {
  ddayModal.classList.remove(ACTIVE_CLASS)
  overlay.classList.remove(ACTIVE_CLASS)
}

function saveDday() {
  localStorage.setItem(DDAY_LS, JSON.stringify(ddayArray))
}

function calcDday(date) {
  let currentDate = new Date()
  let dateObj = new Date(date)
  let timeDiff = Math.floor((dateObj - currentDate) / 1000 / 60 / 60 / 24) * -1
  let result = ''

  if (timeDiff > 0) {
    result = `D+${timeDiff + 1}`
  } else if (timeDiff == 0) {
    result = 'D-DAY'
  } else {
    result = `D${timeDiff}`
  }

  return result
}

function paintDday(name, date) {
  const li = document.createElement('li')
  const nameBtn = document.createElement('button')
  const inputDate = document.createElement('p')
  const dday = document.createElement('h3')
  const deleteBtn = document.createElement('button')
  const deleteBtnImg = document.createElement('img')
  newID++

  li.classList.add(LI_CLASS)
  nameBtn.classList.add(NAME_BTN_CLASS)
  inputDate.classList.add(INPUT_DATE_CLASS)
  dday.classList.add(DDAY_CLASS)
  deleteBtn.classList.add(DELETE_BTN_CLASS)

  nameBtn.innerText = name
  inputDate.innerText = date
  dday.innerText = calcDday(date)

  deleteBtn.appendChild(deleteBtnImg)
  li.appendChild(nameBtn)
  nameBtn.appendChild(inputDate)
  li.appendChild(dday)
  li.appendChild(deleteBtn)
  li.id = newID
  ddayList.appendChild(li)

  const ddayObj = {
    name: name,
    date: date,
    id: newID,
  }

  ddayArray.push(ddayObj)
  saveDday()
}

function ddaySubmit(evt) {
  evt.preventDefault()
  const submitName = ddayNameInput.value
  const submitDate = ddayDateInput.value
  paintDday(submitName, submitDate)
  deleteDdayModal()
  ddayNameInput.value = ''
}

function loadDday() {
  const currentDdays = localStorage.getItem(DDAY_LS)
  if (currentDdays !== null) {
    const parsedDdays = JSON.parse(currentDdays)
    parsedDdays.forEach(function (dday) {
      paintDday(dday.name, dday.date)
    })
  }
}

function calcInterval() {
  const li = ddayList.childNodes

  for (let id = 0; id < li.length; id++) {
    li[id].childNodes[1].innerText = calcDday(ddayArray[id].date)
  }
}

function init() {
  ddayAddBtn.addEventListener('click', makeDdayModal)
  ddayCancelBtn.addEventListener('click', deleteDdayModal)
  ddayForm.addEventListener('submit', ddaySubmit)
  loadDday()
  setInterval(calcInterval, 1000)
}

init()
