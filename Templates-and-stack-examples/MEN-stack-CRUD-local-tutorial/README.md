# Step by step guide to setting up a CRUD for basic MEN (MongoDB, Express.js, and Node.js)

- Links to resources:
  - tutorial#1:  <https://zellwk.com/blog/crud-express-mongodb/>
  - tutorial#2: <http://mongodb.github.io/node-mongodb-native/2.0/overview/quickstart/>
  - You'll need to install mongodb with brew (if you haven't):
<br><http://blog.troygrosfield.com/2011/03/21/installing-and-running-mongodb-on-a-mac/>

## Set Up folders/files and dependancies
##### In Termainal...

cd to dir to create new project folder, then...
<br> `$ mkdir name-of-project`
- This will create a new directory/folder for project files

create package.jason file
<br>`$ npm init`
- Hit **enter** through all prompts until you get back to $ ... (or add info if you want)

if you want a notes folder
<br>`$ touch new-text-file-for-notes.txt`

Install dependencies
<br>`$ npm install express --save`
<br>`$ npm install body-parser --save`
<br>`$ npm install mongodb --save`
<br>`$ touch server.js`

build Front-end directory (like the idea of having the FE files under /public)
<br>`$ mkdir public`
<br>`$ cd public`
<br>`$ touch index.html`

When you've added code to index.html and server.js
<br>`$ node server.js`
- REMEBER: you'll have to control+c in terminal and run `$ node server.js` when changing server.js
- OR: install nodemon dependancie, It'll auto restart sever when server.js is changed
  - `$ npm install nodemon --save-dev` only saves on dev enviro
  - `$ ./node_modules/.bin/nodemon server.js`
    - Simplify by using "scripts" in package.json and add
      - "dev": "nodemon server.js" then in terminal just type...
      <br> `$ npm run dev`
  - ! same as > `$ node server.js`, but updates.

## MongoDB and terminal

A few handy commands and info on Mongo commands in terminal.

All databases on your local computer can be found by opening the finder and then hitting the 'GO' tab and selecting computer. The encrypitic datebases are updated there.

to create your own collection in the default database. Open a new terminal window and ...
<br> `$ mongod` or `$ sudo mongod`, ..then
<br> `$ mongo`
- If `$ mongo` dosn't open shell, you'll have to `$ sudo mongod`

This will open the MongoDB shel. Create a new Collecition by...
<br> `> db.my_whatever.save( { 'name' : 'bob', 'age' : '32' } )`

And view your Object...
<br> `> db.my_whatever.find()`

To view all collections
<br> `> show collections`

**However**, if you want to view collected created in Node.js (like in this tutorial), You'll need to navagate a bit.

To view all databases... (default is)
<br> `> show dbs`

To navagate into a different db...
<br> `> use my_other_db`

Now you can '> show collections' to nevagate around your dbs at this level.

## All Set up?
##### Basic Steps to run from reboot...

- open terminal
- `$ sudo mongod`
- **NEW** terminal window & `$ cd` to project folder and open atom
- `$ npm run dev`
- open browser to <http://localhost:3000/>
