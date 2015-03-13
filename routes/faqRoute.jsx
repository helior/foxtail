"use strict";

var React = require('react');
var Reflux = require('reflux');
var FaqAction = require('../actions/faqAction');
var FaqStore = require('../stores/faqStore');

var FaqRoute = React.createClass({
  mixins: [Reflux.connect(FaqStore, 'faq'), React.addons.PureRenderMixin],

  statics: {
    willTransitionTo: function(transition, params, query, callback) {
      FaqAction.load();
      callback();
    }
  },

  getFaqs() {
    return this.state.faq.map((faq, index) =>
      <p key={index}><a id={faq.id} name={faq.id} href={'/faq#' + faq.id}>{faq.id}. {faq.answer}</a></p>
    );
  },

  render() {
    var list = this.state.faq && this.getFaqs();
    return <div>
      <h1>FAQ page!</h1>
      {list}
    </div>
  }
});

module.exports = FaqRoute;
