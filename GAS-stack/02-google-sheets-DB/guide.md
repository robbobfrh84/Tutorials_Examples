# Using Google Sheets as a Data-Base 
Checkout demo.html in this folder
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
