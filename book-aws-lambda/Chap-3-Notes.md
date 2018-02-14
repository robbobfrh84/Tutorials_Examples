# Chapter 3: Your Function as a web API

Sign onto the AWS Gateway Web console...
- Sign into AWS and click the aws icon.
- Search for api or under 'Networking & Content Delivery' find
**API Gateway**

If it's your first time it try to walk you through a getting started thing.
- ignore that and toggle () New API

Under *API Name:* call it "My Utilities"
Under *Description* Say, "A Set of small utilities"

The book didn't have the *Endpoint Type* Section, So I just selected "Edge optimized".

...and clicked [Create API]

Create resources
- Under the {Actions} Dropdown, click "Create Resource"
- For *Resource Name*, put "Greeting"
- for *Resource Path*, put "greeting". (May autofill)
- ... left the CORS checkbox and "Configure as proxy resource empty"
- on Click [Create Resource]

Create Integration (....Method)
- Click {Actions} dropdown again and select "Create Method"
- Select GET and click the check box.
- for Integration type toggle (.) Lambda Function
- left "Use Lambda Proxy integration" empty
- Set region to match (mine is us-east-1)
