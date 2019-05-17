const b = document.querySelector('body')
const start = document.querySelector('#start')
const game = document.querySelector('#game')
const time = document.querySelector('#time')
const gameTime = document.querySelector('#game-time')

const resultHeader = document.querySelector('#result-header')
const result = document.querySelector('#result')
let gameResult = 0
let gameRecord = 0

const recordHeader = document.querySelector('#record-header')
const record = document.querySelector('#record')

start.addEventListener('click', (e) => {
  gameResult = 0
  let t = Number(time.innerHTML)
  if (t >= 0) {
    e.target.style.display = 'none'
    game.style.backgroundColor = '#fff'
    gameTime.disabled = true;
    gameTime.style.backgroundColor = "#ccc"
    resultHeader.classList.add('hide')
    timer(t)
  } else {
    alert('Введите положительное число!')
  }
})

b.addEventListener('click', (e) => {
  if(e.target.className === 'game-block') {
    gameResult++
    removeBlock(e.target)
    addBlock()
  }
})

function addBlock() {
  // create block
  let gameBlock = document.createElement('div')
  gameBlock.classList.add('game-block')

  // width and height
  let hw = Math.floor((Math.random()) * 100)
  hw < 20 ? hw += 40 : hw < 40 ? hw += 30 : null
  gameBlock.style.width = hw + 'px'
  gameBlock.style.height = hw + 'px'

  // set random background color
  gameBlock.style.backgroundColor = generateColor()

  //position left and top
  let pl = Math.floor((Math.random()) * 300)
  let pt = Math.floor((Math.random()) * 300)
  pl + hw > 300 ? pl -= hw : pl
  pt + hw > 300 ? pt -= hw : pt
  gameBlock.style.left = pl + 'px'
  gameBlock.style.top = pt + 'px'

  game.appendChild(gameBlock)
}

function removeBlock(block) {
  block.remove()
}

function generateColor() {
  return '#' + Math.floor(Math.random()*16777215).toString(16)
}

function timer(t) {
  addBlock()
  let timerId = setInterval(() => {
    t -= 0.1
    time.innerHTML = t = t.toFixed(1)

    if (t === '0.0') {
      clearTimeout(timerId);
      finished()
    }
  }, 100)
}

function finished() {
  removeBlock(document.querySelector('.game-block'))
  gameResult === 0 ? result.style.color = 'red' : result.style.color = 'green'
  result.innerHTML = gameResult
  resultHeader.classList.remove('hide')
  setTimeout(() => {
    start.style.display = 'block'
  }, 1000)
  game.style.backgroundColor = '#ccc'
  gameTime.disabled = false;
  gameTime.style.backgroundColor = "#fff"
  gameTime.value <= 0 ? time.innerHTML = '5.0' : time.innerHTML = gameTime.value + '.0'
  saveRecord()
  console.log(`Finish. Your result ${gameResult} points.`)
}

gameTime.addEventListener('input', (e) => {
  let value = e.target.value.replace(/[^-0-9]/gim, '')
  value <= 0 ? value = '5' : value
  value > 60 ? value = '60' : value
  value.split('').length !== 0 ? time.innerHTML = value + '.0' : time.innerHTML = '5.0'

  resultHeader.classList.add('hide')
  // checking record
  getRecord()
})

function saveRecord() {
  let oldRecord = localStorage.getItem(time.innerText)
  if(gameResult > Number(oldRecord) || oldRecord === null) {

    localStorage.setItem(time.innerText, gameResult)
    console.log(`You set new record on ${time} time - ${gameResult} points`)
    record.innerText = gameResult
  }
}

function getRecord() {
  let oldRecord = localStorage.getItem(time.innerText)
  if(oldRecord === null) {
    recordHeader.classList.add('hide')
    record.innerText = 0
  } else {
    recordHeader.classList.remove('hide')
    record.innerText = oldRecord
  }
}
getRecord()
