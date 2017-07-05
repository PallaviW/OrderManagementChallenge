
var express = require('express');
var app = express();
var Orders= require('./index.js');
var fees =require('./fees.json');
var orders = require('./orders.json')



app.get('/', function(req,res){
	res.send(orders);
});
app.listen(3000);
console.log('Listening on port 3000..');


//Get prices for each order item and total for the order

app.get('/orders/pricing', function(req,res){
	res.send(Orders.getOrdersPricing(orders));
});


//Get the distribution totals for each order

app.get('/orders/distributions', function(req,res){
	res.send(Orders.getOrdersDistributions(orders,fees));
});


