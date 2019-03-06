//nodemon src/app.js -e js,hbs

const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//Define path for Express config
const pubilcDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(pubilcDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Mobin"
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: "Mobin"
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        name: "Mobin",
        helpText: "This is some helpful text."
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "You must provide the address"
        });
    }

    geoCode(req.query.address, (error, {longitude, latitude, location} = {}) => {

        if(error){
            return res.send({error});
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if(error){
                return res.send({error});
            }
            res.send({
                forcast: forecastData,
                location,
                address: req.query.address
            });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404",
        name: "Mobin",
        errorMessage: "Help article not found."
    });
});

app.get('*', (req, res) => {
    res.render('404',{
        title: "404",
        name: "Mobin",
        errorMessage: 'My 404 Page...'
    });
});

app.listen(3000, () =>{
    console.log('Server is up on 3000');
});