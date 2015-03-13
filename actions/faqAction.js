var Reflux = require('reflux');
var Axios = require('axios');

var FaqAction = {
  load: Reflux.createAction({asyncResult: true})
};

FaqAction.load.listenAndPromise(function() {
  return Axios.get('http://local.foxtail.com/api/v1.0/faq', {params: {fields: 'id,questions'}});
});

module.exports = FaqAction;
