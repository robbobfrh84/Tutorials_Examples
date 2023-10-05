// * 🔥 NOTE 🔥  Must add "type": "module", to package.json 
import { Configuration, OpenAIApi } from "openai"
import * as dotenv from 'dotenv'
dotenv.config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


const start = async function() {
  const fullPrompt = 
  `
  Create a JSON object called "bob"
  - Add the fields ‘name’ and ‘age’. 
  - Assign ‘Bob Main’ as the name value .
  - Assign 38 as the age value.

  Note: response should be stringified
  `;
  
  const response = await openai.createCompletion({
    model: "gpt-3.5-turbo-instruct",
    // prompt: `What is 2+5?`,
    prompt: fullPrompt,
    // temperature: 0.6,
    temperature: 0,
    max_tokens: 256,
  });

  console.log('   - - - - - - asdf')
  console.log('response:',response.data.choices[0])
}

start();