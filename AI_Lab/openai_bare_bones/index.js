import { Configuration, OpenAIApi } from "openai"
import * as dotenv from 'dotenv'
dotenv.config()

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY })
const openai = new OpenAIApi(configuration)

const start = async function() {
  
  const response = await openai.createCompletion({
    model: "gpt-3.5-turbo-instruct",
    prompt: "What chemical compounds are computers mostly made from?",
    temperature: 0.6,
    max_tokens: 256,
  });

  console.log('Response Text', response.data.choices[0].text)
}
start()