"use strict";

/* global window */
window.jQuery = require('./assets/js/jquery-2.1.3.js');
require('./assets/js/site.js');

var React = require('react');
var Router = require('react-router');
var routes = require('./routes.jsx');

Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(React.createElement(Handler, null), window.document.getElementById('page'));
});
