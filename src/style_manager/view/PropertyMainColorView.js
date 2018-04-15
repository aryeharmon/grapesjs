var Backbone = require('backbone');
var InputColor = require('domain_abstract/ui/InputColor');

module.exports = require('./PropertyIntegerView').extend({
  targetUpdated(value, opts = {}) {
    var that = this;
    var em = this.em;
    var editor = em ? em.get('Editor') : '';

    opts = Object.assign({}, opts, { silent: 1 });

    for (var i = 0; i < editor.CssComposer.getAll().models.length; i++) {
      if (
        editor.CssComposer.getAll().models[i].attributes.selectorsAdd ===
        ':root'
      ) {
        var root_style = editor.CssComposer.getAll().models[i];
      }
    }
    if (root_style) {
      this.inputInst.setValue(root_style.attributes.style[this.property], opts);
    }
  },

  setValue(value, opts = {}) {
    var that = this;
    var em = this.em;
    var editor = em ? em.get('Editor') : '';

    opts = Object.assign({}, opts, { silent: 1 });

    for (var i = 0; i < editor.CssComposer.getAll().models.length; i++) {
      if (
        editor.CssComposer.getAll().models[i].attributes.selectorsAdd ===
        ':root'
      ) {
        var root_style = editor.CssComposer.getAll().models[i];
      }
    }
    if (root_style) {
      this.inputInst.setValue(root_style.attributes.style[this.property], opts);
    }
  },

  onRender() {
    var em = this.em;
    var editor = em ? em.get('Editor') : '';

    this.onChange = function(target, that, opt, value) {
      for (var i = 0; i < editor.CssComposer.getAll().models.length; i++) {
        if (
          editor.CssComposer.getAll().models[i].attributes.selectorsAdd ===
          ':root'
        ) {
          var root_style = editor.CssComposer.getAll().models[i];
        }
      }

      if (!that.input.value) {
        return;
      }

      root_style.attributes.style[that.property] = that.input.value;
      root_style.setStyle(root_style.attributes.style, opt); // update css composer

      var iframe = window.$('.gjs-frame')[0];
      var innerDoc = iframe.contentDocument || iframe.contentWindow.document;

      window
        .$(innerDoc)
        .find(':root')
        .css(that.property, that.input.value);
    };

    if (!this.input) {
      const inputColor = new InputColor({
        target: this.target,
        model: this.model,
        ppfx: this.ppfx
      });
      const input = inputColor.render();
      this.$el.append(input.$el);
      this.$input = input.inputEl;
      this.$color = input.colorEl;
      this.input = this.$input.get(0);
      this.inputInst = input;
    }
  }
});
