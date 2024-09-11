console.log("Hello Node.js!")

const http = require('http')

// Define a string constant concatenating strings
const content = '<!DOCTYPE html>' +
'<html>' +
'    <head>' +
'        <meta charset="utf-8" />' +
'        <title>ECE AST</title>' +
'    </head>' + 
'    <body>' +
'       <p>Hellooo World!</p>' +
'    </body>' +
'</html>'

const url = require('url')
const qs = require('querystring')

const serverHandle = function (req, res) {
    // Retrieve and print the queryParams
    const queryParams = qs.parse(url.parse(req.url).query);
    console.log(queryParams);
  
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(content);
    res.end();
  }

  const server = http.createServer(serverHandle);
  server.listen(8080)