//Istedenfor å bruke getElementById bruker jeg querySelector, har ikke lagt til id til canvas elementet så querySelector ser etter elementer i html filen med navnet 'canvas'
const canvas = document.querySelector('canvas')

//Bestemmer canvas størrelse
canvas.width = 1000
canvas.height = 600

//Gir canvas en context
const ctx = canvas.getContext('2d')

const gravity = 0.0981

//https://www.w3schools.com/js/js_classes.asp
//Lager en klasse, istedenfor å lagre informasjon i en array blir alt lagret i en klasse som jeg senere kan bruke til å lage ulike objekter
class PlayerInfo{
  //Må ha med constructor som fungerer som en funksjon somm tar imot parameter
  //senere i koden definere jeg hva playerPosition er, for nå er den tom og kan endres på i hvert element istedenfor å lage flere arrayer med ulike verdier
  constructor({playerPosition, playerVelocity, color}){
    this.playerPosition = playerPosition
    this.playerVelocity = playerVelocity
    this.playerWidth = 50
    this.playerHeight = 150
    this.color = color
    this.lastKey
    this.attackBox = {
      position: this.playerPosition,
      width: 100,
      height: 50
    }
    this.isAttacking
  }

  //lager en funksjon som tegner opp player
  drawPlayer(){
    ctx.fillStyle = this.color
    ctx.fillRect(this.playerPosition.x, this.playerPosition.y, this.playerWidth, this.playerHeight)

    if(this.isAttacking){
      ctx.fillStyle = 'black'
      ctx.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
    }
    
  }

  //lager en update funksjon som har med "opdatert" informasjon om player
  update(){
    this.drawPlayer()

    this.playerPosition.x += this.playerVelocity.x
    this.playerPosition.y += this.playerVelocity.y

    if(this.playerPosition.y + this.playerHeight + this.playerVelocity.y >= canvas.height){
      this.playerVelocity.y = 0
    } else{
      this.playerVelocity.y += gravity
    }
  }

  attack(){
    this.isAttacking = true
    setTimeout (()=>{
      this.isAttacking = false
    }, 100)
  }
}

//Her blir informasjon om player 1 lagret
//Her bestemmer jeg playerposition
const player1 = new PlayerInfo({
  playerPosition: {
    x: 100,
    y: 0
  },
  playerVelocity: {
    x: 0,
    y: 0
  },
  color : 'pink'
})

//Her blir informasjon om player 2 lagret
//Her bestemmer jeg playerposition
const player2 = new PlayerInfo({
  playerPosition: {
    x: 850,
    y: 0
  },
  playerVelocity: {
    x: 0,
    y: 0
  },
  color : 'yellow'
})

const keys = {
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  w: {
    pressed: false
  },
  ArrowLeft: {
    pressed: false
  },
  ArrowRight: {
    pressed: false
  },
  ArrowUp: {
    pressed: false
  }
}

let lastKey

//Tegner opp og animerer på canvas elementet
function drawElements(){
  //Backgrunnen av canvas blir fylt og tømt
  ctx.fillStyle = 'grey'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
 
  player1.update()
  player2.update()

  //Setter player velocity til 0, slik at den er 0 med mindre verlocity blir til true/false
  player1.playerVelocity.x = 0
  player2.playerVelocity.x = 0

  //Hva som skjer dersom tast blir trykket på
  if (keys.a.pressed && lastKey === 'a') {
    player1.playerVelocity.x = - 2
  }else if(keys.d.pressed && lastKey === 'd'){
    player1.playerVelocity.x = 2
  }

  if (keys.ArrowLeft.pressed && player2.lastKey === 'ArrowLeft') {
    player2.playerVelocity.x = - 2
  }else if(keys.ArrowRight.pressed && player2.lastKey === 'ArrowRight'){
    player2.playerVelocity.x = 2
  }

  //Sjekker for kollisjon på attackBox
  if (
    //Sjekker om attackbox treffer forfra
    player1.attackBox.position.x + player1.attackBox.width >= player2.playerPosition.x &&
    //Sjekker om attackbox treffer bakfra
    player1.attackBox.position.x <= player2.playerPosition.x + player2.playerWidth &&
    //Sjekker om attackbox treffer ovenfra
    player1.attackBox.position.y + player1.attackBox.height >= player2.playerPosition.y &&
    //Sjekker om attackbox treffer under fra
    player1.attackBox.position.y <= player2.playerPosition.y + player2.playerHeight &&
    player1.isAttacking
  ){
    player1.isAttacking = false
    console.log("player 1 is attacking");
  }

  requestAnimationFrame(drawElements)
}

drawElements()

//Legger til player movement for player 1
//addEventListener "hører" etter om en tast er trykket ned
//Dette er en arrow funksjon med paramenter event
addEventListener('keydown', (event)=>{
  //Switch case, den tar imot paramenter og key, den sjekker om tasten d er presset ned, break stopper JS
  switch (event.key){
    //Hvis d er "caset" så skal tasten = sann
    case 'd': 
      keys.d.pressed = true
      lastKey = 'd'
    break
    case 'a': 
      keys.a.pressed = true
      lastKey = 'a'
    break
    case 'w': 
      player1.playerVelocity.y = - 8
    break
    case 's': 
      player1.attack()
    break

    case 'ArrowRight': 
      keys.ArrowRight.pressed = true
      player2.lastKey = 'ArrowRight'
    break
    case 'ArrowLeft': 
      keys.ArrowLeft.pressed = true
      player2.lastKey = 'ArrowLeft'
    break
    case 'ArrowUp': 
      player2.playerVelocity.y = - 8
    break
  }
})

addEventListener('keyup', (event)=>{
  switch (event.key){
    case 'd': 
      keys.d.pressed = false
    break
    case 'a': 
      keys.a.pressed = false
    break
    case 'w': 
      keys.w.pressed = false
    break

    case 'ArrowRight': 
      keys.ArrowRight.pressed = false
    break
    case 'ArrowLeft': 
      keys.ArrowLeft.pressed = false
    case 'ArrowUp': 
      keys.ArrowUp.pressed = false
    break

}
})
