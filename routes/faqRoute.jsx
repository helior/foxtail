"use strict";

var React = require('react');
var Reflux = require('reflux');
var FaqAction = require('../actions/faqAction');
var FaqStore = require('../stores/faqStore');

var { Link } = require('react-router');
var ListGroup = require('react-bootstrap').ListGroup;

var FaqRoute = React.createClass({
  mixins: [Reflux.connect(FaqStore, 'faq'), React.addons.PureRenderMixin],

  statics: {
    willTransitionTo: function(transition, params, query, callback) {
      FaqAction.load();
      callback();
    }
  },

  getFaqs() {
    return this.state.faq.map(faq =>
      <Link className="list-group-item" key={faq.id} to="faqItem" params={{faqItemId: faq.id}}>{faq.questions[0]}</Link>
    );
  },

  render() {
    var list = this.state.faq && this.getFaqs();
    return <ListGroup>
      {list}
    </ListGroup>
  }
});

module.exports = FaqRoute;
