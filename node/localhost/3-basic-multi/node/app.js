var http = require('http');

var data = { users_count:0, users: {} }
var clearDelay = 200;

http.createServer(function (req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Access-Control-Allow-Origin': req.headers.origin || true
  })

  var query = req.url.split('/?')[1]

  if (query) handleReq(res, query)

  const time = Date.now()
  for (const user in data.users) {
    if (data.users[user].lastActive+clearDelay < time
     && data.users[user].status === 'active') {
      data.users[user].status = 'inactive'
    }
  }

  res.end(JSON.stringify(data.users))

}).listen(8080)

var handleReq = function(res, query){
  const [ key, value ] = query.split('=')
  if (key === 'create') {
    const [ val, name ] = value.split('&')
    data.users[name] = {
      val: val,
      userId: data.users_count,
      lastActive: Date.now(),
      status: 'active'
    }
    data.users_count++
  } else if (key === 'value') {
    const [ val, name ] = value.split('&')
    data.users[name].lastActive = Date.now(),
    data.users[name].status = 'active'
    data.users[name].val = val
  } else if (key === 'update' && data.users[value]) {
    data.users[value].lastActive = Date.now()
  }
}

// $ arp -a > lists all ports addresses available good for iphone test.
// $ lsof -n -i4TCP:8080 // get list of 8080 port and use PID to replace 1303
// $ kill -9 1303
