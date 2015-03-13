var Reflux = require('reflux');
var Axios = require('axios');

var Action = {
  load: Reflux.createAction({asyncResult: true})
};

Action.load.listenAndPromise(function() {
  // return Axios.get('/api/faq.json');
});

module.exports = Action;
