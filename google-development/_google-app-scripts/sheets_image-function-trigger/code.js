function button_function() {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  ss.getRange("C3").setValue(["🦖Rawr! Math👇"])
  ss.getRange("C6").setValue(["=SUM(C4*C5)"])
}

function dramatic_message() {
  const message = ["😱 Wow!","👈 that","button","made","THIS 🎉"]

  const ss = SpreadsheetApp.getActiveSpreadsheet()
  for (let i = 0; i < message.length; i++) {
    ss.getRange("C"+(i+2)).setValue([message[i]])
    SpreadsheetApp.flush()
    Utilities.sleep(250)
  }
}
