/*******************************************************************************
    SVG Functions
********************************************************************************/// this function cleans up and simplifies creating element attributes./////
// this function cleans up and simplifies creating element attributes./////
function createEl(type,att){
  var newObj = document.createElementNS(svgElement, type);
  for (var i=0; i<att.length; i++){
    newObj.setAttributeNS(null, att[i][0],att[i][1]);
  }
  document.getElementById("mainSVG").appendChild(newObj);
}

function updateEl(Id, att) { //function used to update any attributes with DOM.
  for (var i=0; i<att.length; i++){
    document.getElementById(Id).setAttributeNS(null, att[i][0],att[i][1]);
  }
}
