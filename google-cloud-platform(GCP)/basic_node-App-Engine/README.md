🔔 Updated Instruction via Substack Post: https://substack.com/home/post/p-149814640?source=queue&autoPlay=false

# Node.js App Engine with Google CLI: Getting Started Guide - 2023

**NOTE:** This tutorial is demonstrated on a Mac OS, but the required software for other operating systems is included in the provided links. For Windows, Mac Terminal commands are similar to "$git bash."

Also, I'm going to assume you have Node.js and npm already installed and are familiar with that environment, along with having a code editor of choice.

Please feel free to use my source code for this example as your app as well.

- Open Source Repository: https://github.com/robbobfrh84/Tutorials_Examples - [Project folder](https://github.com/robbobfrh84/Tutorials_Examples/tree/main/google-cloud-platform(GCP)/basic_node-App-Engine)
- Also, if you find an error/typo/enhancement please feel free to contribute as well 😊!
- Final code in action: https://dependable-glow-228521.appspot.com/

### Pre-work:

To complete this walkthrough, you will need a Gmail account and activate your developer account 

- https://console.cloud.google.com. 

Additionally, you'll need to sign up for the free trial version to use the Google Cloud Platform. Yes, this means you'll need to provide a debit/credit card 😕. However, nothing in this tutorial should trigger charges to your account beyond the free tier ("I doubt it"). Nevertheless, please be aware and remember to turn things off when you're not using them.

### Install Google Cloud SDK Software

To install the Google Cloud SDK software, follow these steps:

1. Download the Google Cloud SDK from the official website: https://cloud.google.com/sdk/docs/install-sdk
   - Scroll down to find the appropriate .zip file for your operating system and download it.
2. Unzip the downloaded file and place the extracted folder in a permanent location on your system. For example, I will place it in my root directory `./`.
   - If you choose a different location, please note that you will need to modify all commands that include the file path (`~/google-cloud-sdk/bin/gcloud`).
   - Additionally, be aware that some directions from other sources or within the command responses may abbreviate the path to `gcloud`, which may or may not work for you. If not, replace `cloud` with your chosen path. For this example, I will stick to the provided path.
3. Run the installation script:
   - Open "Terminal" and navigate to the folder where you moved the extracted Google Cloud SDK folder. If you placed it in the root directory, a new terminal window will open at that location automatically.
   - Now execute this command: `./google-cloud-sdk/install.sh`
   - When prompted, type `y` and press `Enter` to answer any questions during the installation process.

### Log into your Google account via the command line.

1. Execute: `~/google-cloud-sdk/bin/gcloud auth login`
   - This will prompt a browser tab to open for you to log in to your Google account.
2. Choose: "Allow"

### Initialize Google Cloud SDK in your local project's folder

1. Navigate (`cd`) to the folder where you want your project code to reside.
   - This can be an existing project or an empty folder.
   - Alternatively, you can use an open-source project from the folder mentioned above.
2. Initialize the SDK for your project with your Google profile by executing the following command:
   - `~/google-cloud-sdk/bin/gcloud init`
   - When prompted to "Pick configuration to use," select: [1].
   - Choose your logged-in account by selecting: [1].
   - Select "Create a new project" by choosing the corresponding number.
   - Provide a name for your project (this is what you'll see on Google's console website).

Now, your local project's folder is set up with the Google Cloud SDK, and you are ready to start working on your project using Google Cloud services.

### Create and Configure Project

- Visit: [https://console.cloud.google.com](https://console.cloud.google.com/)
- Click on the project dropdown tab to open the "Select a project" menu.
- Select your project.
  - 👀 Note: You may need to select the "ALL" tab to find it.
- Your project page will display various options and features you can use. Locate and click on [Billing].
- Click on [LINK A BILLING ACCOUNT] and select your billing account.
- Enable Cloud Build: Search for "Cloud Build API," select it, and click on "Enable."
- Open a terminal or command prompt and run the following command to create a new file named `app.yaml`:
  -  `touch app.yaml`

-  Paste the following code into the `app.yaml` file:
```
runtime: nodejs
env: flex
runtime_config:
  operating_system: ubuntu22
# This sample incurs costs to run on the App Engine flexible environment.
# The settings below are to reduce costs during testing and are not appropriate
# for production use. For more information, see:
# https://cloud.google.com/appengine/docs/flexible/nodejs/configuring-your-app-with-app-yaml
manual_scaling:
  instances: 1
resources:
  cpu: 1
  memory_gb: 0.5
  disk_size_gb: 10
```

- ### Deploy your app 🌎!

  - Run the command `~/google-cloud-sdk/bin/gcloud app deploy`.
    - Select your region: I chose `us-west1` (first time only).
  - 🟢🔗See your LIVE app: Run `~/google-cloud-sdk/bin/gcloud app browse`.
  - 🥸Watch Logs: Run `~/google-cloud-sdk/bin/gcloud app logs tail -s default`.

----

### RESOURCES:

- gcloud docs: https://cloud.google.com/sdk/gcloud/reference/projects/describe
- google's quickstart guide: https://cloud.google.com/nodejs/getting-started/hello-world







