// You have an innical x,y length, but want that angle to match a specific hypotenuse
// length, this will return new x,y values to match that length
function _abcRatio(a1,b1,c){
  const c1 = Math.sqrt((a1*a1) + (b1*b1))
  const a2 = (c * a1) / c1
  const b2 = (c * b1) / c1
  return [a2,b2]
}

// Returns the distance between two points. 
function _getDist(x1,x2,y1,y2) {
  const [ a, b ] = [ Math.abs(x1 - x2), Math.abs(y1 - y2) ]
  return Math.sqrt( (b*b) + (a*a) )
}
