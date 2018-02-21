var Component = require('./Component');

module.exports = Component.extend({

  defaults: _.extend({}, Component.prototype.defaults, {
      type: 'section1050',
      tagName: 'section',
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
    if ($(el).hasClass('container') ) {
      result = {type: 'section1050', id: 'section1050'};
    }
    return result;
  },

});
