// REQUIREMENTS
// native
const path = require('path')
// 3rd party
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require("node-fetch");

// local
const app = express()
const port = process.env.PORT || 8000

// MIDDLEWARE
// either way will point to static folder to find index.html
// run script will start server/index.js
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
// allow cors to access this backend
app.use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// INIT SERVER
app.listen(port, () => {
    console.log(`Started on port ${port}`);
})

// helper functions
// return JSON data or error object, request weather api
// I use helper function, optional, you can do request inside the route
const getWeather = async (url) => {
    try {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    }catch (error) {
        console.log(error);
        return error;
    }
}

// ROUTES
// root
app.get('/', function (req, res) {
    res.send('hello world');
    // this file structure index.js is not on top folder, so don't use direct file
    // res.sendFile(__dirname + '/public/index.html');
})

// 3). Back end request Weather API
// GET route
// shows the json data
// api end point I use, go to this link for instruction
// https://fcc-weather-api.glitch.me/
// I created a helper function getWeather(url) to fetch data
app.get('/api', async function (req, res) {
    // I use GET request here, if you like to use POST request please change the code
    //      backend request weather data
    //          if success
    //              pass JSON data as response to front end
    //          if error
    //              pass a message as response to front end
    let latitude = req.query.latitude;
    let longitude = req.query.longitude;
    let url = `https://fcc-weather-api.glitch.me/api/current?lat=${latitude}&lon=${longitude}`;
    let data = await getWeather(url);
    if(data){
        res.status(200).json(data);
    }else{
        res.status(400).json("error has occured");
    }
})
