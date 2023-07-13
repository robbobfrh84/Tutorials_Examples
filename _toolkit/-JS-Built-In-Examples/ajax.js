_GET = (url, callback)=>{
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      if (callback) callback(JSON.parse(xhr.responseText))
    }
  }
  xhr.send(null)
}

// EXAMPLE 👇
var _example_url = 'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&select=pl_hostname,ra,dec&order=dec&format=JSON'

_GET(_example_url, (data)=>{
  console.log(data)
})

/* BARE-BONES

var xhr = new XMLHttpRequest();
xhr.open('GET', url, true);
xhr.onreadystatechange = function () {
  if (xhr.readyState == 4) { console.log(xhr) }
}
xhr.send(null)

*/
