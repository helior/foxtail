"use strict";

var React = require('react');
var Router = require('react-router');

var FaqItemRoute = React.createClass({
  mixins: [ Router.State ],

  render() {
    return <h1>Faq item: {this.getParams().faqItemId}</h1>
  }
});

module.exports = FaqItemRoute;
