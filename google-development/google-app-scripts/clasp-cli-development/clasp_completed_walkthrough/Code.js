function myFunction() {
  Logger.log("A log for you")
  return "Ok it works here"
}

function paramExplore(param){
  console.log("from logs: ", param) // user Logger.log for UI logs *see above
  return "Your argument was... 👉 " + param
  // return "Your argument was... 👉 " + param.string
  // return "Your argument was... 👉 " + param[2]
}

function paramExplore2(p1,p2) {return p1+' '+p2}
