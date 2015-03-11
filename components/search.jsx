"use strict";

/* global jQuery */
var React = require('react');
var Input = require('react-bootstrap').Input;

var Search = React.createClass({
  focusSearch() {
    // FIXME: refs are okay, but .focus() method not working.
    // React.findDOMNode(this.refs.searchBox.refs.input).focus(); // React 0.13.0
    this.refs.searchBox.refs.input.getDOMNode().focus()
    // React.findDOMNode(this.refs.searchBox.refs.input).value = 'test';
  },

  // Un-focus from the search box (dismissing mobile keyboard) when the user is
  // scrolling so that more real-estate is made available for the search
  // results.
  onScroll() {
    // React.findDOMNode(this.refs.searchBox.refs.input).blur(); // React 0.13.0
    this.refs.searchBox.refs.input.getDOMNode().blur()
  },

  componentDidMount() {
    document.addEventListener('scroll', this.onScroll, false);
    jQuery.typeahead({
      input: '#search',
      source: {
          data: [
              "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
              "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh",
              "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia",
              "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burma",
              "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Central African Republic", "Chad",
              "Chile", "China", "Colombia", "Comoros", "Congo, Democratic Republic", "Congo, Republic of the",
              "Costa Rica", "Cote d'Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti",
              "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador",
              "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon",
              "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Greenland", "Grenada", "Guatemala", "Guinea",
              "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India",
              "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan",
              "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kuwait", "Kyrgyzstan", "Laos",
              "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
              "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands",
              "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Mongolia", "Morocco", "Monaco",
              "Mozambique", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger",
              "Nigeria", "Norway", "Oman", "Pakistan", "Panama", "Papua New Guinea", "Paraguay", "Peru",
              "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Samoa", "San Marino",
              "Sao Tome", "Saudi Arabia", "Senegal", "Serbia and Montenegro", "Seychelles", "Sierra Leone",
              "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "Spain",
              "Sri Lanka", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan",
              "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey",
              "Turkmenistan", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States",
              "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe", "Zimbabeox",
              "Zimpopo", "Zimma", "Zimbaox"
          ]
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
// Style search box
