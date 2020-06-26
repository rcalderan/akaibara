/**
 * index.js
    3672382 - Richard Carvalho Calderan
    index da api do site

    Using: 
    nodemon to deploy
    mocha as unity tester
   
    express
    boom as standard api response
    mongodb as server database
 */

var express = require('express');
var bodyParser = require('body-parser')
var api = express()

var boom = require('express-boom');
api.use(boom())

//routes

const products = require('./src/routes/productRoutes')
/*
const persons = require('./src/routes/clienteRoutes')
const stock = require('./src/routes/stockRoutes')
const sales = require('./src/routes/saleRoutes')
const nfe = require('./src/routes/nfeRoutes')
const rent = require('./src/routes/rentRoutes')
*/

//body-parser
api.use(bodyParser.urlencoded({ extended: false }))
api.use(bodyParser.json())

//user
//mount router
api.get('/', function(req, res){
   res.send("Akaibara API. Show rules here...");
});

//adicionado o prefixo /api nas rotas para dar match no proxy do vue

api.use("/product",products);
//api.use("/api",express.static('public'));
//api.use("/api/person",persons);
//api.use("/api/stock",stock);
//api.use("/api/sale",sales);
//api.use("/api/nfe",nfe);
//api.use("/api/rent",rent);

const port = 5000
api.listen(port);
console.log('Server is running under port '+port)


module.exports = api;