const path = require('path');

// TODO: externalize this
const wled = {
    "state":{
       "on":false,
       "bri":96,
       "transition":7,
       "ps":-1,
       "pss":44545,
       "pl":-1,
       "ccnf":{
          "min":1,
          "max":5,
          "time":12
       },
       "nl":{
          "on":false,
          "dur":60,
          "fade":true,
          "mode":1,
          "tbri":0
       },
       "udpn":{
          "send":false,
          "recv":true
       },
       "lor":0,
       "mainseg":0,
       "seg":[
          {
             "id":0,
             "start":0,
             "stop":150,
             "len":150,
             "grp":1,
             "spc":0,
             "on":true,
             "bri":255,
             "col":[
                [
                   255,
                   160,
                   0
                ],
                [
                   0,
                   0,
                   0
                ],
                [
                   0,
                   0,
                   0
                ]
             ],
             "fx":0,
             "sx":128,
             "ix":128,
             "pal":0,
             "sel":true,
             "rev":false,
             "mi":false
          }
       ]
    },
    "info":{
       "ver":"0.10.2",
       "vid":2009030,
       "leds":{
          "count":150,
          "rgbw":false,
          "wv":false,
          "pin":[
             2
          ],
          "pwr":250,
          "maxpwr":850,
          "maxseg":10,
          "seglock":false
       },
       "str":false,
       "name":"WLED",
       "udpport":21324,
       "live":false,
       "lm":"",
       "lip":"",
       "ws":0,
       "fxcount":113,
       "palcount":52,
       "wifi":{
          "bssid":"0E:EC:DA:F1:10:9C",
          "rssi":-60,
          "signal":80,
          "channel":11
       },
       "arch":"esp8266",
       "core":"2_7_4",
       "lwip":1,
       "freeheap":16632,
       "uptime":40,
       "u":{
          "Temperature":[
             26,
             "°C"
          ]
       },
       "opt":119,
       "brand":"WLED",
       "product":"FOSS",
       "mac":"483fda6c89e4"
    },
    "effects":[
       "Solid",
       "Blink",
       "Breathe",
       "Wipe",
       "Wipe Random",
       "Random Colors",
       "Sweep",
       "Dynamic",
       "Colorloop",
       "Rainbow",
       "Scan",
       "Scan Dual",
       "Fade",
       "Theater",
       "Theater Rainbow",
       "Running",
       "Saw",
       "Twinkle",
       "Dissolve",
       "Dissolve Rnd",
       "Sparkle",
       "Sparkle Dark",
       "Sparkle+",
       "Strobe",
       "Strobe Rainbow",
       "Strobe Mega",
       "Blink Rainbow",
       "Android",
       "Chase",
       "Chase Random",
       "Chase Rainbow",
       "Chase Flash",
       "Chase Flash Rnd",
       "Rainbow Runner",
       "Colorful",
       "Traffic Light",
       "Sweep Random",
       "Running 2",
       "Red & Blue",
       "Stream",
       "Scanner",
       "Lighthouse",
       "Fireworks",
       "Rain",
       "Merry Christmas",
       "Fire Flicker",
       "Gradient",
       "Loading",
       "Police",
       "Police All",
       "Two Dots",
       "Two Areas",
       "Circus",
       "Halloween",
       "Tri Chase",
       "Tri Wipe",
       "Tri Fade",
       "Lightning",
       "ICU",
       "Multi Comet",
       "Scanner Dual",
       "Stream 2",
       "Oscillate",
       "Pride 2015",
       "Juggle",
       "Palette",
       "Fire 2012",
       "Colorwaves",
       "Bpm",
       "Fill Noise",
       "Noise 1",
       "Noise 2",
       "Noise 3",
       "Noise 4",
       "Colortwinkles",
       "Lake",
       "Meteor",
       "Meteor Smooth",
       "Railway",
       "Ripple",
       "Twinklefox",
       "Twinklecat",
       "Halloween Eyes",
       "Solid Pattern",
       "Solid Pattern Tri",
       "Spots",
       "Spots Fade",
       "Glitter",
       "Candle",
       "Fireworks Starburst",
       "Fireworks 1D",
       "Bouncing Balls",
       "Sinelon",
       "Sinelon Dual",
       "Sinelon Rainbow",
       "Popcorn",
       "Drip",
       "Plasma",
       "Percent",
       "Ripple Rainbow",
       "Heartbeat",
       "Pacifica",
       "Candle Multi",
       "Solid Glitter",
       "Sunrise",
       "Phased",
       "Twinkleup",
       "Noise Pal",
       "Sine",
       "Phased Noise",
       "Flow",
       "Chunchun",
       "Dancing Shadows"
    ],
    "palettes":[
       "Default",
       "* Random Cycle",
       "* Color 1",
       "* Colors 1&2",
       "* Color Gradient",
       "* Colors Only",
       "Party",
       "Cloud",
       "Lava",
       "Ocean",
       "Forest",
       "Rainbow",
       "Rainbow Bands",
       "Sunset",
       "Rivendell",
       "Breeze",
       "Red & Blue",
       "Yellowout",
       "Analogous",
       "Splash",
       "Pastel",
       "Sunset 2",
       "Beech",
       "Vintage",
       "Departure",
       "Landscape",
       "Beach",
       "Sherbet",
       "Hult",
       "Hult 64",
       "Drywet",
       "Jul",
       "Grintage",
       "Rewhi",
       "Tertiary",
       "Fire",
       "Icefire",
       "Cyane",
       "Light Pink",
       "Autumn",
       "Magenta",
       "Magred",
       "Yelmag",
       "Yelblu",
       "Orange & Teal",
       "Tiamat",
       "April Night",
       "Orangery",
       "C9",
       "Sakura",
       "Aurora",
       "Atlantica"
    ]
};

const live = {
    count: 0,
    index: 0,
    leds: [
        {"leds": ["000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000", "000000"], "n":1},
        {"leds": ["0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB", "0000FB"], "n":1}
    ]
};

module.exports = {
    mode: 'development',
    devServer: {
        contentBase: './wled00/data',
        index: 'index.htm',
        clientLogLevel: 'trace',
        proxy: {
            '/json/live':{
                target: 'ws://10.0.9.101/json/live',
                secure: false,
                logLevel: 'debug',
                ws: true
             },
             '/json/si':{
                target: 'http://10.0.9.101/json/si',
                secure: false,
                logLevel: 'debug'
             },
             '/json':{
                target: 'http://10.0.9.101/json',
                secure: false,
                logLevel: 'debug'
             }
        },
        before: function (app, server, compiler) {
            const bodyParser = require('body-parser');
            app.use(bodyParser.json());

            app.get('/', function (req, res, next) {
                req.url = '/index.htm';
                next();
            });

            app.get('/liveview', function (req, res, next) {
                req.url = '/liveview.htm';
                next();
            });

            app.get('/settings', function (req, res, next) {
                req.url = '/settings.htm';
                next();
            });

            app.get('/settings/style.css', function (req, res, next) {
                req.url = '/style.css';
                next();
            });

            app.get('/settings/*', function (req, res, next) {
                req.url = req.url.replace(/\/settings\/(\w+)/,  '/settings_$1.htm');
                server.log.info(req.url);
                next();
            });
        }
    }
};
