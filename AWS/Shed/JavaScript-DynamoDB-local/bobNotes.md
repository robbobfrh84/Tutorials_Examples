## Setting Up and Running DynamoDBLocal

Very thorough. The basic CRUD events with JavaScript(*front-end*)-DynamoDB are laid out in individual .html files and build on as they go. Easy to condense into a class for project implementation when needed. Queries too!

### In Terminal

- downloaded and directions followed link:  http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html

`cd dynamodb_local_latest.tar`

...then

`java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb`

this should fire up the DynamoDBLocal

Create a new file MovieJavaScript.html

#### Add chrome plugin "ModHeader"
Link:  https://chrome.google.com/webstore/detail/modheader/idgpnmonknjnojddfkpgkljpfnnfcklj/related?hl=en

- This will allow CORS to bypass
- make sure to click the + button to add RESPONSE header (only request is default)
- Name : Access-Control-Allow-Origin, Value: *

*Note: Only run this when developing*

### Step 2: Load Data

*NOTE: each file manipulates the DynamoDB table, going out of order or chaning the flow may break the demonstration. But It completes a full circle, so you'd just have to go to the end and delete to start over if you get lost at what part your on.*

Here we added the MoviesLoadData file as well as downloaded moviedata.json into our project.

Ran that .html and navigated to movieData.json to upload ALL moves to local DynamoDB

Took awhile! like 5-10 to load 'em all!

### Step 3: CRUD

Now, folling along the tutorial you'll add the crud steps as individual .html files, which is nice!

It's more than just CRUD tho, like "ops05" show how to use conditionals.

- Running as this will error due to condition
```JavaScript
ConditionExpression: "size(info.actors) > :num",
```

- Change to this...
```JavaScript
ConditionExpression: "size(info.actors) >= :num",
```

- ... and It'll pass

Also, checkout "ops06" to see deleting and it includes a condition as well.

### Step 3: Query

On "Query02", I think there's a mistake with the text that's provided from a separate tutorial it says it's querying more specific than it is. I could just be missing something, but it also doesn't match what the tutorial in the link says.

this is GREAT!!! Scan is an awesome function i didn't even know was so easy to implement!

### Step 5: Delete the Table

When I wrote this I decided to add the .html file to delete, but didn't execute.
