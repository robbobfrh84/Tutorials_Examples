function updateFileContents(originalContents, fileName) {
  let contents = originalContents
  contents = originalContents.split('\n')
  contents = contents.filter( a => a.split(',').length > 1)
  contents = contents.map( a => a.split(','))

  let keys = contents.shift()
  keys.unshift("id")

  let table = `<table>`
  keys.forEach( key => {
    table += `<th> ${key} </th>`
  })
  contents.forEach( (values, index) => {
    table += `
      <tr> 
        <td> ${index} </td>
        ${ values.map( v => {
          return `<td> ${v} </td>`
        }).join('')}
      </tr>
    `
  })
  table += `</table>`

  openedFileName.innerHTML = fileName
  fileContent.innerHTML = `
    <textarea id="fileContentBox" cols="30" rows="10">${originalContents}</textarea>
    <br/>
    <button id="updateFile_btn" onclick="updateFile()">Update File</button>
    ${table}
  `
}