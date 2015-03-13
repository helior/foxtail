"use strict";

var React = require('react');
var Reflux = require('reflux');
var { Link, State } = require('react-router');
var Action = require('../actions/faqItemAction');
var Store = require('../stores/faqItemStore');

var Glyphicon = require('react-bootstrap').Glyphicon

var FaqItemRoute = React.createClass({
  mixins: [ State, Reflux.connect(Store, 'faq') ],
  statics: {
    willTransitionTo: function(transition, params, query, callback) {
      Action.load(params.faqItemId);
      callback();
    }
  },

  render() {
    return this.state.faq && <div>
      <div className="panel panel-default">
        <div className="panel-heading">
          <h1>{this.state.faq.questions[0]}</h1>
        </div>
        <div className="panel-body" dangerouslySetInnerHTML={{__html: this.state.faq.answer}} />
      </div>

      <Link to="faq" className="btn btn-default"><Glyphicon glyph="chevron-left" /> Back to FAQs</Link>
    </div>
  }
});

module.exports = FaqItemRoute;
