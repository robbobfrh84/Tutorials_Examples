# Google's PaLM API: A Proof of Concept. 

The PaLM API is What Bard is built on. As well as several other google AI applications...

### Prerequists
- To save time, I'm going to assuming you have node and npm already installed and are familiar with that environment in your code editor of choice. Also, note that I was using a MAC OS enviromenting whhen creating this guide. 

### API Setup
- Visit: https://makersuite.google.com/ 
- Click: [Create an API key] button > and generate for new project...
  - key: AIzaSyD7T1qI3GXs3QFex_JPpCNL_uZEvnpYums

### Get "Data prompt" Example
- Back to: https://makersuite.google.com/ 
- Click: [Create] in the "Data prompt" section.
- For now let's just use the "Analogy factory" example. 
- Click: [Analogy factory] in the "Sample prompts" section.
- Click: [< > Get Code] and copy the JavaScript code. 
- Create: A project folder and  `data-prompt.js` file in that folder.
- Paste: Code you copied. 

✨SIDE NOTE: the data prompt is interesting, because you sorta train the model. In the sample prompts section. Find the external "link" button to see a bunch of interesting examples. 

### Setting project up and running it. 
- Find and replace: The line `const API_KEY = "YOUR API KEY";` with your API key.
- `cd`: into your project folder and run `npm install`.
- Run `npm i @google-ai/generativelanguage`
  - reference: https://www.npmjs.com/package/@google-ai/generativelanguage
- You should now be able to run `node data-prompt.js` in your projects root folder and see an output response!

### My source code for this project
- Visit: 
- There: you'll see a file called `prompt.js` where I've created. 

### Creating your own Data prompt
At first I was kinda confused at what this was, but ralized you can sort of give example to "focus" the model to give certain output prompts. 
- So in the example here, I've created my own input of "things" and the output should be the color(s) of that thing....
  - Example: `node data-prompt.js` > defaults input to be "sun" 
  - Example: `node data-prompt.js rose`
  You can use `-` to seperate words and be more specific
  - Example: `node data-prompt.js salmon`
  - Example: `node data-prompt.js salmon-meat`
  - Example: `node data-prompt.js salmon-cooked`