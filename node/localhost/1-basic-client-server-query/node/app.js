var http = require('http');

var reply = {}; reply.innerHTML = `
  <h1> Hello From Server! </h1>
`

http.createServer(function (req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Access-Control-Allow-Origin': req.headers.origin || true
  })

  var query = req.url.split('/?')[1]

  if (query) {
    console.log('query recieved')
    handleReq(res, query)
  } else {
    console.log('No request, send base html and .end()')
    res.end(reply.innerHTML)
  }

}).listen(8080)

var handleReq = function(res, query){
  res.end('server recieved query: '+query)
}

// $ arp -a > lists all ports addresses available good for iphone test.
// $ lsof -n -i4TCP:8080 // get list of 8080 port and use PID to replace 1303
// $ kill -9 1303
