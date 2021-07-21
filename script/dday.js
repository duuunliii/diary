let ddayAddBtn = document.querySelector('.d-day-add-btn')
let ddayList = document.querySelector('.d-day-list')
let ddayModal = document.querySelector('.d-day-modal')
let ddayForm = ddayModal.querySelector('#d-day-form')
let ddayNameInput = ddayModal.querySelector('#d-day-name-input')
let ddayDateInput = ddayModal.querySelector('#d-day-date-input')
let ddayCancelBtn = ddayModal.querySelector('.cancel-btn')

const DDAY_LS = 'dday'

const DDAY_LI_CLASS = 'd-day-item'
const NAME_BTN_CLASS = 'd-day-name-btn'
const INPUT_NAME_CLASS = 'input-name'
const INPUT_DATE_CLASS = 'input-date'
const DDAY_CLASS = 'd-day-date'
const DDAY_DELETE_BTN_CLASS = 'd-day-delete-btn'

let ddayArray = []
let ddayID = -1

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
  currentDate.setHours(0)
  currentDate.setMinutes(0)
  currentDate.setSeconds(0)
  currentDate.setMilliseconds(0)

  let dateObj = new Date(date)
  dateObj.setHours(0)

  let timeDiff = Math.floor((currentDate - dateObj) / 1000 / 60 / 60 / 24)
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

function calcInterval() {
  const li = ddayList.childNodes

  for (let id = 0; id < li.length; id++) {
    li[id].childNodes[1].innerText = calcDday(ddayArray[id].date)
  }
}

function paintDday(name, date) {
  const li = document.createElement('li')
  const nameBtn = document.createElement('button')
  const inputName = document.createElement('p')
  const inputDate = document.createElement('p')
  const dday = document.createElement('h3')
  const deleteBtn = document.createElement('button')
  ddayID++

  li.classList.add(DDAY_LI_CLASS)
  nameBtn.classList.add(NAME_BTN_CLASS)
  inputName.classList.add(INPUT_NAME_CLASS)
  inputDate.classList.add(INPUT_DATE_CLASS)
  dday.classList.add(DDAY_CLASS)
  deleteBtn.classList.add(DDAY_DELETE_BTN_CLASS)

  inputName.innerHTML = name
  inputDate.innerHTML = date
  dday.innerText = calcDday(date)

  // nameBtn.addEventListener('click', changeDday)
  deleteBtn.addEventListener('click', deleteDday)

  li.appendChild(nameBtn)
  nameBtn.appendChild(inputName)
  nameBtn.appendChild(inputDate)
  li.appendChild(dday)
  li.appendChild(deleteBtn)
  li.id = ddayID
  ddayList.appendChild(li)

  const ddayObj = {
    name: name,
    date: date,
    id: ddayID,
  }

  ddayArray.push(ddayObj)
  saveDday()
}

function deleteDday(evt) {
  const btn = evt.target
  const li = btn.parentNode

  //html
  ddayList.removeChild(li)

  //local storage
  const cleanedArray = ddayArray.filter(function (dday) {
    return dday.id !== parseInt(li.id)
  })
  ddayArray = cleanedArray
  saveDday()
}

// function changeDday(evt) {
//   ddayForm.removeEventListener('submit', submitDday)
//   let btn = evt.target

//   if (btn.nodeName == 'P') {
//     btn = btn.parentNode
//   }

//   let name = btn.childNodes[0].innerHTML
//   let date = btn.childNodes[1].innerHTML

//   makeDdayModal()
//   ddayNameInput.value = name
//   ddayDateInput.value = date

// console.log(btn.parentNode.id)
// console.log(
//   ddayList.childNodes[btn.parentNode.id].childNodes[0].childNodes[0].innerHTML
// )
// }

function submitDday(evt) {
  evt.preventDefault()
  const submitName = ddayNameInput.value
  const submitDate = ddayDateInput.value

  if (submitDate.trim() !== '' && submitName.trim() !== '') {
    paintDday(submitName, submitDate)
    deleteDdayModal()
    ddayNameInput.value = ''
    ddayDateInput.value = ''
  } else {
    window.alert('이름과 날짜를 입력해주세요.')
  }
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

function init() {
  ddayAddBtn.addEventListener('click', makeDdayModal)
  ddayCancelBtn.addEventListener('click', deleteDdayModal)
  ddayForm.addEventListener('submit', submitDday)
  loadDday()
  setInterval(calcInterval, 1000)
}

init()
