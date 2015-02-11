"use strict";

/* global FastClick,jQuery */
var React = require('react/addons');
var { Link, RouteHandler, HistoryLocation } = require('react-router');

var App = React.createClass({
  getInitialState() {
    return {activeMenu: false}
  },

  componentDidMount() {
    document.addEventListener('DOMContentLoaded', this.onDOMContentLoaded, false);
    jQuery('body').on('click', this.onBodyClick);
    HistoryLocation.addChangeListener(this.onHistoryChange);
  },

  componentWillUnmount() {
    document.removeEventListener('DOMContentLoaded', this.onDOMContentLoaded);
    FastClick.destroy();
    jQuery('body').off('click', this.onBodyClick);
    HistoryLocation.removeChangeListener(this.onHistoryChange);
  },

  // Dismiss the menu any time we are transitioning into a new location.
  onHistoryChange() {
    this.setState({activeMenu:false});
  },

  // Attach FastClick to the document body to remove the 300ms delay on
  // touch-devices.
  onDOMContentLoaded() {
    FastClick.attach(document.body);
  },

  // Let clicking on the body close the menu, unless we are clicking on
  // something that is in the menu because people can fat-finger it and that
  // gets annoying.
  onBodyClick(e) {
    if (jQuery(e.target).closest('#menu').length) {
      return;
    }


    if (this.state.activeMenu) {
      this.setState({activeMenu:false});
    }
  },

  // Click handler for closing the menu.
  handleCloseMenu(e) {
    this.setState({activeMenu:false});
    e.preventDefault();
    e.stopPropagation();
  },

  // Click handler for opening the menu.
  handleOpenMenu(e) {
    this.setState({activeMenu:true});
    e.preventDefault();
  },

  render() {
    var cx = React.addons.classSet;
    var closeClasses = cx({
      'menu-close-button': true,
      'active': this.state.activeMenu
    });
    var menuClasses = cx({
      'menu': true,
      'active': this.state.activeMenu
    });

      return <div className="app">
        <div id="menu-close-button" className={closeClasses} ref="menuClose">
          <div className="container">
            <div className="col-md-100">
              <a id="menu-close" className="menu-close icon-close" href="#" onClick={this.handleCloseMenu}></a>
            </div>
          </div>
        </div>

        <div id="menu" className={menuClasses} ref="menu">
          <div className="menu-inner">
            <nav>
              <Link to="home">
                Home
                <span className="small-text">Sweet Home.</span>
              </Link>
              <Link to="faq">
                FAQ
                <span className="small-text">Frequently Answered Questions.</span>
              </Link>
            </nav>
          </div>
        </div>
        <header id="header" className="header">
          <div className="header-real">
            <div className="container">
              <div className="col-md-100">
                <h1 className="logo">
                  <Link to="home">Foxtail</Link>
                </h1>
                <a className="menu-open" href="#" onClick={this.handleOpenMenu}>
                  <span></span>
                </a>
              </div>
            </div>
          </div>
        </header>
        <RouteHandler/>
      </div>
  }
});

module.exports = App;

// Add Headroom.js to hide search/navigation.
