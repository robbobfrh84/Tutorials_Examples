class Grid {
  constructor(params) {
    Object.assign(this, params)
  }

  move() {
    this.x++
  }

  logAll() {
    console.log(this)
    Object.keys(this).forEach( key => {
      console.log('key, value:', key, this[key])
    })
  }
}

const game = new Grid({ 
  name: "bob", 
  x: 3, 
  y: 4 
})

game.logAll()
game.move()
game.logAll()