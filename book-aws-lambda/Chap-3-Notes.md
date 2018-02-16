# Chapter 3: Your Function as a web API
### Note the lambda Function used for this example
This is a different than the Chap-1-2-Notes uses. Link > https://github.com/danilop/AWS_Lambda_in_Action/blob/master/Chapter02/customGreetingsOnDemand.js
NOT the randomXY function.

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
- left "Use Lambda Proxy integration" empty (...book did not show option)
- Set region to match (mine is us-east-1)
- for **Lambda Fucntion** looks like typing will auto fill your already made functions. so select "greetingOnDemand"
- Kept **Use Default Timeout** CHECKED (...book did not show option)
- Click > [SAVE]
  - give [OK] on permission.

Method Request
- you should be looking at the execution flow. select [Method Request]
- Now expand the {URL Query String Parameters}, and click + "add a query string"
  - now this is the 'key' so to speak of the OBJ.
  - click the check mark and see it added to a table, you'll see a few other columns now.
- After added, go back by selecting [<- Method Execution] at the top.

Integration Request
- Select the [Integration Requests Box] and keep toggles default.
- Expand {Body Mapping Templates}
  - Toggle (.) "When there are no Templates Defined."
  - Select + "Add mapping template"
  - in the field YOU HAVE TO WRITE IT > "application/json" ... even tho it's already there as the suggested value.
  - Select the Check mark to add.
    - Keep generate template empty fo now...
    - write {"name":"$input.params('name')"}
    - Click [Save]
- After added, go back by selecting [<- Method Execution] at the top.

...Testing the integration...
- Now click that "test" with the lightening bolt icon in the 'client' section.
- So now just enter a name, or anthing rather, and you'll see your lamdba function fire to the right!

Integration Response
- Select [Integration Response]
- expand the '-' 200 response (only one provided)
- Expand {Body Mapping Templates}
  - Select "application/json" (It's already writin in this configuration)
  - leave Generate Template blank again.
  - add to code field > { "greetings": "$input.path('$')" }
  - Save and go back to Testing

... Test: if we enter "Tom" for name we'll get our friendly json format!
```json
{
  "greetings": "Hello Tom!"
}
```

Now lets find-tune the edge case where if no name is selected we get `"Hello !"`

Go back to the [Integration Request] section and in the code field change it to...
```
#set ($name = $input.params('name'))
{
#if ($name != "")
"name": "$name"
#end
}
```
- ok so test with "" and a name and it should catch empty and say "Hello World!"

# Now, Let's deploy this Sucka!

In the {Actions} dropdown select **Deplay API**
- in **Deployment stage** select [New Stage]
  - lets call it "prod"
  - and in **Stage description** lets call it "Production"
  - for **Deployment descripts** we'll say "First Depoloyment"
- Ok... click > [Deploy]

Now look in the left panel for the 'prod' dropdown directory. Click it and you'll expand to see your get request. click that.

*NOTE: if you lose your spot, you'll find this info under "Stages of the "My Utilities API you've created*

Here's the API with no query > https://8jvcewuzyc.execute-api.us-east-1.amazonaws.com/prod/greetings

And here it is with my Name > https://8jvcewuzyc.execute-api.us-east-1.amazonaws.com/prod/greetings?name=Bob
