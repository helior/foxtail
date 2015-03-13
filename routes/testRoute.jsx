"use strict";

var React = require('react');
var Reflux = require('reflux');
var Action = require('../actions/testAction');
var Store = require('../stores/testStore');

var TestRoute = React.createClass({
  mixins: [ Reflux.connect(Store, 'list') ],

  statics: {
    willTransitionTo: function(transition, params, query, callback) {
      Action.load();
      callback();
    }
  },

  render() {
    return <ul>
      {this.state.list.map((item, index) =>
        <li key={index}>{item.answer}</li>
      )}
    </ul>
  }
});

module.exports = TestRoute;
