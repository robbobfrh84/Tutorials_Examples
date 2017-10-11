# AWS SDK for javascript (Amazon Web Services)
- Getting Started in Browser
- Amazon's S3 buckets: Facebook login & upload files.
- * DynamoDB: HARD KEY in Browswer: Creating + CRUD + query operations for tables
- * DynamoDB: UnAuth read/write access to tables
- * DynamoDB: FB & google+, Read/Write access & user info store
- * DynamoDB: Native Auth, Read/Write access & user info store
* Has own readme file.

#### Names of AWS services used
*Federated Identity Pools*
- **SignUpPool** (NativeAuth)
- **FBSignIn** (dynamoDB-FB-browser)

Introduction link that I used and referenced: http://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/welcome.html

### Getting Started for AWS SDK
Guide to setting up in Browser JS code.

##### Setting your region
Use us-west-1 for must stuff, but...
us-west-2 for some services that are only hosted there.
... (skimmed)

##### Getting Your Credentials
Steps asumed I had already created a user (I hadn't)
- Just did a basic creation and followed the steps directions to get the .csv file with my...
- ... access key ID and Secret access key (put file in the directory)

--------------------------------------------------------------------------------
### Amazon's S3 buckets:
Facebook login & upload files
- ... accompished this by following directions from link: http://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/getting-started-browser.html
- see: s3-buckets-with-facebook-auth.html
- This guide uses facebook sign-in.
- did not do getting started with node.js, just broswer
- also! must use http-server -c-1

--------------------------------------------------------------------------------
### Notes

--------------------------------------------------------------------------------
##### Links

Google developers: https://console.developers.google.com/apis/credentials?project=test1-180721

Medium Article about FB and Google+: https://medium.com/aws-activate-startup-blog/dynamic-websites-using-the-aws-sdk-for-javascript-in-the-browser-b3dd90c25b1e

AWS resource that looks like a good review for cognito with unauthenticated and authenticated users: https://aws.amazon.com/blogs/developer/authentication-in-the-browser-with-amazon-cognito-and-public-identity-providers/

DynamoDB docs for ddb methods: http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/api-permissions-reference.html

1.) DynamoDB > Reading and Writing Items in Batch in DynamoDB: http://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/dynamodb-example-table-read-write-batch.html

2.) Using IAM Policy Conditions for Fine-Grained Access Control (DynamoDB) http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/specifying-conditions.html

### Other Helpful Links
aws amazon forum question for Amazon Incognito: https://forums.aws.amazon.com/thread.jspa?threadID=170870
Medium Article/Guide for JS DyanmoDb: https://medium.com/aws-activate-startup-blog/dynamic-websites-using-the-aws-sdk-for-javascript-in-the-browser-b3dd90c25b1e
region endpoints: http://docs.aws.amazon.com/general/latest/gr/rande.html
