# Building Basic Lambda + dynamoDB + S3

This tutorial follows the `basic-Lambda-DDB.md` tutorial, and adds information from a `colors.json` file in the AWS S3 Bucket `color-dots`.

For this tutorial, we're goint to start with running our code on our desktop with terminal, then move the code to AWS.
- NOTE: you could just write it directly into the code area in AWS, but it's good to get use to doing it both ways. Sometimes its easier to develop from your desktop first, especially when there's more things to do as writing code in the AWS Lambda console editor is a bit more of a pain and harder to read.

---
### Create a node.js file and read the colors.json file.

Make folder/file/npm
- $`cd desktop`
- $`mkdir colors && cd colors`
- $`touch colors.js`
- $`npm init`
- $`npm install aws-sdk`

add Code to colors.js

```javascript
var AWS = require('aws-sdk');
var s3 = new AWS.S3();

var params = {
 Bucket: "color-dots",
 Key: "colors.json"
};
s3.getObject(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else {
    let colors = JSON.parse(data.Body.toString())
    colors.map( x => {
      console.log(x.name)
    })
  }
});
```

Now run the node file $`node colors.js`
- You should now see in your terminal the names of all the colors and the emoji within the object, just edit to log x or colors and you'll see the entire json.

---
### Create DynamoDB table and move json data in.

You can create your dynamoDB throught the AWS console, or with terminal. Here are the directions to do it with terminal.
- the snippit below is set as defaul values, which you can change.
- the table will be named colors, edit it before you run the command as you like.

$`aws dynamodb create-table \
    --table-name basicLambdaS3 \
    --attribute-definitions \
      AttributeName=name,AttributeType=S \
    --key-schema AttributeName=name,KeyType=HASH \
    --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1`

- Go to AWS and you should find your table in the DynamoDB Tables sections.

Now, let's add some data from our **S3** `colors.json` file to our **DyanmoDB**
- Important: `AWS.config.update({region: "us-east-1"})`
- Now run the node file $`node colors.js`
- The code below will get ALL the images like before but only **append** the 0th index.

```javascript
const AWS = require('aws-sdk')
AWS.config.update({region: "us-east-1"})
const s3 = new AWS.S3()
const dynamodbDoc = new AWS.DynamoDB.DocumentClient()

const bucketParams = {
  Bucket: "color-dots",
  Key: "colors.json"
}

s3.getObject(bucketParams, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else {
    const colors = JSON.parse(data.Body.toString())
    const updateData = colors[0] // colors[34]
    console.log(updateData)
    const arrayKey = 'data'
    dynamodbDoc.update({
      TableName: 'basicLamdbaS3',
      Key: { name: 'myColors' },
      ReturnValues: 'ALL_NEW',
      UpdateExpression: 'set #'+arrayKey+' = list_append(if_not_exists(#'+arrayKey+', :empty_list), :'+arrayKey+')',
      ExpressionAttributeNames: {
        ['#'+arrayKey]: arrayKey
      },
      ExpressionAttributeValues: {
        [':'+arrayKey]: [updateData],
        ':empty_list': []
      }
    }, function(err, data) {
        if (err) console.log(err, err.stack)
        else console.log(' ! updateItem successful !')
    });
  }
});

```

- change the index to add more colors! `const updateData = colors[34]`

### Add code to lambda

Now, we could zip our project before uploading it to lambda. This command zips the folder colors from the 1st level inside.
- $`zip -9 -r ../colors.zip *`

HOWEVER, we're going to copy and paste because we still need to edit some things.

Lambda > `[Create function]` > Name:`...whatever` (basic-DDB-S3) > Runtime: `Node.js`
- Role: "Choose an existing role" `[dropdown]`
- Existing role: `lamdba_basic_execution`
- `[Create Function]`

Lambda > in text editor
- In [Execution role] > "Choose an existing role" `[dropdown]` > `Create Custom role`
- IAM Role: `[dropdown]` > `Create a new IAM Role`
- Name: similar to func name is usually what i do and add `-Role`
- click `Edit` to add this code to role object.
- Append as ADDITIONAL Index to "Statement Array"
  - Add: Your **(ARN)** from **your** table (basicLambda)
  - This code is set for allowing **all** db operations. However, you can specify like this: `dynamodb:PutItem`
- REMEMBER to paste ARNs !!! AND! keep `/*` at the of bucket
  - ddb is full past string.

```json
    ,
    {
      "Effect": "Allow",
      "Action": [
          "s3:GetObject"
      ],
      "Resource": [
          "<YOUR BUCKET (ARN) HERE!!!!>/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "dynamodb:*"
      ],
      "Resource": [
        "<!*!*! Amazon Resource Name (ARN) !*!*!>"
      ]
    }
```
- `[Allow]`

Add your code. This code will need to look a bit different. See the actual function in the example **basic-DDB-S3**
- mainly we need to add the `exports.handler = (event, context, callback) => {
`
----
### NOTES! Use this to add elements arrays within alrady create item...
```javascript
const dynamodbDoc = new AWS.DynamoDB.DocumentClient()

dynamodbDoc.update({
  TableName: 'colors-bot',
  Key: { name: 'all' },
  ReturnValues: 'ALL_NEW',
  UpdateExpression: 'set #'+arrayKey+' = list_append(if_not_exists(#'+arrayKey+', :empty_list), :'+arrayKey+')',
  ExpressionAttributeNames: {
    ['#'+arrayKey]: arrayKey
  },
  ExpressionAttributeValues: {
    [':'+arrayKey]: [updateData],
    ':empty_list': []
  }
}, function(err, data) {
    if (err) console.log(err, err.stack)
    else console.log(' ! updateItem successful !')
});
```
