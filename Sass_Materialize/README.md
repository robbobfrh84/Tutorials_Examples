# Basic step-by-step guide to setting up sass with materialize css framework and workflow

This guide aims to get a project up, running and ready for development starting from scratch.

### Installing Sass on a mac

We're going to be installing the pure JavaScript implementation of Sass. To do this open your Terminal and run the command to install Sass Globally on your machine.
- $`npm install -g sass`

Confirm you installation was successful, execute this command.
- $`sass --version`
- Your output should be something like `1.16.1 compiled with dart2js 2.1.0`

### Installing Materialize

Visit materialize website and download the Sass version of materialize. https://sass-lang.com/install
- Unzip the file and place the folder in your project folder

### Getting Started on your project

$`cd` into the "materialize-src" folder and then into the sass folder and run the command...
- $`sass materialize.scss materialize.css`
- This will create a new file "materialize.css" with your compiled .css code.

See the index.html file here for some demo source code.
- NOTE: that the .css link in the header targets the compiled .css from .sass.
- open that index.html to see in action.

----
# References:
- Installing Sass:
  - https://sass-lang.com/install
- Walkthrough:
  - https://ghariaonline.wordpress.com/2016/03/14/materialize-css-changing-default-theme-with-sass/
- Installing Materialzie:
  - https://materializecss.com/getting-started.html
- TreamTreehouse Sass:
  - https://teamtreehouse.com/library/installing-and-using-sass

NEXT STEPS:
- https://medium.com/@mattdlockyer/youre-using-materialize-css-wrong-470b593e78e9
