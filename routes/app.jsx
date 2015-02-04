"use strict";

var React = require('react');
var { Link, RouteHandler } = require('react-router');

var App = React.createClass({
  render() {
    return (<div id="appContainer">
        <nav>
          <ul>
            <li><Link to="home">Home</Link></li>
            <li><Link to="faq">FAQ</Link></li>
          </ul>
        </nav>
        <RouteHandler/>
      </div>);
  }
});

module.exports = App;
