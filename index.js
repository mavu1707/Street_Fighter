/*Velger canvas inne på html dokumentet, siden canvas ikke har en 'id' bruker jeg uerySelector*/
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

/*Canvas sin størrelse*/
canvas.width = 1024
canvas.height = 576

/*Fyller canvas*/
ctx.fillRect(0, 0, canvas.width, canvas.height)

/*Gravitet som drar spiller ned*/
const gravity = 0.7

/*"Array" med informasjon om bakgrunnen*/
const background = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  imageSrc: './img/background.png'
})

/*"Array" med informasjon om spiller*/
const player = new Fighter({
  position: {
    x: 0,
    y: 0
  },
  velocity: {
    x: 0,
    y: 0
  },
  offset: {
    x: 0,
    y: 0
  },
  imageSrc: './img/player1/Idle.png',
  framesMax: 8,
  scale: 2.5,
  offset: {
    x: 215,
    y: 157
  },
  /*Hvor mange frames som er med i hvert bilde av f.eks løping, bruker dette i en loop*/
  sprites: {
    idle: {
      imageSrc: './img/player1/Idle.png',
      framesMax: 8
    },
    run: {
      imageSrc: './img/player1/Run.png',
      framesMax: 8
    },
    jump: {
      imageSrc: './img/player1/Jump.png',
      framesMax: 2
    },
    fall: {
      imageSrc: './img/player1/Fall.png',
      framesMax: 2
    },
    attack1: {
      imageSrc: './img/player1/Attack1.png',
      framesMax: 8
    },
    takeHit: {
      imageSrc: './img/player1/Take hit.png',
      framesMax: 3
    },
    death: {
      imageSrc: './img/player1/Death.png',
      framesMax: 7
    }
  }
})

const platform = new Platform()
/*Taster er false uansett fra starten av, blir endret dersom eventListener "hører" ett tastetrykk*/
const keys = {
  a: {
    pressed: false
  },
  d: {
    pressed: false
  }
}

/*Tegner opp alle elemnter i canvas*/
function drawElements() {
  requestAnimationFrame(drawElements)
  background.update()
  player.update()
  platform.draw()

  //fra sterten er velocity til spiller = 0, for at spiller ikke faller forbi canvas i starten
  player.velocity.x = 0

  /*Player movement blir sjekket*/
  if (keys.a.pressed && player.lastKey === 'a') {
    player.velocity.x = -3
    player.switchSprite('run')
  } else if (keys.d.pressed && player.lastKey === 'd') {
    player.velocity.x = 3
    player.switchSprite('run')
  } else {
    player.switchSprite('idle')
  }

  /*Player hopping og animasjon*/
  if (player.velocity.y < 0) {
    player.switchSprite('jump')
  } else if (player.velocity.y > 0) {
    player.switchSprite('fall')
  }
}

drawElements()

/*Players movement, sjekker om taster blir trykket ned eller ikke*/
addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = true
      player.lastKey = 'd'
      break
    case 'a':
      keys.a.pressed = true
      player.lastKey = 'a'
      break
    case 'w':
      player.velocity.y = -20
      break
    case ' ':
      player.attack()
      break
  }
})

/*Passer på at spiller stopper dersom man slipper en tast*/
addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = false
      break
    case 'a':
      keys.a.pressed = false
      break
  }
})