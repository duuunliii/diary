let memoContents = document.querySelector('.memo-contents')
const memoEditBtn = document.querySelector('.memo-edit-btn')

const memoModal = document.querySelector('.memo-modal')
const memoForm = memoModal.querySelector('#memo-form')
const memoInput = memoModal.querySelector('#memo-input')
const memoCancelBtn = memoModal.querySelector('.cancel-btn')

const MEMO_LS = 'memo'

function makeMemoModal() {
  memoModal.classList.add(ACTIVE_CLASS)
  overlay.classList.add(ACTIVE_CLASS)

  const currentMemo = localStorage.getItem(MEMO_LS)
  if (currentMemo !== null) {
    const parsedMemo = JSON.parse(currentMemo)
    memoInput.innerHTML = parsedMemo
  }
}

function deleteMemoModal() {
  memoModal.classList.remove(ACTIVE_CLASS)
  overlay.classList.remove(ACTIVE_CLASS)
}

function submitMemo(e) {
  e.preventDefault()
  const submitMemo = memoInput.value

  deleteMemoModal()
  paintMemo(submitMemo)

  if (submitMemo.trim() == '') {
    memoContents.innerHTML = 'Add Memo'
  }
}

function saveMemo(memo) {
  localStorage.setItem(MEMO_LS, JSON.stringify(memo))
}

function paintMemo(memo) {
  memoContents.innerHTML = memo
  saveMemo(memoContents.innerHTML)
}

function loadMemo() {
  const currentMemo = localStorage.getItem(MEMO_LS)
  if (currentMemo !== null) {
    const parsedMemo = JSON.parse(currentMemo)
    paintMemo(parsedMemo)
  }
}

function init() {
  memoEditBtn.addEventListener('click', makeMemoModal)
  memoCancelBtn.addEventListener('click', deleteMemoModal)
  memoForm.addEventListener('submit', submitMemo)
  loadMemo()
}

init()
