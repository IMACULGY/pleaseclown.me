const fs = require('fs');
const audio = require('./audio.json');
const audioFiles = fs.readdirSync('./audio');

module.exports.handleRequest = function(req, res) {
    var headers = {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': ['Content-Type', 'Content-Length'],
            'Cache-Control': ['public', 'max-age=604800', 'immutable']
        };

    try {
        //Create url to parse the path+query
        //?format=mp3,wav,ogg,...
        var filePath = "";
        var url = req.url;
        var format = "mp3";
        if(req.url.indexOf('?') != -1) {
            url = url.substring(0, req.url.indexOf('?'));
            format = req.url.substring(req.url.indexOf('?') + 8);
        }
        console.log(url + "\n" + format);
        if (req.method == 'GET' || req.method == 'HEAD') {
            if(url == '/' || url == '/random') {
                //Send back a random audio.
                filePath = './audio/' + randomAudio();
                //Update headers
                headers['Cache-Control'] = ['max-age=0', 'must-revalidate'];
            }
            else if (url.indexOf('/audio') == 0) {
                if(audio.includes(url.substring(7))) {
                    filePath = '.' + url;
                }
                else {
                    res.writeHead(404);
                    res.end('Audio File Not Found\n');
                }
            }
            else if (url == '/test') {
                res.writeHead(200);
                res.end('Hello World\n');
            }
            else {
                res.writeHead(404);
                res.end('Not Found\n');
            }
            

            if (filePath != "") {
                if(format == "mp3") {
                    var ctype = 'audio/mpeg';
                    filePath += '.mp3';
                }
                else if(format == "wav") {
                    ctype = 'audio/wav';
                    filePath += '.wav';
                }
                else if (format == "ogg") {
                    ctype = 'audio/ogg';
                    filePath += '.ogg';
                }
                console.log(filePath); //log filepath
                var stat = fs.statSync(filePath);
                res.writeHead(200, {
                    ...headers,
                    'Content-Type': ctype,
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

//return random audio from the list (only multiples of 3 so only mp3 files)
function randomAudio() {
    var rand = Math.floor(Math.random() * audio.length);
    return  audio[rand];
}