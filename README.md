# pleaseclown.me
An API that returns random clown sounds (WIP)

## How to use
**api.pleaseclown.me**

HTTPS **is** supported for the API. **pleaseclown-me.herokuapp.com** is an alias to the above URL and also works with HTTPS.

By default, the API returns a random sound effect in the MP3 format.

You can request a specific audio file with `/audio/<audio>` The list of all supported audio files is located [here](https://raw.githubusercontent.com/IMACULGY/pleaseclown.me/master/audio.json) (this can be found in the repo code as  `audio.json`).

To change the format, include `?format=<format>` at the end of the URL. Supported file formats are mp3, wav, and ogg. For example, you could use https://api.pleaseclown.me/audio/clown1?format=wav or https://api.pleaseclown.me?format=wav.

This README will be updated when more features are added to the API.

## Demo
To demo the project, check out the [website](https://pleaseclown.me).


Made by Drew I. (IMACULGY)
