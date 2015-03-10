var Reflux = require('reflux');
var Axios = require('axios');

var Action = {
  load: Reflux.createAction({asyncResult: true})
};

Action.load.listenAndPromise(function() {
  // setTimeout(function() {

  // }, 1000);
  return Axios.get('/api/faq.json');
});

module.exports = Action;
