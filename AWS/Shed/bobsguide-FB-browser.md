# Facebook
Read/Write access & user info store


Started code base with this: https://developers.facebook.com/docs/facebook-login/web
- It also shows how to get your FB app ID
Then jumped into this (which is meant to follow for the aws docs): http://docs.aws.amazon.com/cognito/latest/developerguide/facebook.html

Create new Identity pool
- Give it a name
- Open "Authenticated Providers"
- Click the "Facebook" tab
- Copy & past your appID into the field.
- Click [Create Pool]
- Show details will see your Auth & UnAuth Role.
- Click ->[Allow] * or whatever accept button mose you on.

Navigate to your new Identiy Pool
- In dashboard, click the Edit Identiy pool link in the far upper right corner.
- copy the Identiy pool Id and added it where it referenced in this code...

```javascript
FB.login(function (response) {
  // Check if the user logged in successfully.
  if (response.authResponse) {
    console.log('You are now logged in.');
    // Add the Facebook access token to the Cognito credentials login map.
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'IDENTITY_POOL_ID',
      Logins: {
        'graph.facebook.com': response.authResponse.accessToken
      }
    });
    // Obtain AWS credentials
    AWS.config.credentials.get(function(){
        // Access AWS resources here.
    });
  } else {
    console.log('There was a problem logging you in.');
  }
});
```
- pasted below this in .html file, within the window.fbAsyncInit function.

```JavaScript
FB.getLoginStatus((response)=>{
  statusChangeCallback(response)
})
```
! - Make sure to set the region.

ALSO. you change your role arn to allow for dynamoDB if you've added that!
- your table
- And the "dynamodb:* " for read/write access











Roles
- **Cognito_FBSignInAuth_Role**
- **Cognito_FBSignInUnauth_Role**

Identity Pools
- **FBSignIn
