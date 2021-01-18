const http = require('http');
const fs = require('fs');
const handler = require('./handler');


//Create the HTTPS Server
const port = 8000
http.createServer(function (req, res) {
    console.log(req.method);
    res = handler.handleRequest(req, res);
    //console.log(res);
}).listen(port);

