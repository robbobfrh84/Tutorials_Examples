/* -------- Simple example ---------- */

// function onEdit(e) {
//   const cell_input = e.range.getValue()
//   if (cell_input == "orange") {
//     e.range.setBackground("orange")
//   }
// }

/* -------- 🌈splash🌈 example ---------- */

function onEdit(e) {
  const cell_input = e.range.getValue()
  if (cell_input == "splash") {
    dramtic_display(["teal","cornflowerBlue","green","crimson","goldenrod","purple","violet","orange"])
  } else if (cell_input == "cleanup") {
    dramtic_display(["#fff","#fff","#fff","#fff","#fff","#fff","#fff","#fff"])
  }
}

function dramtic_display(colors) {
  const columns = ["C","B","H","E","D","A","F","G"]
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  for (let i = 0; i < columns.length; i++) {
    const colA = SpreadsheetApp.getActiveSheet().getRange(columns[i]+":"+columns[i])
    colA.setBackground(colors[i])
    SpreadsheetApp.flush()
    Utilities.sleep(200)
  }
}
