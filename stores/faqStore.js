var Reflux = require('reflux');
var FaqAction = require('../actions/faqAction');

var state = null;

module.exports = Reflux.createStore({
  listenables: FaqAction,

  onLoadCompleted: function(payload) {
    state = payload.data.data;
    this.trigger(state);
  },

  getInitialState: function() {
    return state;
  }
});
