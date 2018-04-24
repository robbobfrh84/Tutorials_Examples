# Chapter 11: Building a media Sharing Application

Note: the source code from this chapter is in the folder `MediaSharing`.
- Also, this source code use the source code from the `SampleAuth` projects created in Chapters 9 & 10.

After copy/pasting the code from the source code repo...
- $`cd` into project folder
- $`./deplay.sh`

top error `(ResourceNotFound) when calling the UpdateFunctionCode`
- Realized This project dosen't have the init.sh command, so I've decided to build one from scratch!
-
Building the .sh script to initiate all the code for this project.
- create **init.sh**: I got `access denied error`, when running it in terminal $`./init.sh`
  - Run this code to give access to your shell script
    - $`chmod +x nameofShellFile.sh` < now it should work.

... where I left off!
- I opened up the **init.sh** from the SampleAuth Project and started to build out the one for the MediaSharing project side-by-side.

- Just to see if i was doing it right i made a lambda function, but had to give it a role, so i just gave a different one to see if it would work
  - `# --role arn:aws:iam::"$AWS_ACCOUNT_ID":role/basic-DDB-S3-Role \`

- What I NEED TO DO NOW is build out in order ...
  - S3 Bucket
  - DDB Table
  - ? Cognito Id Pool (does this neeed a new one? or just same as SampleAuth?)
    - ok, so in the SampleAuth code it updates config file.... 
