## AMW Node js Tutorial

Online Console directions for setting up a new app are pretty step by step and free of code until this point where we actually unZip the project folder....

Link: http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/nodejs-dynamodb-tutorial.html

The only hangup in ^^^ this tutorial was when i needed to enter a primary key and got confused and didn't realize that this needed to be `email` not something specific.

### In Terminal

- `cd documents` or where you want to store your project files
- `mkdir nodejs-tutorial`
- `cd nodejs-tutorial`

Unzip the file from macs download file location
- `unzip ~/Downloads/eb-node-express-sample-v1.1.zip`

### In .ebextentions/options.config

Change line 3 to
- `NewSignupEmail: bobmain49@gmail.com`

Change line 7 to
- `STARTUP_SIGNUP_TABLE: nodejs-tutorial`

*NOTE: This configures the application to use the nodejs-tutorial table instead of the one created by .ebextensions/create-dynamodb-table.config, and sets the email address that the Amazon SNS topic uses for notifications."*

### In Terminal

Remove .ebextensions/create-dynamodb-table.config.
- `rm .ebextensions/create-dynamodb-table.config`

If you originally set this up before unzipping, the table you created will be removed....


# IMPORTANT!

Create a source bundle from the modified code, must be zipped when uploaded to AWS.

- `zip nodejs-tutorial.zip -r * .[^.]*`

Now, it's ready to "Deploy" / upload/update...

### back to following directions from: http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/nodejs-dynamodb-tutorial.html

Originally, I skimmed over the "Configure Your Environment for High Availability"

Follow 'Clean uP' section to terminate app.

Also, seem to recomend good resources at the end. like terminal commands for developing / updating.
