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
  constructor({playerPosition, playerVelocity}){
    this.playerPosition = playerPosition
    this.playerVelocity = playerVelocity
    this.playerHeight = 150
  }

  //lager en funksjon som tegner opp player
  drawPlayer(){
    ctx.beginPath()
    ctx.fillStyle = 'red'
    ctx.fillRect(this.playerPosition.x, this.playerPosition.y, 50, 150)
    ctx.closePath()
  }

  update(){
    this.drawPlayer()
    this.playerPosition.y += this.playerVelocity.y

    if(this.playerPosition.y + this.playerHeight + this.playerVelocity.y >= canvas.height){
      this.playerVelocity.y = 0
    } else{
      this.playerVelocity.y += gravity
    }
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
  }
})

//Her blir informasjon om player 2 lagret 
const player2 = new PlayerInfo({
  playerPosition: {
    x: 850,
    y: 0
  },
  playerVelocity: {
    x: 0,
    y: 0
  }
})

//Tegner opp og animerer på canvas elementet
function drawElements(){
  ctx.fillStyle = 'blue'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  player1.update()
  player2.update()

  requestAnimationFrame(drawElements)
}

drawElements()