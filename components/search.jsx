"use strict";

/* global jQuery */
var React = require('react');
var { Navigation } = require('react-router');
var Input = require('react-bootstrap').Input;

var Search = React.createClass({
  mixins: [ Navigation ],

  /**
   * Public method to clear the value of the search field.
   */
  clearSearch() {
    this.refs.searchBox.refs.input.getDOMNode().value = '';
  },

  /**
   * Public method to put the focus on the search field.
   */
  focusSearch() {
    // React.findDOMNode(this.refs.searchBox.refs.input).focus(); // React 0.13.0
    this.refs.searchBox.refs.input.getDOMNode().focus()
  },

  /**
   * Un-focus from the search box (dismissing mobile keyboard) when the user is
   * scrolling so that more real-estate is made available for the search
   * results.
   */
  onScroll() {
    // React.findDOMNode(this.refs.searchBox.refs.input).blur(); // React 0.13.0
    this.refs.searchBox.refs.input.getDOMNode().blur()
  },

  /**
   * "Click" handler for selecting an item from the search result list. This
   * callback is shared across all source types, so run a switch/case against
   * the group (data source) to know how to handle the callback.
   *
   * @param  {jQuery} node
   *   jQuery object of the initialized input
   *
   * @param  {Element} element
   *   DOM of the anchor element
   *
   * @param  {Object} obj
   *   Javascript object of the option.source element
   *
   * @param  {Event} event
   *   jQuery event that was triggered
   */
  handleSearchResultClick(node, element, obj, event) {
    switch (obj.group) {
      case 'faq':
        this.transitionTo('/faq/' + obj.id);
        break;

      default:
        break;
    }
  },

  /**
   * Callback for processing typeahead results for FAQs.
   *
   * We collect ALL the FAQ items and expose all question variants into a
   * flattened list so that every keyword in a question is search-able.
   *
   * @param  {object} payload
   *   The payload returned from the data source.
   *
   * @return {array}
   *   A flattened list of objects containing the display string and identifier.
   */
  processFaqResults(payload) {
    var data = [];
    for (var i=0;i<payload.data.length;i++) {
      for (var j=0;j<payload.data[i].questions.length;j++) {
        data.push({
          display: payload.data[i].questions[j],
          id: payload.data[i].id
        });
      }
    }
    return data;
  },

  componentDidMount() {
    var me = this;

    document.addEventListener('scroll', this.onScroll, false);

    jQuery.typeahead({
      input: '#search',
      source: {
          faq: [{
            url: 'http://local.foxtail.com/api/v1.0/faq',
            process: me.processFaqResults
          }],
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
