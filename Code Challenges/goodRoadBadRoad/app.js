var guide1 = "Liar"
var guide2 = "Honest"
var goodRoad = "left"
var badRoad = "right"


function ask_what_is_bad_road(guide){

  if (guide === "Honest") {
    return badRoad === "left" ? "left" : "right"
  } else {
    return badRoad === "left" ? "right" : "left"
  }

}


function what_will_the_other_guide_say(askedGuide, otherGuide){

  let road = ask_what_is_bad_road(otherGuide)

  if (askedGuide === "Honest")  {
    return road === "left" ? "left" : "right"
  } else {
    return road === "left" ? "right" : "left"
  }

}


process.stdout.write('\033c')
console.log('* * * * * * * * * * * * * * * * * * * * * * * * * * *')
console.log('\nAsking Guide1: "What will the other guide say is the bad road?"')
console.log('\n - Guide1 Responds: "Guide 2 will say... "')
console.log("\n   'The bad road is " + what_will_the_other_guide_say(guide1, guide2) + ".'")
console.log('\nAsking Guide2: "What will the other guide say is the bad road?"')
console.log('\n - Guide2 Responds: "Guide 1 will say... "')
console.log("\n   'The bad road is " + what_will_the_other_guide_say(guide2, guide1) + ".'")
console.log('\n* * * * * * * * * * * * * * * * * * * * * * * * * * *\n\n')
