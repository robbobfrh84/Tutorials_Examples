# Clasp Completed Walkthrough December, 2020
I redid a year(s) old walkthrough of the READMEDevelopment Guide

# Jumping back in?
If you jumping back into this guide to get a refresher of clasp development, and just wanna mess with this code...
- `cd` into this folder.
- $`clasp pull`
- $`clasp run read` > should see "HELLO!"
- See Deployments section in Clasp_Development_Guide

# Raw Step-by-step
NOTE: Just to save space here, I didn't add 100% of the code I ended up using in these steps
Step Symbols:
- '~' means maybe redundant
- '>' select / click
- '{key}' code snippit and key below

Terminal
- $`mkdir clasp_completed_walkthrough` > $`cd clasp_completed_walkthrough`
- ~ $`npm install @google/clasp -g`
- $`clasp login`
- $`clasp create Clasp_completed_walkthrough`
- > webapp
- $`clasp open`
- $`clasp pull`
- Add {A} to code.js
- $`clasp push`
- **{NEW PROJECT}** > **Project name**: "Clasp completed walkthrough"
- **+ ENABLE APIS AND SERVICES** > **Google Sheet API** > **{ENABLE}**
- **Kabab Icon** > **Project Settings** > "Project ID" & "Project Number"
- $`clasp setting projectId <your Project ID>`
- http://console.developers.google.com >
- **OAuth consent screen** > **[x] External** > **{CREATE}**
- App Name: "Clasp completed walkthrough"
- Email: "bobmain49@gmail.com"
- Developer contact information: bobmain49@gmail.com
- **{SAVE And Continue}**
- **ADD OR REMOVE SCOPES** > .../auth/userinfo.email > **{SAVE And Continue}**
- **{SAVE And Continue}** (again)
- **{Publish App}**
- $`clasp open`
- **Resources** > **Cloud Platform project...**
- Add `Project number` > **Change Project** > **{Set Project}** > **{Confirm}**
- $`clasp open --creds`
- **Credentials** > **+ Create credentials** > **OAuth client ID**
- Application Type: "Desktop App" > **{CREATE}** > **{OK}**
- $`clasp login --creds creds.json` > "Advanced"...
- Add {B} to appsscript.json
- $`clasp push` > {Y}
- $`clasp run` > Should log "Ok it works here"
- $`touch createSheets.js`
- Add {C} to createSheets.js
- $`clasp push`
- $`clasp open`
- **Resources** > **Advanced Google services** > **Google Sheets API** > **ON**
- $`clasp pull`
- Add {D} to appsscript.json
- $`clasp push` > **{y}**
- $`clasp login --creds creds.json`
- $`clasp run createSpreadsheet -p '"my new sheet"'`
- $`clasp open`
- **Publish** > **Deploy as web app**
- Who has access to the app: Everyone, even anonymous > **{deploy}** > **{Ok}**
- $`clasp pull`
- $`clasp deployments` > Copy @Head's id.
- $`touch get.js` > Add {E} Code
- $`clasp push` > **{y}**
- $`clasp version 1 redeploy`
- Paste @Head's id: https://script.google.com/macros/s/<@Head's id>/exec?r=23


# {Code} Added
- {A}
```javascript
function myFunction() {
  Logger.log("A log for you")
  return "Ok it works here"
}
```
- {B}
```json
  "executionApi": {
    "access": "ANYONE"
  }
```
- {C}
```javascript
function createSpreadsheet(name) {
  var sheet = Sheets.newSpreadsheet();
  sheet.properties = Sheets.newSpreadsheetProperties();
  sheet.properties.title = name;
  var spreadsheet = Sheets.Spreadsheets.create(sheet);
  return "Created new sheet: "+name
}
```
- {D}
```JSON
  "oauthScopes": [
    "https://www.googleapis.com/auth/spreadsheets"
  ]
```
- {E}
```javascript
function doGet(e) {
  const pie = JSON.stringify({
    pie: Math.PI,
    radius: parseInt(e.parameter.r),
    circumference: (e.parameter.r * Math.PI) * 2
  })
  return ContentService.createTextOutput(pie).setMimeType(ContentService.MimeType.JSON)
}
function testGet(){
  return doGet({parameter:{r:23}}).getContent()
}
```
