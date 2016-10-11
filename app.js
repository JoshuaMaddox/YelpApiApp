const PORT = 8000,
      cors = require('cors'),
      path = require('path'),
      morgan = require('morgan'),
      express = require('express'),
      webpack = require('webpack'),
      bodyParser = require('body-parser'),
      webpackConfig = require('./webpack.config'),
      yelpHandlers = require('./models/yelpHandlers.js'),
      webpackDevMiddleware = require('webpack-dev-middleware'),
      webpackHotMiddleware = require('webpack-hot-middleware')


//Express invocation
const app = express()

//Middleware
app.use(cors())
app.use(morgan('dev'))
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//Webpack Configuration
const compiler = webpack(webpackConfig)
app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath, noInfo: true
}))
app.use(webpackHotMiddleware(compiler))


//Get all favorites
app.get('/businesses/favorites', (req, res) => {
  yelpHandlers.getAllFavs((err, favs) => {
    if(err) {
      return res.status(400).send(err)
    }
    res.send(favs)
  })
})

//Delete a Favorite
app.delete('/businesses/favorites/:id', (req, res) => {
  let searchId = req.params.id
  yelpHandlers.deleteFavs(searchId, (err, favs) => {
    if(err) {
      return res.status(400).send(err)
    }
    res.send(favs)
  })
})

//Get Single Business
app.get('/businesses/:id', (req, res) => {
  let searchId = req.params.id
  yelpHandlers.singleOut(searchId, (err, businesses) => {
    if(err) {
      return res.status(400).send(err)
    }
    res.send(businesses)
  })
})

//Get search results for term and location
app.get('/businesses', (req, res) => {
  let searchObj = {
    term: req.query.term,
    location: req.query.location
  }
  yelpHandlers.searchYelp(searchObj, (err, businesses) => {
    if(err) {
      return res.status(400).send(err)
    }
    res.send(businesses)
  })
})

//Add a business to favorites
app.put('/businesses/:id', (req, res) => {
  let searchId = req.params.id
  yelpHandlers.putToFavs(searchId, (err, businesses) => {
    if(err) {
      return res.status(400).send(err)
    }
    res.send(`${searchId} was added to your favorites`)
  })
})

//Remove a business from favories

app.listen(PORT, err => {
  console.log( err || `Express listening on port ${8000}`)
})