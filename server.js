"use strict";

require('node-jsx').install({extension: '.jsx', harmony: true});
var config = require('config');
var express = require('express');
var React = require('react');
var Router = require('react-router');
var routes = require('./routes.jsx');

//Basic server setup.
var app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(function(req, res) {
  Router.run(routes,req.url, function(Handler) {
    var content = React.renderToString(React.createElement(Handler, null));
    res.render('index', {content: content});
  });
});

app.listen(config.get('express.port'), config.get('express.host'));
