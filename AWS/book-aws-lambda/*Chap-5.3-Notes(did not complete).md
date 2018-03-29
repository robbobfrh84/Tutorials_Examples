# Chapter 5.3: Using Binaries with your function
Building off of what we did in Chap 5. Here we're going to integrate some open source software, Face Detection! We'll use OpenCV's Computer Vision resource.

Start by downloading this zip > https://eventdrivenapps.com/downloads/faceDetection-js.zip
- The book also gives a step by step guide to installing this project with Terminal. I Did not cover that here.

Now, I unzipped the folder and put it in a directory you want. It's in this folder under `faceDetection-js`.
- NOTE: if you don't make any changes you can just use the .zip you downloaded when adding to the Lamdba function.

Create A new bucket, I called mine: `robbobfrh84faces` with region: `us-east-1` and pushed through settings to create.
- Now select your newly made bucket and go to **Permissions**
- then click **[Bucket Policy]** and paste this code...
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::<BUCKET-NAME>/*"
    }
  ]
}
```
- don't forget to add your bucket name to ^^^
- click **[save]**

Create a lambda function called `faceDetection`, choose a role form existing templates and named it `faceDetectionRole`.
- for the **Code entry type** upload the `faceDetection-js.zip`
- Under **Basic settings** lets give it 1024MB/1G and 10 sec.
  - There's a little more processing power here.
- click **[save]**

Open Terminal to test
`aws configure`
- Enter your keys
- `aws lambda invoke --function-name faceDetection --payload '{"imageUrl":"http://media-exp2.licdn.com/media/AAEAAQAAAAAAAAl2AAAAJGFhZjVmOWUyLThlYzYtNGFlYS1hMWM4LWQyMmY5NGU3MmEwNQ.jpg"}' output.txt`
