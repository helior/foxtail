"use strict";

var React = require('react');
var Router = require('react-router');
var { Route, DefaultRoute } = Router;

var routes = (
  <Route path="/" handler={require('./routes/app.jsx')}>
    <Route path="faq" name="faq" handler={require('./routes/faq.jsx')}/>
    <DefaultRoute name="home" handler={require('./routes/home.jsx')}/>
  </Route>
);

module.exports = routes;
