"use strict";

var React = require('react');
var Router = require('react-router');
var { Route, DefaultRoute } = Router;

var routes = (
  <Route path="/" handler={require('./routes/app.jsx')}>
    <Route path="faq" name="faq" handler={require('./routes/faqRoute.jsx')}/>
    <Route name="faqItem" path="faq/:faqItemId" handler={require('./routes/faqItemRoute.jsx')}/>
    <Route path="test" name="test" handler={require('./routes/testRoute.jsx')}/>
    <DefaultRoute name="home" handler={require('./routes/home.jsx')}/>
  </Route>
);

module.exports = routes;
