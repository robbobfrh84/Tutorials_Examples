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
* Create "index.js" in the src folder.

```javascript
import React from "react";
import ReactDOM from "react-dom";
import Main from "./Main";

ReactDOM.render(
  <Main/>,
  document.getElementById("root")
);
```
