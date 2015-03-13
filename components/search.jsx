"use strict";

/* global jQuery */
var React = require('react');
var { Navigation } = require('react-router');
var Input = require('react-bootstrap').Input;

var Search = React.createClass({
  mixins: [ Navigation ],

  clearSearch() {
    this.refs.searchBox.refs.input.getDOMNode().value = '';
  },

  focusSearch() {
    // React.findDOMNode(this.refs.searchBox.refs.input).focus(); // React 0.13.0
    this.refs.searchBox.refs.input.getDOMNode().focus()
  },

  // Un-focus from the search box (dismissing mobile keyboard) when the user is
  // scrolling so that more real-estate is made available for the search
  // results.
  onScroll() {
    // React.findDOMNode(this.refs.searchBox.refs.input).blur(); // React 0.13.0
    this.refs.searchBox.refs.input.getDOMNode().blur()
  },

  handleSearchResultClick(node, element, obj, event) {
    switch (obj.group) {
      case 'faq':
        this.transitionTo('/faq/' + obj.id);
        break;

      default:
        break;
    }
  },

  componentDidMount() {
    var me = this;
    document.addEventListener('scroll', this.onScroll, false);
    jQuery.typeahead({
      input: '#search',
      source: {
          faq: ["/api/faq-typeahead.json", 'data']
      },
      hint: true,
      selector: {
        hint: 'form-control',
        container: 'search-container'
      },
      backdrop: {
        'opacity': 0.6,
        'filter': 'alpha(opacity=60)',
        'background-color': '#ffffff'
      },
      callback: {
        onClick: me.handleSearchResultClick
      }
    });
  },

  componentWillUnmount() {
    document.removeEventListener('scroll', this.onScroll);
  },

  render() {
    return <div className="search-container">
      <div className="typeahead-query">
        <Input id="search"
          ref="searchBox"
          label="Search"
          labelClassName="sr-only"
          type="text"
          placeholder="Search something here..." />
      </div>
    </div>
  }
});

module.exports = Search;
