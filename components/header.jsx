"use strict";

/* global jQuery */
var React = require('react/addons');
var Headroom = require('react-headroom');
var { Link, HistoryLocation } = require('react-router');

var ButtonGroup = require('react-bootstrap').ButtonGroup;
var Button = require('react-bootstrap').Button;
var Glyphicon = require('react-bootstrap').Glyphicon;

var Header = React.createClass({
  propTypes: {
    navigation: React.PropTypes.arrayOf(React.PropTypes.shape({
      title: React.PropTypes.string.isRequired,
      href: React.PropTypes.string.isRequired,
      icon: React.PropTypes.string.isRequired
    }))
  },

  getDefaultProps() {
    return {
      navigation: []
    }
  },

  getInitialState() {
    return {activeDrawer: false}
  },

  componentDidMount() {
    jQuery('body').on('click', this.onBodyClick);
    HistoryLocation.addChangeListener(this.onHistoryChange);
  },

  componentWillUnmount() {
    jQuery('body').off('click', this.onBodyClick);
    HistoryLocation.removeChangeListener(this.onHistoryChange);
  },

  // Dismiss the drawer any time we are transitioning into a new location.
  onHistoryChange() {
    this.setState({activeDrawer:false});
  },

  // Let clicking on the body close the drawer, unless we are clicking on
  // something that is in the drawer because people can fat-finger it and that
  // gets annoying.
  onBodyClick(e) {
    if (jQuery(e.target).closest('#drawer').length) return;

    if (this.state.activeDrawer) {
      this.setState({activeDrawer:false});
    }
  },

  // Click handler for closing the drawer.
  handleCloseDrawer(e) {
    this.setState({activeDrawer:false});
    e.preventDefault();
    e.stopPropagation();
  },

  // Click handler for opening the drawer.
  handleOpenDrawer(e) {
    this.setState({activeDrawer:true});
    e.preventDefault();
  },

  render() {
    var cx = React.addons.classSet;

    return <div className="header">
      <div id="drawer" className={cx({'drawer': true, 'active': this.state.activeDrawer})}>
        <a onClick={this.handleCloseDrawer} className="drawer-close"><Glyphicon glyph="remove" /></a>
        <div className="drawer-inner">
          {/* Search goes here. */}
        </div>
      </div>

      <Headroom>
        <ButtonGroup justified className="navigation">
          {this.props.navigation.map((item, index) =>
            <Link key={index} className="btn btn-default" to={item.href}>
              <Glyphicon glyph={item.icon} /> {item.title}
            </Link>
          )}
          <a onClick={this.handleOpenDrawer} className="btn btn-default"><Glyphicon glyph="search" /> Search</a>
        </ButtonGroup>
      </Headroom>

    </div>
  }
});

module.exports = Header;
