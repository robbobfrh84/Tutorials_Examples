# Using Google Sheets as a Database 
Checkout index.html in this folder, or code below.
Link to DB example: https://docs.google.com/spreadsheets/d/1hD3oMGnG5mX2Wujgm13k8gGKsrID0NYfG80-69rQwwQ/edit?usp=sharing

### Create the Sheet
To create a new sheet you must have a gmail account. 
* go to http://sheets.google.com 
* Create New
  * Create your sheet with the top row as your key names. 
* Give a name
* File > Publish to the Web.
  * NOTE: the link they provide is not what you want for this. 

You now can copy the key from the *current url window*.
* Ignore other links like those you would use to share the actual sheet! 
* See url.png in this folder for help.
* This is your **Sheet Key**

### Add your sheet to demo html code
Copy the demo.html file into a new project folder.
* Rename as needed
* Copy this string to be used as your url "https://spreadsheets.google.com/feeds/list/<Your Key Here>/od6/public/values?alt=json"
  * Paste your **Sheet Key** from earlier. 

Now, if you structured your sheet similar to the demo, you should see your fields and values. 
* Obviously all this can be changed to meet your needs, this is just a common DB format to follow. 

### Example code
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title> Google Sheets DB </title>
</head>
<body>
 <h2> Google Sheets BD </h2>
 <h1>MY COOL BANDS!</h1>
  <div id='myBands'></div>
</body>
</html>
<script>
// Empty URL Template > "https://spreadsheets.google.com/feeds/list/<Your Key Here>/od6/public/values?alt=json"
var demo = "https://spreadsheets.google.com/feeds/list/1hD3oMGnG5mX2Wujgm13k8gGKsrID0NYfG80-69rQwwQ/od6/public/values?alt=json"
_GET = (url, callback)=>{
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      console.log(xhr)
      if (callback) callback(JSON.parse(xhr.responseText))
    }
  }
  xhr.send(null)
}
_GET(demo, (data)=>{
  data = data.feed.entry
  console.log('data: ', data);
  const myBands = document.getElementById("myBands")
  for (const row of data) {
    myBands.innerHTML += /*html*/`
      <hr>
      <h3> ${row.gsx$name.$t} </h3>
      (${row.gsx$type.$t}) from <strong> ${row.gsx$city.$t} </strong>
      <h3>${JSON.stringify(row.gsx$data.$t)}</h3>
      <img src='${row.gsx$image.$t}'></img>
    `
  }
})
</script>
```
