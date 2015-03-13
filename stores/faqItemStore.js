var Reflux = require('reflux');
var FaqItemAction = require('../actions/faqItemAction');

var state = null;

module.exports = Reflux.createStore({
  listenables: FaqItemAction,

  onLoadCompleted: function(payload) {
    state = payload.data.data[0];
    this.trigger(state);
  },

  getInitialState: function() {
    return state;
  }
});
