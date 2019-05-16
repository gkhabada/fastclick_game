const b = document.querySelector('body')
const start = document.querySelector('#start')
const game = document.querySelector('#game')
const time = document.querySelector('#time')
const gameTime = document.querySelector('#game-time')
const resultHeader = document.querySelector('#result-header')
const result = document.querySelector('#result')
let gameResult = 0

start.addEventListener('click', (e) => {

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
    showBlock()
  }
})

function showBlock() {
  let gameBlock = document.createElement('div')
  gameBlock.classList.add('game-block')
  let hw = Math.floor((Math.random()) * 100)
  hw < 20 ? hw += 40 : hw < 40 ? hw += 30 : null
  gameBlock.style.width = hw + 'px'
  gameBlock.style.height = hw + 'px'
  gameBlock.style.backgroundColor = "#0a5"

  game.appendChild(gameBlock)
}

function removeBlock(block) {
  block.remove()
}

function timer(t) {
  showBlock()
  let timerId = setInterval(() => {
    t -= 0.1
    t = t.toFixed(1)
    time.innerHTML = t

    if (t === '0.0') {
      clearTimeout(timerId);
      finished()
    }
  }, 100)
}

function finished() {
  removeBlock(document.querySelector('.game-block'))
  result.innerHTML = gameResult
  resultHeader.classList.remove('hide')
  start.style.display = 'block'
  game.style.backgroundColor = '#ccc'
  gameTime.disabled = false;
  gameTime.style.backgroundColor = "#fff"
  alert(`Finish. Your result ${gameResult} points.`)
}

gameTime.addEventListener('input', (e) => {
  let value = e.target.value.replace(/[^-0-9]/gim, '')
  value.split('').length !== 0 ? time.innerHTML = value + '.0' : time.innerHTML = '5.0'
})
