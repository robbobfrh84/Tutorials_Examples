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

main = ()=>{
  newItem = {
    name: 'users',
    allUsers: {}
  }
  put('pixel-D-demo', newItem) // table name, primary row name.
}

put = (table, newItem)=>{
  const params = {
    TableName: table,
    Item: newItem,
  }
  documentClient.put(params, function(err, data) {
    if (err) console.log(err, err.stack)
    else console.log('! Success creating new Item !', data)
  })
}

main()
