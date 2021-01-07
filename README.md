# pleaseclown.me
An API that returns random clown sounds (WIP)

## How to use
**api.pleaseclown.me**

Currently https is not supported by default for the API. However, the URL **pleaseclown-me.herokuapp.com** DOES work with HTTPS and is an alias to the above URL. This will be changed in the near future.

By default, the API returns a random sound effect in the MP3 format.
To change the format, include `?format=<format>` at the end of the URL. Supported file formats are .mp3, with future support for .wav, .ogg, and .flac file types.

You can also request a specific audio file with `/audio/<audio>` The list of all supported audio files is located [here](https://raw.githubusercontent.com/IMACULGY/pleaseclown.me/master/audio.json) (this can be found in the repo code as  `audio.json`).

This README will be updated when more features are added to the API.

## Demo
To demo the project, check out the [website](https://pleaseclown.me).


Made by Drew I. (IMACULGY)
