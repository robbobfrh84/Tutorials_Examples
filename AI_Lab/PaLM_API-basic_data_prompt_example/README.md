# Google's PaLM API: A Proof of Concept. 

Alright, it's time to dive into building a small AI app. For this project, I'll be utilizing the PaLM API, which powers Google's Bard's Generative AI API. PaLM stands for "Pretraining with Abstract Language Modeling," and it's a powerful tool that enables the creation of sophisticated AI applications. By harnessing the capabilities of PaLM, we can unlock a world of creative possibilities for our app. Let's get started and explore the potential of this exciting API!

### Prerequists
- To save time, I'm going to assuming you have node and npm already installed and are familiar with that environment in your code editor of choice. Also, note that I was using a MAC OS enviromenting whhen creating this guide. 

### API Setup
- Visit: https://makersuite.google.com/ 
- Click: \[Create an API key\] button > and generate for new project...
  - key: AIzaSyD7T1qI3GXs3QFex_JPpCNL_uZEvnpYums

### Get "Data prompt" Example
- Back to: https://makersuite.google.com/ 
- Click: \[Create\] in the "Data prompt" section.
- For now let's just use the "Analogy factory" example. 
- Click: \[Analogy factory\] in the "Sample prompts" section.
- Click: \[< > Get Code\] and copy the JavaScript code. 
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
- Visit: [My project folder](https://github.com/robbobfrh84/Tutorials_Examples/tree/main/AI_Lab/PaLM_API-basic_data_prompt_example) on github.
- There: you'll see a file called `prompt.js` where I've created. 
- Here: I've seperated the prompt into it's own file where i can work on it without all the noise from the other code. 

Here's what the prompt string looks like,

```
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

input: ${input}
output:
```

### My exapmle app Idea: "Colors of things"
This prompt string I created is essentailly the app. I'm telling the PaLM API, that I've got a bunch of examples for what i want the AI to follow.
- Give a word, and return color(s) associated with that word. That's it! 🤣

### Creating your own Data prompt
- Back in my project folder: See the file `data-prompt`. Here I've made it so we can pass a vaiable to the app to test our code as an argument.
- Example: `node data-prompt.js` > defaults input to be "sun" 
- Example: `node data-prompt.js rose`
You can use `-` to seperate words and be more specific
- Example: `node data-prompt.js salmon`
- Example: `node data-prompt.js salmon-meat`
- Example: `node data-prompt.js salmon-cooked`](README.md)