let ddayBtn = document.querySelector('.d-day-setting-btn')
let ddayModal = document.querySelector('.d-day-modal')
let ddayCancelBtn = cancelBtn[2]

function makeDdayModal() {
  ddayModal.classList.add(ACTIVE_CLASS)
  overlay.classList.add(ACTIVE_CLASS)
}

function deleteDdayModal() {
  ddayModal.classList.remove(ACTIVE_CLASS)
  overlay.classList.remove(ACTIVE_CLASS)
}

ddayBtn.addEventListener('click', makeDdayModal)
ddayCancelBtn.addEventListener('click', deleteDdayModal)
