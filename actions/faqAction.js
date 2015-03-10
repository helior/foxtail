var Reflux = require('reflux');
var Axios = require('axios');

var FaqAction = {
  load: Reflux.createAction({asyncResult: true})
};

FaqAction.load.listenAndPromise(function() {
  return Axios.get('/api/faq.json');
});

module.exports = FaqAction;
