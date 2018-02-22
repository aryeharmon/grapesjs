var Backbone = require('backbone');
var ComponentView = require('./ComponentView');

module.exports = ComponentView.extend({
  tagName: 'div',

  events: {},

  initialize(o) {
    ComponentView.prototype.initialize.apply(this, arguments);
  },

  render(...args) {
    ComponentView.prototype.render.apply(this, args);
    this.updateClasses();
    return this;
  }
});
