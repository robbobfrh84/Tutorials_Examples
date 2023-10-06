/* - - - - - API - - - - - */ 
function createObjectAPI(theme) {

    const urlString = _config.url+"create?"+(new URLSearchParams({
      theme: theme,
      limit_fields: 10
    })).toString()

    fetch(urlString)
      .then( res => res.json())
      .then( data => {
        createObjectResponse(data)
      })
      .catch( error => { 
        console.log('🚨 error:', error) // * error needs to log to show any code error after this point. 
      }) // * .finally( ()=> ... )

}