/* NodeJS */
var AWS = require('aws-sdk');
AWS.config.update({region: "us-east-1"})
var documentClient = new AWS.DynamoDB.DocumentClient();

/* browser JavaScript */
// var ddbTable = 'pixel-D-demo'
// var ddbRegion = 'us-east-1'
// var ddbCreds = new AWS.CognitoIdentityCredentials({
//   IdentityPoolId: '...',
//   RoleArn: '...',
// })
// AWS.config.update({
//     region: ddbRegion,
//     credentials: ddbCreds
// });
// var documentClient = new AWS.DynamoDB.DocumentClient();

get = (table, name, attribute)=>{
  const params = {
    TableName: table,
    Key: { name: name },
    ProjectionExpression: attribute,
  };
  documentClient.get(params, function(err, data) {
    if (err) console.log(err, err.stack)
    else changeData(data.Item.blocks[0].blk) // ⚠️ Note: the index of "0" will always be zero for specific indexes within array, it'll just return an index with ONLY the one you requested, regarless of what index it was to start.
  })
}

put = (table, name, attribute, value)=>{
  const params = {
      TableName: table,
      Key: { name: name },
      UpdateExpression: "set "+attribute+" = :b",
      ExpressionAttributeValues:{ ":b": value },
      ReturnValues:"UPDATED_NEW"
  };
  documentClient.update(params, function(err, data) {
    if (err) console.log(err, err.stack)
    else console.log(' ! Update successful !', data)
  })
}

changeData = (data)=>{
  data = 'newData'
  put('some-ddb-table', "primary-name", "some.indes[2].value", data)
}

get('some-ddb-table', "primary-name", "some.indes[2].value")
// This example goes through and changes attributes of a DDB item,
// ... by specifiying the index WITHIN an attribute.
// Then, It "updates" that value in the specific place as well.
