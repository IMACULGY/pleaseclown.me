const https = require('https');
const fs = require('fs');
const handler = require('./handler');

//Keys located in key.pem and cert.pem
const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

//Create the HTTPS Server
const port = process.env.PORT || 8080
https.createServer(options, function (req, res) {
    console.log(req.method);
    res = handler.handleRequest(req, res);
    //console.log(res);
}).listen(port);

