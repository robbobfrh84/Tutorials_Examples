const { Configuration, OpenAIApi } = require("openai")
const dotenv = require('dotenv')
dotenv.config()

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY })
const openai = new OpenAIApi(configuration)

const ai = {
  
  /* 🐣 Create Object 🐣 */
  create_object: async function({ theme, limit_fields }) {

const prompt = `Create a JSON object.
- Use the term "${theme}" as a theme. This should not be included in the object.
- Add the fields "name" and give it a value associated with the theme.
- Add the field "age" and give it a value associated with the theme.
- Add 5 more fields and values that would associate with this theme.
- limited to ${limit_fields} fields.
- Provide the answer in a JSON format only.`

    console.log('\n - 🐣 create_object prompt: ', prompt)
  
    const response = await openai.createCompletion({
      model: "gpt-3.5-turbo-instruct",
      prompt: prompt,
      temperature: 0.6,
      max_tokens: 256,
    });

    console.log(' * response.data.choices[0]:', JSON.parse(response.data.choices[0].text))
    return JSON.parse(response.data.choices[0].text)
  
  },

  /* 🗣️ Create Object Describe 🗣️ */
  create_object_Describe: async function({ theme, object }) {

    object = JSON.stringify(object).split('\\')

prompt = `Write a visual description of a ${theme}, using the following JSON object information to paint the picture.
- Less than 50 words.      

${object.join('')}`

    console.log('\n - 🗣️ create_object_Describe prompt: ', prompt)

    const response = await openai.createCompletion({
      model: "gpt-3.5-turbo-instruct",
      prompt: prompt,
      temperature: 0.6,
      max_tokens: 256,
    });

    console.log(' * response.data.choices[0]:', response.data.choices[0].text)
    return response.data.choices[0].text
  
  },

/* 📸 Create Image 📸 */
  create_image: async function({ prompt }) {

prompt = `Create digital art from the following description.

${prompt}`

    console.log('\n - 📸 create_image prompt: ', prompt)
  
    const response = await openai.createImage({ // * Resource: https://platform.openai.com/docs/guides/images/usage
      prompt: prompt,
      n: 1,
      size: "256x256", // * Limited to: 256x256, 512x512, 1024x1024 
    });
    image_url = response.data.data[0].url;
  
    console.log('image_url:',image_url)
    return image_url
  
  },


}


module.exports = { ai }







