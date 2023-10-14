/* 📬 * * * * * Request * * * * * 📬 */ 

/* 🐣 Create Object 🐣 */
function createObjectAPI(theme, callback) {
  const urlString = _config.url+"create_object?"+(new URLSearchParams({
    theme: theme, 
    limit_fields: 10
  })).toString()
  doFetch(urlString, callback)
}

/* 🗣️ Create Object Describe 🗣️ */
function createObjectDescribeAPI({ theme, object }, callback) {
  const urlString = _config.url+"create_object_describe?"+(new URLSearchParams({
    theme: theme,
    object: object,
  })).toString()
  doFetch(urlString, callback)
}

/* 📸 Create Image 📸 */
function createImageAPI(prompt, callback) {
  const urlString = _config.url+"create_image?"+(new URLSearchParams({
    prompt: prompt,
  })).toString()
  doFetch(urlString, callback)
}


/* 🦴 * * * * * Fetch Request * * * * * 🦴 */ 
function doFetch(urlString, callback) {
  loader.style.display = 'block'
  fetch(urlString) 
  .then( res => res.json())
  .then( data => {
    callback(data)
    loader.style.display = 'none'
  })
  .catch( error => { 
    console.log('🚨 error:', error) // * error needs to log to show any code error after this point. 
    loader.style.display = 'none'
  }) // * .finally( ()=> ... )
}