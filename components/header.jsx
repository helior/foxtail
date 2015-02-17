"use strict";

/* global FastClick,jQuery */
var React = require('react/addons');
var { Link, HistoryLocation } = require('react-router');

var Header = React.createClass({
  propTypes: {
    navigation: React.PropTypes.arrayOf(React.PropTypes.shape({
      title: React.PropTypes.string,
      href: React.PropTypes.string,
      subTitle: React.PropTypes.string
    }))
  },

  getDefaultProps() {
    return {
      navigation: []
    }
  },

  getInitialState() {
    return {activeMenu: false}
  },

  componentDidMount() {
    jQuery('body').on('click', this.onBodyClick);
    HistoryLocation.addChangeListener(this.onHistoryChange);
  },

  componentWillUnmount() {
    jQuery('body').off('click', this.onBodyClick);
    HistoryLocation.removeChangeListener(this.onHistoryChange);
  },

  // Dismiss the menu any time we are transitioning into a new location.
  onHistoryChange() {
    this.setState({activeMenu:false});
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

    return <div className="header-element">
      <div id="menu-close-button" className={cx({'menu-close-button': true, 'active': this.state.activeMenu})} ref="menuClose">
        <div className="container">
          <div className="col-md-100">
            <a id="menu-close" className="menu-close icon-close" href="#" onClick={this.handleCloseMenu}></a>
          </div>
        </div>
      </div>

      <div id="menu" className={cx({'menu': true, 'active': this.state.activeMenu})} ref="menu">
        <div className="menu-inner">
          <nav>
            {this.props.navigation.map((item, i) =>
              <Link key={i} to={item.href}>
                {item.title}
                <span className="small-text">{item.subTitle}</span>
              </Link>
            )}
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
    </div>
  }
});

module.exports = Header;

// Add Headroom.js to hide search/navigation.
