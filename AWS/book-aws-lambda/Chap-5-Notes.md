# Chapter 5: Using standalone functions
So in this chapter we're going to upload pic and create thumbnails and metadata.
- Pic stored in **S3 Bucket**
- Data stored in **DynamoDB**


### Create and Amazon S3 Bucket
In the AWS console, under **Storage** click **S3**

Click **[ + Create bucket ]**

It's a global name, so choosing a username like naming convention will help you give normal names that don't conflict.
- Like: robbobfrh84pictures

Set your **Region** to the same you've been using so far.

Don't select any setting from an existing bucket... and...

click **[Next]**
- click **[Next]** For "Set Properties"
- click **[Next]** For "Set Permissions"
- finally **[Create Bucket]**

### Create a DynamoDB table
Back to the AWS console, under **Database** check **DynamoDB**

Click **[Create Table]**
- Under **table Name*** call it > "Images"
- Make "name" the Primary Key as a string.
- Use default settings. and..
- click > **[Create]**
*Note: it may take a bit for the table to generate.*

In the right side panel, in under the **Overview** tab, Copy the ARN at the very bottom (...should be).
- This shoule be arn:aws:dynamodb:<your-region>:<your-account-id>:table/<your tablename>


Create Project Folder
- visit https://github.com/danilop/AWS_Lambda_in_Action/blob/master/Chapter05/SubscribeToS3/createThumbnailAndStoreInDB-js/index.js and copy the code.
- Create project folder, I called it > SubscribeToS3
- Create a file in your new folder and call it index.js
- Paste the code from the link above in it.
- in **Terminal** `cd` into the project folder you just created.
- input > `npm init`
- input > `npm install async gm util`
- * Make sure you've got the latest node and npm. I had to upgrade...
- Now, create a zip file from the project folder `zip -9 -r ../createThumbnailAndStoreInDB-v1.0.zip *`

Configuring Permissions
- Log into AWS and the find the **IAM** link under the *Security, Identity & Compliance* section.
- Select **Policies** on the left navbar
- click **[Create Policy]**
... dif. order from book below...(think they've changed the flow on aws since this book)
- Click the JSON tab.
- Copy the json policy object from > https://github.com/danilop/AWS_Lambda_in_Action/blob/master/Chapter05/SubscribeToS3/Policy_CreateThumbnailAndStoreInDB.json, and paste in field.
- Get the name of your S3 bucket and replace it...
```json
"Resource": [
    "arn:aws:s3:::<your-S3-Bucket-Name>/images/*"
]
```
- Use the DynamoDB ARN name you copied before and past it in the json object here...
```json
"Resource": [
    "<ARN>"
]
```
- Name the policy: `createThumbnailAndStoreInDB`

Create Your Role
- In the IAM Console, in the navBar, select **Roles**
- click **[Create Role]**
- Under the **AWS service** section, select **Lamdba**, then **[NEXT:Permissions]**
- find `createThumbnailAndStoreInDB` and click the [X] to the left of it.
- then click **[Next: Review]**
- for the role name: `lambda_createThumbnailAndStoreInDB`
- now click **[Create role]**

Attach 2nd policy for Amazon CloudWatch Logs
- Under **Roles** in the **IAM** service, find your role you just created > `lambda_createThumbnailAndStoreInDB`
- Select it and click **[Attach Policy]**
- search for `AWSLambdaBasicExecutionRole` and check mark the one that has the type *AWS managed*
- Then, click **[Attach Policy]**


NOW, lets create our functions
- Navigate back to the lambda sections of AWS and click **[Create Function]**
- name it: `createThumbnailAndStoreInDB`
- Under **Role*** make sure **Choose an Existing role** is selected.
- Then, under **Existing role***, find `lambda_createThumbnailAndStoreInDB` and select.
- Then click **Create function]**
- under the **Function code** card, and in the Code entry type dropdown, select **Upload a .ZIP file**
- Now find the .zip file you created and uplaod.
- Now loo for a dropdown list in the **Configuration** tab and see under **designer** a list of AWS resources. find **S3** and select it.
  - find your bucket `robbobfrh84pics` in the **Bucket** dropdown
  - For **Event Type** select, **Object Created (All)**
  - for the **Prefix** enter `images/`
  - leave the Suffix Blank.
- !!! **[SAVE]** the function.

Let's test this sucka!
- open terminal and `aws configure` (follow AWS CLI instructions from chap 1-2)
- you'll need to get your aws codes.
- the drag a pic on your desktop (mine is test.png) and run the command...
`aws s3 cp desktop/test.png s3://robbobfrh84pics/images/`
- no open the s3 bucket and you should see your file in there! under the image folder.
- Also, you should see the thumb that was created to be 200x200 px.
- Also, you should go into the database and see the metadata.
- Also, under the **monitoring** tab in the function console, you should see some action in those graphs.

Add some metaData
`aws s3 cp desktop/test4.png s3://robbobfrh84pics/images/ \--metadata '{"author": "Darelle Jones", "title": "Mona pizza", "description": "Nice pie!", "width": "100", "height": "100" }'`
- this should resize the photo to be 100x100 and give more details in the metaData. 
