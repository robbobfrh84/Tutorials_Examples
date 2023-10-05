import { Configuration, OpenAIApi } from "openai";
const { newObject, updateObjectField } = require("./prompt_object")

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const promptType = req.body.promptType || '';
  if (promptType.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid animal",
      }
    });
    return;
  }

  try {
    let prompt;
    if (promptType === "createObject") {
      prompt = newObject();
    } else if (promptType === "updateField") {
      prompt = updateObjectField("bob");
    }
    const completion = await openai.createCompletion(prompt);
    // console.log('completion:',JSON.parse(completion.data.choices))
    res.status(200).json({ result: completion.data.choices[0].text });

  } catch(error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}
