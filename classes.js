class Sprite{
  constructor({position, imgSrc}){
    this.position = position
    this.width = 50
    this.width = 150
    this. image = new Image()
    this.image.src = imgSrc
  }

  draw(){
    ctx.drawImage(this.image, this.position.x, this.position.y)
  }

  update(){
    this.draw()
  }
}

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
