const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Sana Basharat'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sana Basharat'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Sana Basharat'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error){
            return res.send({
                error: error
            })
        }
        forecast(latitude, longitude, (error, forecastdata) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            console.log(location)
            console.log(forecastdata)
            res.send({
                title: 'Weather',
                location: location,
                weather: forecastdata 
            })
        })
    })
})

app.post('/login', (req, res) => {
    var user_name = req.body.user;
    var password = req.body.password;
    console.log('User name = '+user_name+'\npassword = '+password);
    res.end('Logged in successfully');
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sana Basharat',
        errorMessage: 'Error! Help article not found :('
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sana Basharat',
        errorMessage: 'Error! Page not found : ('
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})