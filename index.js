//Istedenfor å bruke getElementById bruker jeg querySelector, har ikke lagt til id til canvas elementet så querySelector ser etter elementer i html filen med navnet 'canvas'
const canvas = document.querySelector('canvas')
//Bestemmer canvas størrelse
canvas.width = 1000
canvas.height = 600
//Gir canvas en context
const ctx = canvas.getContext('2d')

//Lagrer informasjonen til player1 og player 2 i en array
const player1 ={
  width: 50,
  height: 100,
  x: 100,
  y: 500,
  color: "red",
  speed: 3
}
const player2 ={
  width: 50,
  height: 100,
  x: 800,
  y: 500,
  color: "green",
  speed: 2
}

//Funksjon for player 1 og 2 sine posisjoner og farger
function drawPlayer1(){
  ctx.beginPath()
  ctx.fillStyle = player1.color
  ctx.fillRect(player1.x, player1.y, player1.width, player1.height)
  ctx.closePath()
}
function drawPlayer2(){
  ctx.beginPath()
  ctx.fillStyle = player2.color
  ctx.fillRect(player2.x, player2.y, player2.width, player2.height)
  ctx.closePath()
}

//Player 1 sin movement
let right = false
let left = false

function checkButton(event) {
  event.key === "a" ? left = true : null
  event.key === "d" ? right = true : null
}

document.addEventListener("keydown", checkButton)
document.addEventListener("keyup", event => {
  event.key === "a" ? left = false : null
  event.key === "d" ? right = false : null
})

//Player 2 sin movement
let righty = false
let lefty = false

function check(event) {
  event.key === "ArrowLeft" ? lefty = true : null
  event.key === "ArrowRight" ? righty = true : null
}

//Lytte etter tastetrykk:
document.addEventListener("keydown", check)
document.addEventListener("keyup", event => {
  event.key === "ArrowLeft" ? lefty = false : null
  event.key === "ArrowRight" ? righty = false : null
})

function drawElements(){
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  drawPlayer1()
  left ? player1.x = player1.x - player1.speed : null
  right ? player1.x = player1.x + player1.speed : null

  drawPlayer2()
  lefty ? player2.x = player2.x - player2.speed : null
  righty ? player2.x = player2.x + player2.speed : null

  requestAnimationFrame(drawElements)
}

drawElements()


