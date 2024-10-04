function getPromptString(input) {

  return `
  input: Blood
  output: red
  
  input: Grass
  output: green
  
  input: Sky
  output: blue
  
  input: Wood
  output: brown
  
  input: Cloud
  output: white
  
  input: Bee
  output: yellow, black
  
  input: Cow
  output: black, white
  
  input: Tree
  output: green, brown
  
  input: Clown fish
  output: orange, white, black
  
  Given the following examples, what color would the following outputs be?
  input: ${input}
  output:
  `
  
  }
  module.exports = { getPromptString }