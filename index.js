//Istedenfor å bruke getElementById bruker jeg querySelector, har ikke lagt til id til canvas elementet så querySelector ser etter elementer i html filen med navnet 'canvas'
const canvas = document.querySelector('canvas')
//Bestemmer canvas størrelse
canvas.width = 1000
canvas.height = 600
//Gir canvas en context
const ctx = canvas.getContext('2d')

const gravity = 0.2

//Lagrer informasjonen til player1 og player 2 i en array
const player1 ={
  width: 50,
  height: 100,
  x: 100,
  y: 500,
  color: "red",
  speed: 3,
  isAttacking: false
}
const player2 ={
  width: 50,
  height: 100,
  x: 800,
  y: 500,
  color: "green",
  speed: 3
}

const attack1 ={
  width: 100,
  height: 50
}

const attack2 ={
  width: 100,
  height: 50
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

//Funksjon for attack boksene til player 1 og 2
function player1Attack(){
  ctx.beginPath()
  ctx.fillStyle = "black"
  ctx.fillRect(player1.x, player1.y, attack1.width, attack1.height)
  ctx.closePath()
}
function player2Attack(){
  ctx.beginPath()
  ctx.fillStyle = "blue"
  ctx.fillRect(player2.x, player2.y, attack2.width, attack2.height)
  ctx.closePath()
}

function player1IsAttacking(){
  player1.isAttacking = true
  setTimeout(() =>{
    player1.isAttacking = false
  }, 100)
}
//Player 1 sin movement
let right = false
let left = false
let down = false

function checkButton(event) {
  event.key === "a" ? left = true : null
  event.key === "d" ? right = true : null
  event.key === "s" ? player1Attack = true : null
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


  player1Attack()
  player2Attack()

  drawPlayer2()
  lefty ? player2.x = player2.x - player2.speed : null
  righty ? player2.x = player2.x + player2.speed : null

  if (player1.x + attack1.width >= player2.x &&
    player1.x < player2.x + player2.width &&
    player1.isAttacking){
    console.log("hei");
  }

  requestAnimationFrame(drawElements)
}
drawElements()


