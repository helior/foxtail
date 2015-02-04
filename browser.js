"use strict";

/* global window */
var React = require('react');
var Router = require('react-router');
var routes = require('./routes.jsx');

Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(React.createElement(Handler, null), window.document.getElementById('app'));
});
