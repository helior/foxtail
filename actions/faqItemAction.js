var Reflux = require('reflux');
var Axios = require('axios');

var FaqAction = {
  load: Reflux.createAction({asyncResult: true})
};

FaqAction.load.listenAndPromise(function(faqItemId) {
  return Axios.get('http://local.foxtail.com/api/v1.0/faq/' + faqItemId);
});

module.exports = FaqAction;
