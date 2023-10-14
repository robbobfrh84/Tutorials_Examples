/* 🎬 * * * * Events * * * * 🎬 */

/* 🐣 Create Object 🐣 */
function createObject() {
  createObjectAPI(themeInput.value, (data)=>{
    console.log('🐣 response data:', data)
    _config.object = data
    createObjectDescribeBtn.style.display = "block"
    responseObjTextArea.innerHTML = JSON.stringify(data,null,2)
  })
}

/* 🗣️ Create Object Describe 🗣️ */
function createObjectDescribe() {
  createObjectDescribeAPI({
      theme: _config.object.query.theme,
      object: JSON.stringify(_config.object.response)
    }, (data)=>{
      console.log('🗣️ response data:', data)
      _config.description = data.response.split("\n").join('')
      createImageBtn.style.display = "block"
      responseDescribeTextArea.style.display = "block"
      responseDescribeTextArea.innerHTML = /*html*/`
        ${_config.description}
      `
  })
}

/* 📸 Create Image 📸 */
function createImage() {
  createImageAPI(_config.description, (data)=>{
    console.log('📸 response data:', data)
    imageDiv.innerHTML = /*html*/`
      <img id="testImage" width="400" src="${data.response}">
    `
  })
}