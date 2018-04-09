# Chapter 6: managing identities

This chapter was an overview on Amazon Cognito and Authentication with AWS services. There were no Walk through projects, just overview. So no notes here. Good info in the book though about how Cognito and Authentication handles users and data.

# Chapter 7: Calling functions from a client

Here's where we're start to build our front-end around AWS services: Cogito and Lambda both to get access to the proof of concept Api we built. We're going to be building off of the api we created in chapter 3.
- *See:** Chap7-GreetingsOnDemand folder for code
- Started with this code from github > https://github.com/danilop/AWS_Lambda_in_Action/tree/master/Chapter07/GreetingsOnDemand

Log into AWS > `Cognito` > `[Manage Federated Identities]`
- `[Create new identity pool]`
- "Identity Pool Name: " `greetings`
- Click -> `[X] Enable access to unauthenticated ids`
- `[Create pool]`

When you create an identiy pool the wizard from the web console creates two IAM roles. One for Authenticated and one for Unauthenticated users. After selecting `[Allow]`, you should get popped out on the dashbord for the pool you've just created.
- for the **Platfrom** select `JavaScript`
- check it out! there's the code you need for you JavaScript client browser code!
- Copy that and replace it in your `greetins.js` code file of your project you started out with.

Now go to > `AWS` > `IAM` and find your `greetings` role that was automatically created when you created your user pool.
- Select `Roles` on the left nav. and can search "greetings" to see both.
- Select `Cognito_greetingsUnauth_Role`
- Open the `policy`, `Edit Policy` the  and select `JSON`
- Copy the .json from your project file and past the **Entire** code over the code already there. You actually are adding to it, everything you're pasting is the same it's just easier to select all and paste than jiggle it in.

OK, now you need to open a new tab and `AWS` > `Lambda` and find and open your greetingsOnDemand function.
- In the upper left corner find the **Arn**, copy it and past it over the line of code ~20 in your `IAM` policy editor on the other tab you left open.
- Click -> `[Review Policy]`
- Click -> `[Save Changes]`

NOW... you should be able to just open your index.html file, enter a name and see your api in action ... in... the... browser...!!!

So, in my code base I added the simple greet input box to complete the P.O.C! phun, can you ???
