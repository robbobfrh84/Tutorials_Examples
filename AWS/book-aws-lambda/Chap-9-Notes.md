# Chapter 9: Implementing an authentication service.

All AWS Bits Generated and updated by running $`./init.sh` & `/deploy.sh`
- 6 Lambda functions, to implement the required back end interactions
- 6 AIM policies, to create an IAM role for each of the Lambda functions
- 1 DynamoDB table, to store user profiles
- 1 Cognito identity pool, to federate this authentication service
- 2 IAM policies, for the authenticated and unauthenticated roles of the cognito identity pool
- 1 S3 bucket to store the client application, built using HTML and JavaScript files
- 3 IAM trust policies for the authenticated and unauthenticated roles of the Cognito identity pool and for the Lambda functions.

⚠️ If you're going to copy and past this code as a template: see the "Use THIS as Template" Section

⚠️  Bob, do one from scratch. and revise these notes it won't take long and it'll really clean it up nice.

Download project sample code > https://github.com/danilop/AWS_Lambda_in_Action/tree/master/Chapter09

Install jq > http://stedolan.github.io/jq/
- download and install (I had trouble with the download file so I did...)
- Or: $`brew install jq`
  - Also: had an X-code issue > run this $`sudo xcode-select --reset`

Enter Your Data to `config.json` file in SampleAuth Project folder. Must Change...
- "AWS_ACCOUNT_ID": "*'<get on aws my account page>'*"
- "BUCKET": "*<robbobfrh84-sample-auth>*", ⚠️ MUST BE UNIQUE, check @ aws > s3
- "VERIFICATION_PAGE": copy/paste BUCKET name within string
- "RESET_PAGE": copy/paste BUCKET name within string
- "EMAIL_SOURCE": "bobmain49@gmail.com",
  - Putting my email here means it will send verification from MY EMAIL!

Ok, so in Amazon SES > console.aws.amazon.com/ses
- Under  `Email Addresses` > `[Verify a new Email Address]`
- Enter your email and you'll get a Confirmation email > ...confirm it.

Getting started setting up project with AWS
- `cd` into the project folder
- $`./init.sh`
  - This will create all the AWS stuff you need! ya! major time saver!
- $`./deploy.sh`
  - This will update our back-end and front-end code in our project folder.
- got to aws > s3 and find the bucket you dynamically created
  - click the `index.html` file, it the link....

Sign up like you would a normal user.

OK, so at this point I get this error `Cannot find module './lib/cryptoUtils.js`

In `deloy.sh`, under the `#Updating Lambda Functions`
- Removed: `cp -R ../lib $f/`
- Replaced the line `zip -r $f.zip index.js config.json /lib`
  - with `zip -r $f.zip index.js config.json cryptoUtils.js`
- **IMPORTANT** must run $`./deploy.sh` again.

Now, you can find the index.html folder inside the www folder (open it in chrome)
- Do that and **try** to sign in. I wasn't able to get it to work at first...

Problem 1 (not configed):
- I used the same arn from demo, but **REMOVE** that last line from the config.json and it'll auto mattically generate a new unique on for you. HOWEVER, if you've already done this you'll need to **Delete** your ID pool on AWS so it can create a new one, the $`./init.sh` > $`./deploy.sh`

Able to log into ONLY the email i verified in SMS...
- So i had to go `aws` > `support` and fill out a request for unauthenticated email allowence and also to request 50000 emails a day.
  - Took less than 24 hours to confirm.

At this point after doing some refactoring of the code It worked and I was able to jump into chap 10.
