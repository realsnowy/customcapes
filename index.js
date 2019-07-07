var data = require('./capes.json');
var http = require('http');
var fs = require('fs');
var path = require('path');

var server = http.createServer(function(req, res) {
    var user = path.basename(req.url, '.png');
    var png = data[user];
    if (png) {
      console.log(`Cape request ${png} for user ${user}`)
        fs.readFile(`capes/${png}.png`, function(error, content) {
            if (error) {
                response.writeHead(500);
                response.end(`Sorry, check with the site admin for error: ${error.code} ..\n`);
                response.end();
            } else {
                res.writeHead(200, { 'Content-Type': 'image/png' });
                res.end(content, 'utf-8');
            }
        });
    } else {
        res.writeHead(301, {'Location': `http://s.optifine.net${req.url}`})
        res.end();
    }
});

console.log('Proxy initialized')
server.listen(8080);