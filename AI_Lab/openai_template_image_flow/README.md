---- to do ✅ 🟡 ----

- ✅ rename index and review all files for naiming
- 🟡 use both object and description input as values for requests. should remove `_config`
  - 🟡 Ok, just need to remove notes, test again.
- ✅ Finish Example user flow below in this readme
- delect these notes from readme. 

---- to do ----
# 🏗️ Development 🏗️

##### Setting Up & Adding Dependancies:

- `cd server`
- `npm install` 

##### Running the Back End Locally:

- `cd server`
- `npm start`, Or: `npm run dev` for hot reload.

##### Running the Front End Locally:

- `cd client`
- Open `index.html`
- If you're using VS Code you can install "Live Server" extention and click "Go Live" on the bottom nav bar in VS Code to hot reload your front end. 

NOTE: the default API url is `http://localhost:8080/`. If you'd like to use the production API url, add `#prod` to your **client** url. 

- For example: `http://127.0.0.1:5500/#prod`

# Example User Flow...
- Choose a theme (e.g., Gopher, House, Monster, etc.).
- Click on [Create Object].
  - This action generates a prompt using the selected theme to produce a JSON object, which is then displayed in the first text area.
- Next, simply click on [Create Object Describe]. This will craft a language description based on the data from the JSON object.
- Lastly, click on [Create Image from Description] to visualize the description as an image!

Note: You can also skip the first two steps and directly input your own image descriptions in the second text area for image generation.

# Resources
- https://platform.openai.com/docs/guides/images/usage

