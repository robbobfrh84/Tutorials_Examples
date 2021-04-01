window.onload = ()=>{
  start()
}

function start() {
  try {
    updateCSVTable()
  } catch(err) {
    console.log("err :", err)
    console.log("The file has not been created yet. It will be read after adding entry to .cvs")
  }

  function readFileExample() {
    const contents = readFile('./files/file_to_read.txt')
    const contents_Lines = contents.split('\n')
    const contents_Html_Breaks = contents_Lines.join("<br>")
    readFileText.innerHTML = contents_Html_Breaks
  }

  function writeFileExample() {
    writeFile('./files/file_to_write.csv', inputName.value, inputNumber.value)
    updateCSVTable()

  }

  function updateCSVTable() {
    let contents = readFile('./files/file_to_write.csv')
    contents = contents.split('\n')
    contents = contents.filter( a => a.split(',').length > 1)
    contents = contents.map( a => a.split(','))
    let table = `
      <table>
      <tr>
        <th> Name </th>
        <th> Number </th>
      </tr>
    `
    contents.forEach( ([name, number]) => {
      table += `
        <tr>
          <td> ${name} </td>
          <td> ${number} </td>
        </tr>
      `
    })
    table += `</table>`
    writeFileText.innerHTML = table
  }
}
