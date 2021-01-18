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
        var url = req.url;
        var format = "mp3";
        if(req.url.indexOf('?') != -1) {
            url = url.substring(0, req.url.indexOf('?'));
            format = req.url.substring(req.url.indexOf('?') + 8);
        }
        console.log(url + "\n" + format);
        if (req.method == 'GET' || req.method == 'HEAD') {
            if(url == '/' || url == '/random') {
                //Send back a random audio (mp3).
                filePath = './audio/' + randomAudio();
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
                var ctype = 'audio/mpeg';
                if(format == "wav") {
                    ctype = 'audio/wav';
                    //run ffmpeg command
                    exec("ffmpeg -y -i " + filePath + " output.wav", (error, stdout, stderr) => {
                        if(error) {
                            console.log(`error: ${error.message}`);
                            return;
                        }
                        if (stderr) {
                            //console.log(`stderr: ${stderr}`);
                            return;
                        }
                        //console.log(`stdout: ${stdout}`);
                    });
                    filePath = 'output.wav';
                }
                else if (format == "ogg") {
                    ctype = 'audio/ogg';
                    //run ffmpeg command
                    exec("ffmpeg -y -i " + filePath + " output.oga", (error, stdout, stderr) => {
                        if(error) {
                            console.log(`error: ${error.message}`);
                            return;
                        }
                        if (stderr) {
                            //console.log(`stderr: ${stderr}`);
                            return;
                        }
                        //console.log(`stdout: ${stdout}`);
                    });
                    filePath = 'output.oga';

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

function randomAudio() {
    return  audio[Math.floor(Math.random() * audio.length)];
}