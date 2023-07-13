# Best Practices
Follow these guidelines to keep your Vanilla Single Page Application clear, readable and to avoid naming crossover errors. 

### Global Variables

Files
* Name all .js files that are pages with `page_` as a prefix. This will keep your pages separate from other .js files (classes, helper functions, etc..). And, keep the names similar to their given ids.

JavaScript:
* Start all global variables with `_`
  * Examples: `_myfunc = ()=>{}`, `var str = 'hello'`

HTML / CSS:
* Place pages within Divs
* Give pages id with a `page-` prefix. This will prevent naming crossovers with other css elements throughout the site. 
* Every css element within a page should include page's id when styled in css. 
  * Example:
  ```css
  #page-home .container {
    background-color: red;
  }
  #page-home .myDiv1 {
    color: green;
  }
  ```

