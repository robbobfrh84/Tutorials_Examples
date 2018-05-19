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
  get('some-ddb-table', "primary-name", "some.indes[2].value")
}

get = (table, name, attribute)=>{
  const params = {
    TableName: table,
    Key: { name: name },
    ProjectionExpression: attribute,
  }
  documentClient.get(params, function(err, data) {
    if (err) console.log(err, err.stack)
    else {
      console.log('JSON obj: ', data.Item.blocks)
    }
  })
}

main()
