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
        var filePath = "";
        const url = new URL('https://example.com/' + req.url);
        if (req.method == 'GET' || req.method == 'HEAD') {
            if(req.url == '/' || req.url == '/random') {
                //Send back a random audio (mp3).
                filePath = './audio/' + randomAudio();
            }
            else if (req.url.indexOf('/audio') == 0) {
                if(audio.includes(req.url.substring(7))) {
                    filePath = '.' + req.url;
                }
                else {
                    res.writeHead(404);
                    res.end('Audio File Not Found\n');
                }
            }
            else if (req.url == '/test') {
                res.writeHead(200);
                res.end('Hello World\n');
            }
            else {
                res.writeHead(404);
                res.end('Not Found\n');
            }

            if (filePath != "") {
                console.log(filePath);
                var stat = fs.statSync(filePath);
                res.writeHead(200, {
                    ...headers,
                    'Content-Type': 'audio/mpeg',
                    'Content-Length': stat.size
                });
                fs.createReadStream(filePath).pipe(res);
            }
            
        } else {
            res.writeHead(405);
            res.end('Method not allowed. Use GET or HEAD.\n');
        }


    } catch (error) {
        console.log(error);
        res.writeHead(500);
        res.end('An unexpected error has occurred.\n' + error);
    }
    return res;
}

function randomAudio() {
    return  audio[Math.floor(Math.random() * audio.length)];
}