var Component = require('./Component');

module.exports = Component.extend(
  {
    defaults: _.extend({}, Component.prototype.defaults, {
      type: 'layout',
      tagName: 'div',
    }),
    initialize(o, opt) {
      Component.prototype.initialize.apply(this, arguments);
    },
  },
  {
    isComponent(el) {
      var result = '';
      if($(el).attr('data-layout') ){
        result = {type: 'layout'};
      }
      return result;
    },
  }
);
