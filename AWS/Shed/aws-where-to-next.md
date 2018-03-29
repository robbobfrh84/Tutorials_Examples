# AWS: Where to next ?
next steps for things to learn and build on

### On Deck
While we have Demos for all login routes We don't yet have a demo that connects all four major authentication routes Into One App.
- UnAuth + NativeAuth + FB + Google+
- So the next time I come into AWS, I'll have an actual app to build. AND, what we can do is use that for a use-case demo that will be as basic ass posible to fit other future app types AND fill be able to be pluged in ready to go 100% for the current app, whateve it may be.

Using IAM Policy Conditions for Fine-Grained Access Control
- (DynamoDB) ( ROWS and COLUMN access control) http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/specifying-conditions.html

Email list
- how to send an email to all your users in pools?
- how to handle and organize those lists (thinking mine-shaft-gap)

Adding Facebook and Google+ Users to SAME User Pools with UnAuth.
- Is it even possible? Under "App Client Settins" in the user pools nav, it mentions the use of OAuth.

DynamoDB
- test for remove

-------------------------------------------------------------------
#### Questions
Endpoints? how to implement for user flow?
- in the cognitoUser instance     
  - "isGlobalEndpoint": false,

-------------------------------------------------------------------
### Interesting/Check out
When I was going through adding a domain to aws with s3, this refence to logging (like analytics, maybe? ) I jumped out at the time, tho.
- Link: http://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/dynamodb-example-table-read-write-batch.html
