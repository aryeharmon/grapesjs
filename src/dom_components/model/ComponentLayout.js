var Component = require('./Component');

module.exports = Component.extend({

  defaults: _.extend({}, Component.prototype.defaults, {
      type: 'layout',
      tagName: 'div',
  }),

},{

  /**
   * Detect if the passed element is a valid component.
   * In case the element is valid an object abstracted
   * from the element will be returned
   * @param {HTMLElement}
   * @return {Object}
   * @private
   */
  isComponent(el) {
    var result = '';
    if(el.tagName == 'DIV' &&
      $(el).attr('data-layout') ){
      result = {type: 'layout', id: $(el).attr('data-layout')};
    }
    return result;
  },

});
