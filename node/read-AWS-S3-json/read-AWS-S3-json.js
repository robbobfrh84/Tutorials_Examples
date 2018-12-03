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
    const updateData = colors[34]
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
