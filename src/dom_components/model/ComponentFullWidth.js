var Component = require('./Component');

module.exports = Component.extend(
  {
    defaults: _.extend({}, Component.prototype.defaults, {
      type: 'full-width',
      tagName: 'full-width',
      style: {
        "max-width": '100%',
        "display": 'block',
        "min-height": '10px',
      },
    }),

    initialize(o, opt) {
      Component.prototype.initialize.apply(this, arguments);
    },
  },
  {
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
      if (el.tagName == 'FULL-WIDTH' || $(el).hasClass('full-width')) {
        result = { type: 'full-width' };
      }
      return result;
    }
  }
);
