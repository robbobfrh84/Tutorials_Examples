var http = require('http');

var cnt = 0

http.createServer(function (req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Access-Control-Allow-Origin': req.headers.origin || true
  })
  console.log('cnt', cnt, req.headers)
  res.end(' '+cnt)
  cnt++

}).listen(8080)

// $ arp -a > lists all ports addresses available good for iphone test.
// $ lsof -n -i4TCP:8080 // get list of 8080 port and use PID to replace 1303
// $ kill -9 1303
