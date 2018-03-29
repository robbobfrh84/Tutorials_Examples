start_dynamoDB = (callback, obj = {})=>{
  ddb = new AWS.DynamoDB({ apiVersion: '2012-10-08' })
  for (const a of cognitoUser.attributes) { obj[a.Name] = a.Value }
  if (callback) callback(obj)
}

fetch_dynamoDB_tables = (obj, callback)=>{
  batchGet_dynamoDB({
    RequestItems: {
      [table1]: {
        Keys: [
          {
            'Username': {S: cognitoUser.username },
            'Client_Id': {S: obj.sub},
          },
          {
            'Username': {S: 'ListUsers' },
            'Client_Id': {S: '0'},
          },
        ],
      }
    }
  }, (Userdata)=>{ // callback
    let usersList, userInfo;
    console.log('00000', Userdata.Responses)

    for (const user of Userdata.Responses.SignUpUserList) {
      if (!user.publicUsers) usersList = user.publicUsers
      else {
        userInfo = user
        textArea.innerHTML += '\n\n*** DynamoDB Table: "'+table1+'" user info row ***\n' + JSON.stringify(userInfo, null, 2)
      }
    }
    callback(userInfo, usersList)
  })
}

check_user_to_table = (obj, user)=>{
  console.log('------', user)
  if (!user) { // if user not in table, add 'em.
    put_dynamoDB({
      TableName: table1,
      Item: {
        'Username': {S: cognitoUser.username },
        'Client_Id': {S: obj.sub},
        'Email': {S: obj.email},
        'User_Pool_Id': {S: cognitoUser.pool.userPoolId},
      }
    }, ()=>{ console.log('\n* User Data added to "'+table1+'" table') })
  } else { console.log('\n* User Data already present in table')}

}

check_user_in_ListUsers = (usersList)=>{
  if (!usersList.publicUsers.M[cognitoUser.username]) {
    update_dynamoDB({
      TableName: table1,
      Key: {
        'Username': {S: 'ListUsers' },
        'Client_Id': {S: '0'},
      },
      UpdateExpression: "SET publicUsers."+cognitoUser.username+" = :n",// Add a new String to list
      ExpressionAttributeValues:{
          ":n": {M: { 'username': {S: cognitoUser.username},
                      'sign_up_date': {S: Date()},
                      'groups': {L: []}
                }   },
      },
      ReturnValues:"UPDATED_NEW"
    }, (data)=>{
      textArea.innerHTML += '\n\n'
      + '*** User: "'+cognitoUser.username+'" Added to ListUsers Row ***\n'
      + JSON.stringify(data, null, 2)
    })
  } else {
    console.log('\n* * User already present in userList')
  }
}

update_dynamoDB = (params, callback)=>{
  ddb.updateItem(params, function(err, data) {
    if (err) { console.log(err)
    } else {
      if (callback) callback(data, params)
    }
  });
}

get_dynamoDB = (params, callback)=>{
  ddb.getItem(params, (err, data)=>{
    if (err) { console.log("Error", err)
    } else {
      if (callback) callback(data, params)
    }
  })
}

put_dynamoDB = (params, callback)=>{
  ddb.putItem(params, (err, data)=>{
    if (err) { console.log("Error", err)
    } else {
      if (callback) callback(data, params)
    }
  })
}

batchGet_dynamoDB = (params, callback)=>{
  ddb.batchGetItem(params, function(err, data) {
    if (err) { console.log("Error", err) }
    else {
      if (callback) callback(data, params)
    }
  })
}

batchWrite_dynamoDB = (params, callback)=>{
  ddb.batchWriteItem(params, function(err, data) {
    if (err) { console.log("Error", err)
    } else {
      if (callback) callback(data, params)
    }
  })
}
