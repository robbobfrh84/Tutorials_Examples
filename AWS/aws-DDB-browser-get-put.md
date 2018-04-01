# JavaScript Browser with AWS SDK: Get/Put from DynamoDB table

Assuming a Dynamo Table already exists, this Tutorial will walk through the steps needed to get/put data from/to dynamoDB.

Create A Federated Identity
- Sign in to AWS console > find `Cognito` Under "Security, Identity & Compliance"
- Click -> `[Manage Federated Identities]`
- Click -> `[Create new identity pool]`
- Input name
- ! `[X]` Make sure to check 'Enable access to unauthenticated identities'
- Click -> `[Create pool]`
- Click ->`view details` for **Unauthenticated** click ->`View Policy Document`
- Add `"dynamodb:*"` to "Action" and the table's ARN to "Resource"
- Here is where you can fine-tune, for read only if you like.
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "mobileanalytics:PutEvents",
                "cognito-sync:*",
                "dynamodb:*"
            ],
            "Resource": [
                "arn:aws:dynamodb:us-east-1:118070506734:table/twitter-users-followers-history"
            ]
        }
    ]
}
```
- Click -> `[Allow]`


Now that you've created your Federated Identity, let's get the info we need for our JavaScript code.
- Select **Dashboard** and in the upper-right courner of the content find `Edit identity pool`.
- Now, find your **Identity pool ID** and copy it. 👈 !

We also need to go to the `IAM` section of AWS and find our role arn.
- In the **AWS** console > under **Security, Identity & Compliance** > **IAM**
- Select `Roles` on the side-nav.
- No find your role that was automatically created when you created you ID pool.
- It'll start with "Cognito_" then the name of you pool, followed by "____Role"
- Now, find your **Role ARN** and copy it. 👈 !

### Here's the .html code
Here's the sample code that should `console.log(data)` the table item requested.

⚠️  Don't forget to add your info when signaled 👈 !

```html
<!DOCTYPE html>
<script src="https://sdk.amazonaws.com/js/aws-sdk-2.100.0.min.js"></script>
* See Console
<script>

var table = 'usersData' //👈 Your DynamoDB table Name
var creds = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: 'us-east-1:20735513b-ea81-49a3-aa2a-943fe459f57a...', //👈 Your IdentityPoolId
  RoleArn: 'arn:aws:iam::118870206734:role/Cognito_dynamodbPublicReadUnauth_Role', //👈 Your RoleArn
})
AWS.config.update({
    region: 'us-east-1', //👈 Your Region, if different.
    credentials: creds
});

var ddb = new AWS.DynamoDB({ apiVersion: '2012-10-08' })
console.log('ddb :', ddb)

var params = {
    Key: { "name": "allUsers" }, //👈 Your key and your item label for data to get
    TableName: table
};
var documentClient = new AWS.DynamoDB.DocumentClient();

documentClient.get(params, function(err, data) {
  if (err) console.log(err);
  else console.log(data);
});

</script>


</html>

```
