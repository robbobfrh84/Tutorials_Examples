# Step-By-Step Guide to setting up an Lambda API with DDB and S3

Overview
- 1) Create **DDB** table
- 2) Create **lambda** Function
- 3) Add DDB **IAM** read permissions
- 4) Create Cognito **Id Pool**
- 5) Add Lambda **IAM** permission for Cognito
- 6) Create **S3** bucket & add **permissions**

1) `[Create Table]` > DynamoDB (Or, at least copy one's Arn)

2) `[Create function]`
- Name it: (example: whatever-func)
- `Create Custom role`
  - IAM Role > Dropdown: `Create a new IAM Role`
  - Role should have the default log access, keep as is, we'll add more later...
  - Name it: (example: whatever-func-role)
- Paste this code....
```JavaScript
var AWS = require('aws-sdk')
var dynamodb = new AWS.DynamoDB()

exports.handler = (event, context, callback) => {

  const getParams = {
    TableName: "<your table name>",
    Key: AWS.DynamoDB.Converter.marshall( { name: '<your item name>' } )
  };

  dynamodb.getItem(getParams, function(err, data) {
    if (err) console.log(err, err.stack)
    else {
      callback(null, AWS.DynamoDB.Converter.unmarshall(data.Item));
    }
  })

}
```
- Before moving one, find your ARN in the upper right and copy for later...

3) Add DDB read permissions to for **Lambda** Role: `AWS` > `IAM`
- Find the role you created (example: whatever-role)
- Open the role in the table and select `Edit Role`
- Select `x Add additional permissions`
- Service: `DynamoDB`
- Action: toggle `[x]` Read
- Resources: `Add Arn` > past your DDB arn here...
- `[Review Policy]` && `[Save Changes]`

4) Create Cognito Identity Pool > `AWS` > `Cognito`
- `[Manage Federated Identites]` && `[Create New Identity Pool]`
- Name it: (example: whatever)
- Toggle: `[x]` Enable access to unauthenticated identities
- `[Create Pool]`
- find and click the `Edit identity pool` in the upper right corner.
- **Copy** Identity Pool ID

5) Add Lambda permission for **Cognito** UnAuth role: `AWS` > `IAM`
- Find the **Unauth** version on the role created for your ID pool
- Open the role in the table and select `Edit Role`
- Select `x Add additional permissions`
- Service: `Lambda`
- Action: toggle `[x]` All Lambda Actions
- Resources: `Add Arn` > past your lambda ARN you copied earlier here...
- `[Review Policy]` && `[Save Changes]`
- In your .js file on your front end, paste this code....
```JavaScript
AWS.config.region = 'us-east-1'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:5450f169-ebe7-48b5-93a5-5ebc3bd2f729',
});

var lambda = new AWS.Lambda();

_get = (func, table, item)=>{

  const params = {
    table: table,
    item: item
  };

  lambda.invoke({
    FunctionName: func,
    Payload: JSON.stringify(params)
  }, function(err, data) {
    if (err) console.log(err, err.stack);
    else {
      var output = JSON.parse(data.Payload);
      console.log('output', output)
    }
  });
}

_get('<your lambda function name>', '<table name>', '<item name>')
```

6) `[Create bucket]` > Name it: (example: 'whatever-bucket')
- Push through default: `[next]`...
- Drag a drop your media in the bucket, easy-as.
- Now, under `permissions` click `[bucket policy]`
- copy the ARN for step 7 && next.
- Now, paste this statement with YOUR arn.. **Don't forget '/*'**
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "<YOUR ARN>/*"
        }
    ]
}
```
Here's updated code of when i added a bundle of S3 images to return for tobob.earth.

```JavaScript
const AWS = require('aws-sdk')
const fs = require('fs')

exports.handler = (event, context, callback) => {
  const dynamodb = new AWS.DynamoDB()
  const s3 = new AWS.S3( { params: {Bucket: 'tobob.earth-projects-images'} } )
  const table = event.table
  const item = event.item

  function getImages(data) {
    let promiseAll = []

    data.list.map(x=>{
      promiseAll.push(new Promise(function(res, rej) {
        if (x.image !== ' ') {
          const getfile = {
            Bucket: "tobob.earth-projects-images",
            Key: x.image
          }
          s3.getSignedUrl('getObject', getfile, function (err, url) {
            if (err) console.log(err.code, "-", err.message);
            x.image = url
            res(data)
          });
        } else {
          res(data)
        }
      })
    )})  

    Promise.all(promiseAll).then(function(images) {
      console.log('data', data);
      callback(null, data);
    });

  }

  const getParams = {
    TableName: table,
    Key: AWS.DynamoDB.Converter.marshall( { name: item } )
  }

  dynamodb.getItem(getParams, function(err, data) {
    if (err) console.log(err, err.stack)
    else getImages(AWS.DynamoDB.Converter.unmarshall(data.Item))
  })

}
```
