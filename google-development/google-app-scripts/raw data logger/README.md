# Simple google sheets data logger api

Uses simple query request with data to add a new rows with new data

### Skinny Development Journal
- Created new Gsheet.
- Added some raw dummy data.
- Tools > Script Editor... started coding
  - Once I added the SpreadsheetApp, I had to "advance" Authenticate.
- cretaed basic function to test api
  - `function doGet(e) {   return ContentService.createTextOutput("It Works!") }`

### Deploy
- Select the blue "Deploy" icon in the new editor > "New Deployment"
- Select the COG icon, Next to the "deploy type" > "Web App"
- ! important ! Change "Who has Access" to "Anyone".
- Name it and deploy it! hit that link and you should see your simple response "It Works!

### OPTION :
- to return json object:   
  - return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON)

### Example Code Links

Google Sheet: https://docs.google.com/spreadsheets/d/13j68ndHkfj1so3Zh-MGkRmojKplNieIWSk97Y2YXse4/edit#gid=0
Google App Script: https://script.google.com/home/projects/1esQkd4k7U3FLGXcA916G0qonh4kWgtdZUbh-4L4vnDzjPqHHmwSt3160/edit
  - SEE `/code.gs` for a copy of the code. 
