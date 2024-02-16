function updateFileContents(originalContents, fileName, root) {
  let contents = originalContents
  contents = originalContents.split('\n')
  contents = contents.filter( a => a.split(',').length > 1)
  contents = contents.map( a => a.split(','))

  let keys = []
  if (contents.length) {
    keys = contents.shift()
    keys.unshift("id")
  }

  let table = `<table>`
  keys.forEach( key => {
    table += /*html*/`<th> ${key} </th>`
  })
  contents.forEach( (values, index) => {
    table += /*html*/`
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
  openedFileName.root = root ? true : false
  fileContent.innerHTML = /*html*/`
    <textarea id="fileContentBox" cols="30" rows="10">${originalContents}</textarea>
    <br/>
    <button id="updateFile_btn" onclick="updateFile()">Update File</button>
    ${table}
  `
}

function updateFiles(files) {
  filesList.innerHTML = /*html*/`
    <h3>Files List:</h3>
    ${files.map(f=>`<div>${f}<div>`).join('')}
  `
}