# React SPA Router Basic. 

Followed this tutorial 👇
https://www.kirupa.com/react/creating_single_page_app_react_using_react_router.htm

* $`cd` ... < Nav to your choses directory
* $`create-react-app react_spa`
  * builds react file base.
* $`sudo npm i react-router-dom --save`
  * installs react router for dom.
* Delete everything inside your public & src folders.
* Create "index.html" inside your public folder. Add this code 👇

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>React Router Example</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```
* Create "index.js" in the src folder. Add this code 👇

```javascript
import React from "react";
import ReactDOM from "react-dom";
import Main from "./Main";
import "./index.css";

ReactDOM.render(
  <Main/>,
  document.getElementById("root")
);
```

* Create "Main.js" in the src folder. Add this code 👇

```javascript
import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./Home";
import Stuff from "./Stuff";
import Contact from "./Contact";

class Main extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <h1>Simple SPA</h1>
          <ul className="header">
            <li><NavLink exact to="/">Home</NavLink></li>
            <li><NavLink to="/stuff">Stuff</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
          </ul>
          <div className="content">
            <Route exact path="/" component={Home}/>
            <Route path="/stuff" component={Stuff}/>
            <Route path="/contact" component={Contact}/>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default Main;
```

* Now, $`npm start` to fire up your app.
* The basic frame is set, but no style and NO ROUTING
  * Create "Home.js" in the src folder. Add this code 👇

```javascript
import React, { Component } from "react";

class Home extends Component {
  render() {
    return (
      <div>
        <h2>HELLO</h2>
        <p>Cras facilisis urna ornare ex volutpat, et
        convallis erat elementum. Ut aliquam, ipsum vitae
        gravida suscipit, metus dui bibendum est, eget rhoncus nibh
        metus nec massa. Maecenas hendrerit laoreet augue
        nec molestie. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus.</p>

        <p>Duis a turpis sed lacus dapibus elementum sed eu lectus.</p>
      </div>
    );
  }
}

export default Home;
```

* Create "Stuff.js" in the src folder. Add this code 👇

```javascript
import React, { Component } from "react";

class Stuff extends Component {
  render() {
    return (
      <div>
        <h2>STUFF</h2>
        <p>Mauris sem velit, vehicula eget sodales vitae,
        rhoncus eget sapien:</p>
        <ol>
          <li>Nulla pulvinar diam</li>
          <li>Facilisis bibendum</li>
          <li>Vestibulum vulputate</li>
          <li>Eget erat</li>
          <li>Id porttitor</li>
        </ol>
      </div>
    );
  }
}

export default Stuff;
```

* Create "Contact.js" in the src folder. Add this code 👇

```javascript
import React, { Component } from "react";

class Contact extends Component {
  render() {
    return (
      <div>
        <h2> GOT QUESTIONS </h2>
        <p>The easiest thing to do is post on
        our <a href="http://forum.kirupa.com">forums</a>.
        </p>
      </div>
    )
  }
}

export default Contact;
```

* Create CSS "index.css" in the src folder. Add this code 👇

```css
body {
  background-color: #FFCC00;
  padding: 20px;
  margin: 0;
}
h1, h2, p, ul, li {
  font-family: sans-serif;
}
ul.header li {
  display: inline;
  list-style-type: none;
  margin: 0;
}
ul.header {
  background-color: #111;
  padding: 0;
}
ul.header li a {
  color: #FFF;
  font-weight: bold;
  text-decoration: none;
  padding: 20px;
  display: inline-block;
}
.content {
  background-color: #FFF;
  padding: 20px;
}
.content h2 {
  padding: 0;
  margin: 0;
}
.content li {
  margin-bottom: 10px;
}
.active {
  background-color: #0099FF;
}
```


### What's happening...
So, routing is handled mostly in the Main.js file.
