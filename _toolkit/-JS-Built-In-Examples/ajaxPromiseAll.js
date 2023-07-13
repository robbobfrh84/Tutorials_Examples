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
var _example_urls = [
  'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&select=pl_hostname,ra,dec&order=dec&format=JSON',
  'http://www.strudel.org.uk/lookUP/json/?name=pluto',
  'https://dog.ceo/api/breeds/list',
]

var promises = _example_urls.map( (url, i) => {
  return new Promise(function(res, rej) {
    _GET(url)
      .then(payload => {
        console.log('Promise Resolved: ', url)
        res(payload)
      })
      .catch(err => console.log('! Problem retrieving data !\n\n'+err))
  })
})

Promise.all(promises).then(function(allData) {
  console.log('🌟All Promises Resolved', allData);
})
