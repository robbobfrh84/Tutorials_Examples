function newObject(objectName){
  const fullPrompt = 
`
Create a JSON object
- Add the fields "name". 
- Add the field "age".
- Assign "Bob Main" as the name value.
- Assign 38 as the age value.
`;

  return {
    model: "gpt-3.5-turbo-instruct",
    prompt: fullPrompt,
    temperature: 0, // 🔥 Was 0.6 - Note this change in writeup. 
    max_tokens: 256,
  }

}

function updateObjectField(objectName){

  const fullPrompt = 
`
Given the following object "${objectName}".
- { "name": "Bob Main", "age": 38 }
Add 1 year to "${objectName}".
And, return the modified object
`

  return {
    model: "gpt-3.5-turbo-instruct",
    prompt: fullPrompt,
    temperature: 0, // 🔥 Was 0.6 - Note this change in writeup. 
    max_tokens: 256,
  }

}


module.exports = { newObject, updateObjectField }
