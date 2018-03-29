authenticateIdentityPool = (callback)=>{
  if (cognitoUser != null) { //Check if a user is already signed in
    cognitoUser.getSession(function(err, result) {
      if (result) {
        AWS.config.region = 'us-west-2'
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: identityPoolId,
          Logins: {
              ['cognito-idp.'+region+'.amazonaws.com/'+poolData.UserPoolId]: result.getIdToken().getJwtToken()
          },
          RoleArn: roleArn
        })
      }
    })
    AWS.config.credentials.refresh((error) => {
      if (error) {
        console.error('error: ', error)
        authenticateIdentityPool()
      } else {
        console.log('\n\nRole arn grants access to AWS table: '+table1)
        if (callback) callback()
      }
    })
    user.innerHTML = 'You are now logged in as: '+ cognitoUser.username
    loggedIn.style.display = ''; noLogIn.style.display = 'none'
    getUserAttributes()
  }
}

signUp_User_To_Pool = ()=>{
  const dataEmail = { Name : 'email', Value : email.value }
  const attributeEmail = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail)
  attributeList.push(attributeEmail)
  userPool.signUp(userNameUp.value, passwordUp.value, attributeList, null, function(err, result){
    if (err) { textArea.innerHTML = err; return }
    cognitoUser = result.user
    textArea.innerHTML = 'SUCCESS! \nUsername is: ' + cognitoUser.getUsername() + '\nEmail is: ' + dataEmail.Value + '\nCheck your email to conferm sign up. \n\n  -> Enter Code and press [ Confirm ] to complete'
    confirmBox.style.display = ''; noLogIn.style.display = 'none'
  })
  email.value = ''; userNameUp.value = ''; passwordUp.value = ''
}

confirm_User = ()=>{
  cognitoUser.confirmRegistration(verification.value, true, function(err, result) {
    if (err) { textArea.innerHTML = err; return }
    confirmBox.style.display = 'none';
    noLogIn.style.display = ''
    textArea.innerHTML = 'You can now logged in as: '+cognitoUser.username
    logOut_User()
  })
}

signIn_User = ()=>{
  const authenticationData = { Username : userNameIn.value, Password : passwordIn.value, }
  userData.Username = userNameIn.value
  const authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData)
  console.log('userData: ',userData)
  cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function (result) {
      check_user_status()
    },
    onFailure: function(err) {
      textArea.innerHTML = err
      if (err = 'Error: User is not confirmed.') {
        textArea.innerHTML = 'You are successfully signed up. However you still need to get your confirmation code from your email and -> Enter Code and press [ Confirm ] to complete'
        confirmBox.style.display = ''; noLogIn.style.display = 'none'
      }
    },
    mfaRequired: function(codeDeliveryDetails) {
      var verificationCode = prompt('Please input verification code' ,'')
      cognitoUser.sendMFACode(verificationCode, this)
    }
  })
  userNameIn.value = ''; passwordIn.value = ''
}

logOut_User = ()=>{ // signs out for current device
  AWS.config.credentials.clearCachedId()
  cognitoUser.signOut()
  textArea.innerHTML = cognitoUser.username+' - Succesfully logged out.'
  loggedIn.style.display = 'none'; noLogIn.style.display = ''; user.innerHTML = ''
}

logOutAll_Pools_And_Devices = ()=>{ // signs out of ALL devices!
  AWS.config.credentials.clearCachedId()
  cognitoUser.globalSignOut({
    onSuccess: function (result) {
      textArea.innerHTML = 'Succesfully log out of ALL devices.'
      loggedIn.style.display = 'none'; noLogIn.style.display = ''; user.innerHTML = ''
    },
    onFailure: function(err) { console.log(err) },
  })
}

forgot_User = ()=>{
  userData.Username = forgotEmail.value
  cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData)
  cognitoUser.forgotPassword({
    onSuccess: function (result) {
      console.log('call result: ' + result)
      textArea.innerHTML = 'SUCCESS!'
    },
    onFailure: function(err) { console.log(err) },
    inputVerificationCode() {
      const verificationCode = prompt('Please input verification code ' ,'')
      const newPassword = prompt('Enter new password ' ,'')
      cognitoUser.confirmPassword(verificationCode, newPassword, this)
    }
  })
}

getUserAttributes = (callback)=>{
  cognitoUser.getUserAttributes(function(err, attributes) {
    if (err) { console.log(err); return }
    else {
      cognitoUser.attributes = attributes
      textArea.innerHTML = "*** Succesfully logged into Cognito User Pool ***\n"
      + "User: " + cognitoUser.username + "\n"
      + JSON.stringify(attributes, null, 2)
      // + '\n\n --- \n\n' + JSON.stringify(cognitoUser, null, 2)
      console.log('\ncognitoUser: ', cognitoUser)
      if (callback) callback()
    }
  })
}

updateAttributes = ()=>{
  var attributeList = []
  var attribute = {
    Name : 'custom:favoriteColor',
    Value : 'cornflowerblue'
  }
  var attribute = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(attribute)
  attributeList.push(attribute)
  cognitoUser.updateAttributes(attributeList, function(err, result) {
    if (err) { alert(err); return }
    getUserAttributes()
  })
}
