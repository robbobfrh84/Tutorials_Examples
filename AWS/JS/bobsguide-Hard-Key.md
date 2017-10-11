# DynamoDB: Native Auth, Read/Write access & user info store

### Setting your region
Use us-west-1 for must stuff, but...
us-west-2 for some services that are only hosted there.
... (skimmed)

### Getting Your Credentials
Steps asumed I had already created a user (I hadn't)
- Just did a basic creation and followed the steps directions to get the .csv file with my...
- ... access key ID and Secret access key (put file in the directory)

### Setting Credentials
Hard Coding AccessKey & Secret Key...
- "They" say....
  - Limit credentials to what's only being used
  - Read only if it is read only
  - and avoid hard-coding into scripts.> GITHUB!
- To get hard Coded keys,
  - Sign In -> click [User Name] -> click [Access Security Credentials] -> click [continue to Security Crenetials] * Might not show if you've clicked [ ] Don't show message again.
  - click [Access keys (access key ID and Secret access key)]
  - click [Create Key] -> click [Dowload key file]
  - * if you click Create New Access Key after, you'll get a new one and old won't work.
- for browser...
  - ```JavaScript
    AWS.config.update({
      region: "us-west-2",
      accessKeyId: "PASTE_ID_KEY_HERE",
      secretAccessKey: "PASTE_SECRET_KEY_HERE"
    })
    ```
- for Node (paste in config.json file)

### Setting Credentials in a Web Broswer
Using Amazon Cognito Identity
- created a user pool @: https://us-west-2.console.aws.amazon.com/cognito/users?region=us-west-2#/pool/us-west-2_bHxHcL26Z/details?_k=4f5blb
- ...
