### Building Basic Lambda + dynamoDB

Lambda > `[Create function]` > Name:`...whatever` (basicDB) > Runtime: `Node.js`
- Role: "Choose an existing role" `[dropdown]`
- Existing role: `lamdba_basic_execution`
- `[Create Function]`

dynamoDB >`[Create table]` > Table name:`...whatever` (basicLambda)
- Primary key: `name`
- `[Create]`

Lambda > in text editor
- In [Execution role] > "Choose an existing role" `[dropdown]` > `Create Custom role`
- Append as ADDITIONAL Index to "Statement Array"
  - Add: Your **(ARN)** from **your** table (basicLambda)
  - This code is set for allowing **all** db operations. However, you can specify like this: `dynamodb:PutItem`

```json
    ,
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
- Past below code into **index.js** field for basic **put**, **get**, **delete**
  - Assume this **row** already exists
  - This example uses `AWS.DynamoDB.Convert.marshall()`

```javascript
var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB({region: 'us-east-1'});
var table = 'basicLambda';

exports.handler = (event, context, callback) => {

    // PUT !
    var putParams = {
        TableName: table,
        Item: {
          name: { S: "test2" }, //string
          number: { N: "50" },  //number
          array: { L: [ { S: 'String' }, { N: '234' } ] },
          object: { M: { 'string': { S: 'A String' }, 'number': { N: '567' } } },
          timestamp: { S: (new Date().toJSON()).toString() },
        }
    };
    dynamodb.putItem(putParams, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data);           // successful response
    });

    // GET !
    var getParams = {
        Key: { "name": { S: "test1"}, },
        TableName: table
    };
    dynamodb.getItem(getParams, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data)
    });

};
```

- Use `NoData` to test.
- See code below does the same thing but with marshall, which makes the objects easier to deal with like normal javascript objects...

```javascript
var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB();
var table = 'basicLambda';

exports.handler = (event, context, callback) => {

    // PUT !
    var putParams = {
        TableName: table,
        Item: AWS.DynamoDB.Converter.marshall({
          name: "test3",
          number: 51,
          array: [ 'String', 234, true ],
          object: { string: 'A String', number: 567, bool: true },
          timestamp: (new Date().toJSON()).toString(),
        })
    };
    dynamodb.putItem(putParams, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data);           // successful response
    });

    // GET !
    var getParams = {
        TableName: table,
        Key: AWS.DynamoDB.Converter.marshall( { name: "test1" })
    };
    dynamodb.getItem(getParams, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else {
            console.log('JSON obj: ', AWS.DynamoDB.Converter.unmarshall(data.Item))
        }
    });
};
```
