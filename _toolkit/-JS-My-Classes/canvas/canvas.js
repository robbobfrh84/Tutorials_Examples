class canvas {

  constructor () {
    this.sprites = []
  }

  new (id, width, height) {
    this.canvas = document.getElementById(id)
    this.ctx = this.canvas.getContext('2d')
    this.canvas.width = width * 2
    this.canvas.height = height * 2
    this.canvas.style.width = width + "px"
    this.canvas.style.height = height + "px"
    this.canvas.getContext('2d').scale(2,2)
  }

  resize (width, height) {
    this.ctx.canvas.width = width
    this.ctx.canvas.height = height
  }

  line (startX, startY, endX, endY, strokeColor, lineWidth, lineCap) {
    this.ctx.beginPath()
    this.ctx.moveTo(startX, startY)
    if (lineCap) this.ctx.lineCap = lineCap
    this.ctx.lineTo(endX,endY)
    this.paint( lineWidth || 1, strokeColor || 'black' )
    this.ctx.fill()
    this.ctx.stroke()
  }

  cir (centerX, centerY, radius, fillColor, lineWidth, strokeColor) {
    this.arc(0, Math.PI*2, centerX, centerY, radius, fillColor, lineWidth, strokeColor)
  }

  arc (p1, p2, centerX, centerY, radius, fillColor, lineWidth, strokeColor) {
    this.ctx.beginPath()
    this.ctx.arc(centerX, centerY, radius, p1, p2)
    this.paint( lineWidth || 0, strokeColor || 'black', fillColor || 'black' )
    this.ctx.fill()
    if (lineWidth) this.ctx.stroke() // flipp .stroke() & .fill() to put fill on top, making it static rather than 1/2 covered by stroke
  }

  rec (startX, startY, endX, endY, fillColor, lineWidth, strokeColor, close) {
    this.ctx.beginPath()
    this.ctx.rect(startX, startY, endX, endY)
    this.paint( lineWidth || 0, strokeColor || 'black', fillColor || 'black' )
    this.ctx.fill()
    if (lineWidth) this.ctx.stroke() // flipp .stroke() & .fill() to put fill on top, making it static rather than 1/2 covered by stroke
  }

  path (startX, startY, points, lineWidth, strokeColor, fillColor) {
    this.ctx.beginPath()
    this.ctx.moveTo(startX, startY)
    for (const p of points) {
      if (p[0] === 'l') this.ctx.lineTo(p[1],p[2])
      if (p[0] === 'q') this.ctx.quadraticCurveTo(p[1],p[2],p[3],p[4])
      if (p[0] === 'b') this.ctx.bezierCurveTo(p[1],p[2],p[3],p[4],p[5],p[6])
    }

    this.paint( lineWidth || 1, strokeColor || 'black', fillColor || 'black'  )
    if (fillColor) this.ctx.fill()
    if (close) this.ctx.closePath();
    this.ctx.stroke()
  }

  text (content, x, y, font, style, fillColor) {
    this.ctx.font = font+'px '+style
    this.ctx.fillStyle = fillColor
    this.ctx.fillText(content, x, y)
  }

  scale (s1, s2) {
    this.ctx.scale(s1, s2)
  }

  paint (width, stroke, fill) {
    this.ctx.fillStyle = fill
    this.ctx.lineWidth = width
    this.ctx.strokeStyle = stroke
  }

  lGrad (obj, g = obj.gradient, cols = obj.colors ) {
    var gradient = this.ctx.createLinearGradient(g[0],g[1],g[2],g[3])
    for (const c of cols) {
      gradient.addColorStop( c[0], c[1] )
    }
    return gradient
  }

  clear () {
    this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height)
  }

/* * * * * * * * * * * * * * * * * ANIMATE * * * * * * * * * * * * * * * * * */

  lineGrow (x,y,ex,ey,c,stk,s,r) {
    const [ xd, yd ] = [ x > ex ? -1 : 1, y > ey ? -1 : 1 ]
    const [ absX, absY ] = [ Math.abs(x-ex), Math.abs(y-ey) ]
    const [ xr, yr ] = absX > absY ? [absY/absX,1] : [1,absX/absY]
    let [ xPx, yPx ] = [ x === ex ? 0 : xd * yr, y === ey ? 0 : yd * xr ]
    this.sprites.push({
      active: true,
      x:x, y:y, ex:ex, ey:ey, c:c, stk:stk, s:s, r:r,
      xp: x,yp: y,xd: xd,yd: yd,
      xPx: isFinite(xPx) ? xPx : 1*xd,
      yPx: isFinite(yPx) ? yPx : 1*yd,
      build: (s)=>{
        [ s.xp, s.yp ] = [ s.xp + (s.xPx*s.s), s.yp + (s.yPx*s.s) ]
        if ((s.yd === 1 && s.yp < s.ey) || (s.yd === -1 && s.yp > s.ey)
        ||  (s.xd === 1 && s.xp < s.ex) || (s.xd === -1 && s.xp > s.ex)) {
          this.line(s.x,s.y,s.xp,s.yp,s.c,s.stk)
          this.end = false
          s.xPx*=s.r, s.yPx*=s.r
        } else {
          this.line(s.x,s.y,s.ex,s.ey,s.c,s.stk)
        }
      }
    })
  }

  animate () {
    this.end = true
    this.clear()
    for (const s of this.sprites) {
      s.build(s)
    }
    if (!this.end) {
      window.requestAnimationFrame(()=>{this.animate()})
    }
    // console.log(this.end)
  }

}
