var Reflux = require('reflux');
var Action = require('../actions/testAction');

module.exports = Reflux.createStore({
  listenables: Action,

  onLoadCompleted: function(payload) {
    var state = payload.data.data;
    this.trigger(state);
  },

  getInitialState: function() {
    return [{
      "id": 0,
      "category": "XXX Category",
      "questions": ["How do I XXX?"],
      "answer": "XXXXXXXXX."
    }];
  }

});
