var express = require('express')
var app = express()
var logger = require('winston')
var bodyParser = require('body-parser');

var morgan = require('morgan')
var mongoose = require('mongoose');
const db = require("./src//db/index")

const PORT = 3000
const pages_path = __dirname + "/www"
const connection_string = "mongodb://localhost:27017/image_search_abstraction_layer"

logger.add(logger.transports.File, { filename: "/tmp/image_search_abstraction_layer.log" })

logger.log(express.static(pages_path))
logger.info('Using mongo connection: ', connection_string)

db.init(connection_string)


app.set('view engine', 'jade')
app.set('views', __dirname + '/www')


app.use(express.static(pages_path));


// parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



//routers

const {image_router} = require("./src/routers")


app.use('/api', image_router())



app.get('/', function(req, res){
  res.render('index', {
    title: 'Consolidate This'
  })
})


// app.use('/api', ControllerRouters(passport));


app.listen(PORT, function () {
    console.log('Example app listening on port ', PORT)
})






module.exports = app;
