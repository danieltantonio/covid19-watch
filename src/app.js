const express = require('express');
const path = require('path');
const hbs = require('hbs');
const getData = require('./utils/getData');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const pubDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory
app.use(express.static(pubDir));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Covid-19 Status App',
    name: 'Daniel Antonio'
  })
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Daniel Antonio'
  })
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    name: 'Daniel Antonio',
  })
});

app.get('/covid', (req, res) => {
  if(!req.query.address) {
    return res.send({
      error: 'You must provide an address search.'
    })
  }

  getData(req.query.address, (error, data) => {
    if(error) {
      return res.send({error})
    }

    res.send(data);
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Help Article Not Found',
    message: 'Ayo Cuh you tried looking for help but you be askin all the wrong questions.',
    name: 'Daniel Antonio'
  })
});

app.get('*', (req, res) => {
  res.render('404', {
    title: 'BRUH 404',
    message: 'Ayo Cuh, you be going to places I dun even know. This a 404 my guy.',
    name: 'Daniel Antonio'
  })
});

// Start server

app.listen(port, () => {
  console.log(`Server started and running on port: ${port}`);
});
