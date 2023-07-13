function _get(url, callback) {

  fetch(url)
    .then(res => res.json())
    .then(data => callback(data) )
    .catch(err => alert(err))
    .finally(message => console.log('...finally', message))

}

function _post(url, callback) {

  fetch(url, {
    method: "post",
    body: JSON.stringify({ name: userName.value, favColor: favColor.value }),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.json())
    .then(data => callback(data) )
    .catch(err => alert(err))
    .finally(message => console.log('...finally', message))
}

function _postCO(url, callback) {
  console.log('ooo')

  fetch(url, {
    method: "POST",
    headers: { 'Content-Type' : 'application/x-www-form-urlencoded' }, // this is recieved by the express router as the key with an empty value. i couldn't figure it out anyother way tho it WORKS!
    body: JSON.stringify({ name: userName.value, favColor: favColor.value })
  })
    .then(res => res.json())
    .then(data => callback(data) )
    .catch(err => alert(err))
    .finally(message => console.log('...finally', message))
}

/*
some urls that this demo tests...
- http://localhost:3000/api
- /api
- http://localhost:3000/api/Access-Control-Allow-Origin
- https://dog.ceo/api/breeds/list
*/
