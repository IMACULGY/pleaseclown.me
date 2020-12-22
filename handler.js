const fs = require('fs');
const audio = require('./audio.json');

module.exports.handleRequest = function(req, res) {
    const headers = {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET',
			'Access-Control-Allow-Headers': ['Content-Type', 'Content-Length'],
			'Cache-Control': ['max-age=0', 'must-revalidate']
        };

    try {
        //Create url to parse the path+query
        //?format=mp3,wav,ogg,...
        //Todo: Add compatibility for specific sounds and formats
        const url = new URL('https://example.com/' + req.url);
        if (req.method == 'GET' || req.method == 'HEAD') {
            if(req.url == '/' || req.url == 'random') {
                //Send back a random audio (mp3).
                var filePath = './audio/' + randomAudio();
                console.log(filePath);
                var stat = fs.statSync(filePath);
                res.writeHead(200, {
                    ...headers,
                    'Content-Type': 'audio/mpeg',
                    'Content-Length': stat.size
                });
                fs.createReadStream(filePath).pipe(res);
            }
            else if (req.url == '/test') {
                res.writeHead(200).end('Hello World\n');
            }
            else {
                res.writeHead(404).end('Not Found');
            }
        } else {
            res.writeHead(405).end('Method not allowed. Use GET or HEAD.\n');
        }


    } catch (error) {
        const body = 'An unexpected error has occurred.\n' + error;
        res.writeHead(500, {
            ...headers,
            'Content-Type': 'text/plain',
            'Content-Length': Buffer.byteLength(body)
        }).end(body);
    }
    return res;
}

function randomAudio() {
    return  audio[Math.floor(Math.random() * audio.length)];
}