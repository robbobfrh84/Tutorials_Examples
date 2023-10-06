const { Configuration, OpenAIApi } = require("openai")
const dotenv = require('dotenv')
dotenv.config()

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY })
const openai = new OpenAIApi(configuration)

const reqTextPrompt = async function({ theme, limit_fields }) {

  const test = `
    Create a JSON object
    - Use the term "${theme}" as a theme. This should not be included in the object.
    - Add the fields "name" and give it a value associated with the theme.
    - Add the field "age" and give it a value associated with the theme.
    - Add 5 more fields and values that would associate with this theme.
    - limited to ${limit_fields} fields.
  `

  const response = await openai.createCompletion({
    model: "gpt-3.5-turbo-instruct",
    prompt: test,
    temperature: 0.6,
    max_tokens: 256,
  });

  return JSON.parse(response.data.choices[0].text)
}

module.exports = { reqTextPrompt }







