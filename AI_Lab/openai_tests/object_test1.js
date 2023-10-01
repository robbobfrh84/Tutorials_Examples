import { Configuration, OpenAIApi } from "openai"
import * as dotenv from 'dotenv'
dotenv.config()

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY })
const openai = new OpenAIApi(configuration)

const test = `
Create a JSON object
- Add the fields "name". 
- Add the field "age".
- Assign values that would be associated with a witch.
- Add 5-10 more fields and values that would associate with this witch.
`

const start = async function() {
  
  const response = await openai.createCompletion({
    model: "gpt-3.5-turbo-instruct",
    prompt: test,
    temperature: 0.6,
    max_tokens: 256,
  });

  console.log('Response Text', response.data.choices[0].text)
}
start()