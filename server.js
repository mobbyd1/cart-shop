var express = require('express');
var https = require('https');
var cons = require('consolidate');
var GithubUtils = require('./javascript/github/GithubUtils');
var CartController = require('./javascript/cart/CartController');

app = express();
app.listen('8080');

console.log('Servidor rodando...');

app.set('view engine', 'jade');

app.get('/', function (req, res)
{
    res.sendfile('views/index.html', {root: __dirname });
});

app.get('/user', function(req, res)
{
	var userName = req.query.name;
	GithubUtils.getUserContent( userName, res );
});

app.post( '/addToCart', function(req, res)
{

});

