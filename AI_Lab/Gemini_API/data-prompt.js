const { getPromptString } = require('./prompt.js')
const process = require('process');
const argument = process.argv[2];
const dotenv = require('dotenv');

dotenv.config();

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

if (!argument) {
  console.log('\n\n No input entered, default will be "sun".\n\n ')
}
const input = argument || "sun"

const promptString = getPromptString(input)

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

async function run() {
  const chatSession = model.startChat({
    generationConfig,
 // safetySettings: Adjust safety settings
 // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [
    ],
  });

  const result = await chatSession.sendMessage(promptString);
  console.log(result.response.text());
}

run();