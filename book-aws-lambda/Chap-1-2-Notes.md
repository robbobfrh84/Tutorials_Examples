NOTE: when I say was, it means when I wrote this it's what I was dealing with on the AWS web console at the time (~2/2018-)

# Chapter 1

In this book, we'll be learning the **architectural principals** used in the design of **Event Driven** Applications. (p6)

AWS functions configurations include
- memory (when writing this the min. was 128mb)
- timeout: when function terminates regardless of competion
- role: what it can **do**, on **what** resources using IAM.

# Chapter 2: Build your first function...

- Log into AWS
- Choose region closest to you (I was in Austin, TX. So N. Virginia)
  - called... us-east-1
- Search for or find Lambda
  - It was under [Compute] > [Lambda]

- Click [Create function]

In this book it was a bit different and I had to chose a **Role** before moving forward. seemed in the book you used to not have to do that at first.

NOTE: looks like AWS has changed a lot recently as a lot of the tutorials guides I've used seem to reference things that aren't there/igore things that are.

So, in this case I had to discovered the role selection directions in the book on p30, after the function had been built.

- Under *Name* put whatever name you want bookSaysCamelCase.
  - I did > randomXY
- runtime, Node.js 6.10 was default, used it.
- Under *Role*: choose *Create new role from template(s)* was what it said.
- under *Role Name*: i just do the same name with 'Role' at the end...
  - i did > randomXYRole
- book said leave *Policy template* blanks
- now click [Create Fucntion]
- in the *Function Code* area make sure Edit Code inline is selected.
- here's where you write your code
```
exports.handler = (event, context, callback) => {
    var x = event.Xrange
    var y = event.Yrange
    var xLoc = Math.floor(Math.random() * (x[1] - x[0] + 1) + x[0])
    var yLoc = Math.floor(Math.random() * (y[1] - y[0] + 1) + y[0])
    var response = event.XLabel + ': ' + xLoc + ', ' + event.YLabel + ': ' + yLoc
    callback(null, response);
};
```

- Now *configure test event*
- leave event template as Hello World
- under *Event name* say family, and enter the code ...
```
{
    "XLabel": "Age",
    "Xrange": [16,50],
    "YLabel": "Number of Children",
    "Yrange": [0,12]
}
```

- now click [test] and you should get a response like...

...Response:
"Age: 33, Number of Children: 3"

Request ID:
"0fe7981a-10de-11e8-bc86-49333367c8b3"

Function Logs:
START RequestId: 0fe7981a-10de-11e8-bc86-49333367c8b3 Version: $LATEST
END RequestId: 0fe7981a-10de-11e8-bc86-49333367c8b3
REPORT RequestId: 0fe7981a-10de-11e8-bc86-49333367c8b3	Duration: 0.55 ms	Billed Duration: 100 ms 	Memory Size: 128 MB	Max Memory Used: 19 MB...

#2.5: Executing the function through the Lambda API

Install aws cli on terminal to access your functions directly from your terminal!!!!

- to for installation instructions > https://docs.aws.amazon.com/cli/latest/userguide/cli-install-macos.html

- Install Pythong 3.6 > https://www.python.org/downloads/mac-osx/

- So i went down the PIP insallation path and ran into wall then just bunked back out to...

`brew install awscli`

...and ^^^ that just worked... so ONWARD...

- Now you need to configure your aws api call... So do

`aws configure`

- now, it'll ask for you access key id. to get that follow this link: https://console.aws.amazon.com/iam/home?#/security_credential
- now open access keys and copy [Access Key ID]
- Paste that in your command line after aws configure...
- NOW, it's gonna ask for your secret key,
  - NOTE: copy that key somewhere SAFE!
  - so i had to create a new one and it changed the Access Key ID in the process so i had to go back and enter that again.
  - now for region put your region `us-east-1` (yours may be different)
  - now for format put `json`

- For my code above i ran this command...

`aws lambda invoke --function-name randomXY --payload '{"XLabel":"Month","Xrange":[1,12],"YLabel":"Miles Ran","Yrange":[0,120]}' desktop/myData.json
`

- That should create a file on your desktop with the random results from you func! Ya


























----
