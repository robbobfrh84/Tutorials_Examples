NAME="Bob"

echo ""
echo "Hello $NAME! Let's make a new project! "
echo ""
echo "What would you like the project's folder to be called?"
read projectName
echo ""
echo "Ok, '/$projectName' it is!"
echo ""
echo "...Laying the bones down for a new project..."
echo ""


# folder and html
mkdir $projectName
cd $projectName
touch index.html

echo "
<!DOCTYPE html>
<link rel="stylesheet" href="css/main.css">
<body>
  Your project name in light!
  <h3>$projectName</h3>
</body>
<script src='js/main.js'></script>
<html/>
" >> index.html

# build css
mkdir css
touch css/main.css
echo "
h3 {
  color: red;
}
" >> css/main.css

# build js
mkdir js
touch js/main.js
echo "
var x = document.getElementsByTagName('h3')[0]
setInterval(()=>{
  x.style.opacity === '1' ? x.style.opacity = 0.1 : x.style.opacity = 1
}, 500)
" >> js/main.js

atom .

open index.html
