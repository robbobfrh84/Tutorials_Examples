/* 🎬 * * * * Events * * * * 🎬 */

/* 🐣 Create Object 🐣 */
function createObject() {
  createObjectAPI({
    theme: themeInput.value, 
  }, (data)=>{
    console.log('🐣 response data:', data)
    createObjectDescribeBtn.disabled = false
    responseObjTextArea.value = JSON.stringify(data.response,null,2)
  })
}

/* 🗣️ Create Object Describe 🗣️ */
function createObjectDescribe() {
  createObjectDescribeAPI({
    theme: themeInput.value,
    object: JSON.stringify(responseObjTextArea.value)
  }, (data)=>{
    console.log('🗣️ response data:', data)
    const description = data.response.split("\n").join('')
    responseDescribeTextArea.value = description
  })
}

/* 📸 Create Image 📸 */
function createImage() {
  createImageAPI({
    prompt: responseDescribeTextArea.value
  }, (data)=>{
    console.log('📸 response data:', data)
    imageDiv.innerHTML = /*html*/`
      <img id="testImage" width="400" src="${data.response}">
    `
  })
}