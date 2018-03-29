# An introduction to react
This tutorial was built by following a tutorial from the following link: https://reactjs.org/tutorial/tutorial.html

To get started, in Terminal... I ran $`mkrdir react-intro` to create the directory and `touch bobNotes.md` to create this markdown file for notes! As is, I'm going to do all the work in terminal.

Create the react app skeleton/template code base.
- $ `sudo npm install create-react-app`
- $ `create-react-app my-app`
- $ `cd my-app`
- Open Project on localHost > $ `npm start`

So... That's the basics to get a react app up and running on localHost. Now lets clean out the code and start our own project...
- In Terminal you'll need a new tab open to continue commands while the localHost runs. So press `command+t` to open a new tab.
- Remove all the fluff that comes along with the template in the src/ folder > $ `rm -f src/*`

Create your own .css and .js files
- $ `touch src/index.css`
- $ `touch src/index.js`
- include this bit at the TOP of your index.js
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
```
- Copy and paste **.css** and **.js** code from > https://codepen.io/gaearon/pen/oWWQNa?editors=0100
- Now you can run in a local host with $ `npm start`

From this point, the tutorial i followed was really great and going through the code and adding functionality to the app really did help to understand react. Here's the link again: https://reactjs.org/tutorial/tutorial.html













----
