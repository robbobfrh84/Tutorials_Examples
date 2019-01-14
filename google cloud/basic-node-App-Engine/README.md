# NodeJS App Engine Guide

NOTE: This tutorial is done with a MAC, but other OS systems softwares needed are included in the links. Mac Terminal command are similar to "$git bash" for windows.
- Please feel free to make contributions to this file/repo if you'd like to make this guide better for other developers.

final code in action: https://dependable-glow-228521.appspot.com/
- NOTE that I've added a little extra code beyond the basic "hello, World".

### Pre-work:

To complete this walkthrough. You will need a gmail account, as well as activating your developer account at `console.cloud.google.com`. Also, You'll need to sign up for the free trail version to use the Google Cloud Platform. Yes, that means you'll need to put in a debt/credit card😕. Nothing in this tutorial should trigger your account to be charged ("i doubt"). But in case it does google's free trial gives you $300 of free credit for 12 months, in case you do find yourself with some unwanted/unknown traffic!

Install NodeJS and OS appropriate Google Cloud SDK Software
- NodeJS: https://nodejs.org/en/download/
- Google Cloud SDK: https://cloud.google.com/sdk/docs/#install_the_latest_cloud_tools_version_cloudsdk_current_version
  - Unzip file. Put folder in permanent place
    - I put mine in `Documents`
  - In Terminal: $`cd` to folder you unzipped your folder to and run...
  - $`./google-cloud-sdk/install.sh` > double check directory here if not working.
    - Say $`y` to questions and note path info.
  - Then, you'll need to restart Terminal to take effect
  - Test it works by running $`gcloud info`
  - Then, $`cd` back to the folder you saved the unzipped folder before.
  - Now, initiate the SDK to your google profile by running $`./google-cloud-sdk/bin/gcloud init`
  - follow the link to log into your google account.
  - Create a new project or select a project you've already created.
    - NOTE: It may use one of the weird auto-generated names in addition to the name you created for it so select your project in the console.cloud.google.com to find out what it is.
  - Go to "console.cloud.google.com" Select the project you created:
    - Enable Cloud Build: Search "cloud build" and select "enable".
    - Enable Billing: click menu icon (top-left). And select billing.
      - Select enable billing for this project.

Demo code Locally
- If needed, here's clone this code to test with:
  - $`git clone https://github.com/GoogleCloudPlatform/nodejs-docs-samples`
  - $`cd nodejs-docs-samples/appengine/hello-world/standard`
  - $`npm install`
  - $`npm start`
  - visit : "http://localhost:8080"

Deploy:
- $`gcloud app deploy`
  - Continue by selecting 'y' to confirm.
  - may need to also select region
- If successful: try $`gcloud app browse` to open url in chrome.

### The Skinny guide / Summery.
- Create project
- Enable billing for project
- Add cloud build api
- $`gcloud app deploy`

----

INDEX:
- $`gcloud info`
- $`gcloud --help`
- $`gcloud projects list`
- $`gcloud config list` > account and project info
- $`gcloud config set project my-project` > change project
- $`gcloud projects create my-project-name`
- While Deployed:
  - $`gcloud app logs tail -s default` > tracks and logs all activity
  - $`gcloud app browse` > opens your app in chrome

RESOURCES & Citations:
- gcloud docs: https://cloud.google.com/sdk/gcloud/reference/projects/describe
- google's quickstart guide: https://cloud.google.com/nodejs/getting-started/hello-world
