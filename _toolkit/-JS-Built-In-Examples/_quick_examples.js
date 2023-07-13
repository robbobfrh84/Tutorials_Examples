/******** String/Arr Parsing *******/
arr.includes(value) // >Booloan. If the value is represented in the array.
str.substr(index+) // >string. custs string at the index. returns 2nd half, str dosn't change., oddly, it's not a 0th index, but first.
arr.splice(i, 1) // removes index at i. the second param tells how many additional beyond.
arr.indexOf(value) // >Integer. can even be entire object in array!
arr.join(' ') // >String. joins array with spaces between indices.
str.split('-') // >Arr. Splits str at -
str.split(/[.\[\]]/) // >Arr removes . [ ]
"Obj.str2[1].more".split(/[.\[\]]/).filter(Boolean) // >Arr removes . [ ] But! with this string it'll leave a dead "", the filter removes that.
JSON.parse(data) // > Object from string of data.
//--- SORT
arr.sort(); // >Array
arr.sort(function(a,b){return b - a}); //sorts an array followed by sort in reverse in reverse order.
colors.sort((a,b) =>  a.name < b.name ? -1 : 1 ) //sorts objects in array by key value of object

/******** DataTypes (changing / descovering)*******/
parseInt(stringLiteralAsNumber) // >Intiger. converts string num to intiger.
int.toString() // >String. converts int to String
Array.isArray(obj) // >Bool. wheather or not it's an array or Object. WHY NOT? typeOf, because Arr & Obj both return as Obj's

/******** Objects *******/
Object.keys(obj) // >array of keys
Object.keys(obj).indexOf('key') // >Intiger. find the index of a key within an object.

/******** DOM Data, window/document/etc... *******/
var project = window.location.href.split('?')[1] //Returns the string of the query string of the url WIHTOUT the ?.....


/******** DOM interactions *******/
document.querySelectorAll('[for]') // >Array of DOM objects with for attribute
tag.hasAttribute('attribute') // >Bool if it has the attr
tag.getAttribute('attribute') // >String Gets html's tag element DOM attributes.
tag.Some_Attribue = 'value' // many html attributes can be added dot.notation.style
tag.removeChild(tag.childNodes[0]) // removes first child within html's tag.
while (tag.hasChildNodes()) { tag.removeChild(tag.lastChild) } // remove ALL children
// ..creating NEW tag and elm....
var newTag = document.createElement('html') // creats new tag
let att = document.createAttribute("class"); // create custom Attribute
  att.value = "democlass";
  tag.setAttributeNode(att);
//
var textElm = document.createTextNode('Some text') // creates text elm
newTag.appendChild(textElm) // puts text elm inside new tag
parent.appendChild(newTag) // puts tag into DOM
let clone = tag.cloneNode(true) //cloneNode


/******** DOM buildin call backs *******/
document.onreadystatechange = function(){ if(document.readyState === 'complete'){ ...}} //function firest after document has been loaded... one of many ways to do this ... btw...
onDOMContentLoaded = (()=>{ callSomeFunction() })()

/******** RegExp *******/
new RegExp(aBunchOfcharsArr.join('|')).test(toSearchThroughArr) // >Bool if ALL conditions are met. test() is NOT poop in this.

/******** quick functions *******/
(function (){ console.log('will auto fire') })() // self-invoking function
ES6 (()=>{ console.log('will auto fire') })() // self-invoking function

/******** events *******/
Event Listener Types = [ click, mousedown, mouseup, keyup, keydown, keypress ]
inputId.addEventListener('keypress', function (e) { if (e.keyCode == 13) { ?? }}) // ??=add stuff to do when "enter" is pressed while filling out input tag.

/******** loops *******/
array.forEach(function(value, i) { console.log(value, i) }) // value is object/array/var, whatever of ARRAY, i is index

/******** time *******/
const startTime = window.performance.now()
console.log((window.performance.now() - startTime) + ' milliseconds')
OR window.date.now()

/*********************/
/****     ES6+    ****/
/*********************/

Object.entries(obj).map(([key, val]) => `${key}=${val}`).join('&') // > String of URL query parameters

/******** Arrow Funcs *******/
( p1, p2 )=>{ expression }
p1 => { expresison }
()=> expression // auto return expression ! only: if not parameter
