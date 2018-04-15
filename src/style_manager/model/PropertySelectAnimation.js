const Property = require('./Property');

module.exports = Property.extend({
  defaults: {
    ...Property.prototype.defaults,
    // Array of options, eg. [{name: 'Label ', value: '100'}]
    options: []
  },
  init: function() {
    // bounceOut
  },
  // init
  clearValue: function(opts) {
    $('.animation-select').val('');
    var selected = window.editor.getSelected();

    selected.removeClass(['animated']);

    window.aryeh = this;
    if (this.get('value')) {
      selected.removeClass([this.get('value')]);
    }

    this.set({ value: undefined }, opts);
    this.targetUpdated();
  }

  // getFullValue
});
