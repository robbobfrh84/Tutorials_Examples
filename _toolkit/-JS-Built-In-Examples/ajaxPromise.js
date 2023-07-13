_GET = (url)=>{
  return new Promise((res, rej) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status == 200) {
          res(xhr.responseText)
        } else {
          rej(xhr)
        }
      }
    }
    xhr.send(null)
  })
}
/*
- - - - - EXAMPLE 👇 - - - - -
*/
var _example_url = 'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&select=pl_hostname,ra,dec&order=dec&format=JSON'

_GET(_example_url)
  .then(payload => _doSomething(payload))
  .catch(err => console.log('! Problem retrieving data !\n\n'+err))
  .finally(data => console.log('this function fires always. Good for loading annimation turnoffs'))

_doSomething = (data)=>{
  console.log(data);
}
