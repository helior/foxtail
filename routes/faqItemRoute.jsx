"use strict";

var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var Action = require('../actions/faqItemAction');
var Store = require('../stores/faqItemStore');

var FaqItemRoute = React.createClass({
  mixins: [ Router.State, Reflux.connect(Store, 'faq') ],
  statics: {
    willTransitionTo: function(transition, params, query, callback) {
      Action.load(params.faqItemId);
      callback();
    }
  },

  render() {

    return this.state.faq ? <h1>{this.state.faq.label}</h1> : <h3>Faq item: {this.getParams().faqItemId}</h3>
  }
});

module.exports = FaqItemRoute;
