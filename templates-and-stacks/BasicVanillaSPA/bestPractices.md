# Best Practices
Follow these guidelines to keep your Vanilla Single Page Application clear, readable and to avoid naming crossover errors. 

### Global Variables

JavaScript:
* Start all global variables with `_`
  * Examples: `_myfunc = ()=>{}`, `var str = 'hello'`

CSS:
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

