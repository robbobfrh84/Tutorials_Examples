function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("Shuffle Tools")
    .addItem("Shuffle Selected Range", "shuffleSelectedRange")
    .addToUi()
}

function shuffleSelectedRange() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()
  var range = sheet.getActiveRange()
  
  if (!range) {
    SpreadsheetApp.getUi().alert("No range selected.")
    return
  }
  
  var values = range.getValues()
  var backgrounds = range.getBackgrounds()
  var rowCount = values.length
  var colCount = values[0].length
  var flattened = values.flat()
  var flattenedBackgrounds = backgrounds.flat()
  
  for (var i = flattened.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1))
    var temp = flattened[i]
    flattened[i] = flattened[j]
    flattened[j] = temp
    var tempBg = flattenedBackgrounds[i]
    flattenedBackgrounds[i] = flattenedBackgrounds[j]
    flattenedBackgrounds[j] = tempBg
  }
  
  var reshaped = []
  var index = 0
  for (var r = 0; r < rowCount; r++) {
    var row = []
    for (var c = 0; c < colCount; c++) {
      row.push(flattened[index++])
    }
    reshaped.push(row)
  }

  var reshapedBackgrounds = []
  var indexBg = 0
  for (var rb = 0; rb < rowCount; rb++) {
    var rowBg = []
    for (var cb = 0; cb < colCount; cb++) {
      rowBg.push(flattenedBackgrounds[indexBg++])
    }
    reshapedBackgrounds.push(rowBg)
  }
  
  range.setValues(reshaped)
  range.setBackgrounds(reshapedBackgrounds)
}
