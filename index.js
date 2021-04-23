var net = require('net');
var http = require('http');
var fs = require('fs');

/*net.createServer(function(from) {
    var to = net.createConnection(7030,"2.57.90.16");
    from.pipe(to);
    to.pipe(from);
    to.on("end", from.end.bind(from));
    from.on("end", to.end.bind(to));
}).listen(7030);*/

var httpProxy = require('http-proxy');
var targetHost = '2.57.90.16';
var port = 7030;
httpProxy.createProxyServer({target: targetHost + ':' + port}).listen(port);

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  fs.readFile('index.html', null, function(err, data) {
    if (err) {
        res.writeHead(404);
        res.write('Whoops! File not found!');
    } else {
        res.write(data);
    }
    res.end();
  });
}).listen(80);
