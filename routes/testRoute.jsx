"use strict";

var React = require('react');
var Reflux = require('reflux');
// var Action = require('../actions/testAction');
var Store = require('../stores/testStore');

var Jumbotron = require('react-bootstrap').Jumbotron;

var TestRoute = React.createClass({
  mixins: [ Reflux.connect(Store, 'list') ],

  statics: {
    willTransitionTo: function(transition, params, query, callback) {
      // Action.load();
      callback();
    }
  },

  render() {
    return <Jumbotron>
      <h1>Simmer down now</h1>
      <p>This is just a test page.</p>
    </Jumbotron>
  }
});

module.exports = TestRoute;
