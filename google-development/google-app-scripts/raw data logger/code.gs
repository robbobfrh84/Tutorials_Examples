function doGet(e) {
  const data = {
    t: parseFloat(e.parameter.t) - 10,
    h: parseFloat(e.parameter.h) - 10,
  }
  appendRow(data)
  return ContentService.createTextOutput("Data added: "+JSON.stringify(data))
}

function appendRow(data) {
  var ss = SpreadsheetApp.getActiveSpreadsheet()
  var sheet = ss.getSheets()[0]
  sheet.appendRow([new Date(), data.t, data.h]);
}
