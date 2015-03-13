"use strict";

var React = require('react/addons');
var RouteHandler = require('react-router').RouteHandler;
var Header = require('../components/header.jsx');
var FastClick = (typeof window !== 'undefined') ? require('fastclick') : {};

var App = React.createClass({
  componentDidMount() {
    document.addEventListener('DOMContentLoaded', this.onDOMContentLoaded, false);
  },

  componentWillUnmount() {
    document.removeEventListener('DOMContentLoaded', this.onDOMContentLoaded);
    FastClick.destroy();
  },

  // Attach FastClick to the document body to remove the 300ms delay on
  // touch-devices.
  onDOMContentLoaded() {
    FastClick.attach(document.body);
  },

  render() {
    var navigation = [
      {
        title: 'Home',
        href: 'home',
        icon: 'home'
      },
      {
        title: 'FAQ',
        href: 'faq',
        icon: 'list'
      },
      {
        title: 'About',
        href: 'test',
        icon: 'heart'
      }
    ];

    return <div className="app">
      <Header navigation={navigation} />
      <div className="container">
        <RouteHandler/>
      </div>
    </div>
  }
});

module.exports = App;
