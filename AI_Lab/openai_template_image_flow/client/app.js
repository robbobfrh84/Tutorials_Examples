const _config =  {
  url: "http://localhost:8080/",
  object: {},
  description: "",
}

window.onload = ()=>{
  checkURL()
}

function checkURL() {
  const hash = window.location.hash
  const clientURL = window.location.origin + window.location.pathname
  if ( 
    clientURL === "" // * Add an allowed client url here. Example: "https://robbobfrh84.github.io/palm-ai-app/" 
    || clientURL === "" // * Add an allowed client url here. Example: https://colorai.farm/"
    || hash === "#prod" // * for testing, force testing the produstion url. 
  ) {
    _config.url = "" // * Add your live server url here. Example: "https://palm-ai-app.uw.r.appspot.com/"
  }
}