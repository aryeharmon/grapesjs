var Backbone = require('backbone');
var InputColor = require('domain_abstract/ui/InputColor');

module.exports = require('./PropertyIntegerView').extend({

  setValue(value, opts = {}) {
    opts = Object.assign({}, opts, {silent: 1});

    for (var i = 0; i < editor.CssComposer.getAll().models.length; i++) {
        if (editor.CssComposer.getAll().models[i].attributes.selectorsAdd === ':root') {
            var root_style = editor.CssComposer.getAll().models[i];
        }
    }

    this.inputInst.setValue(root_style.attributes.style[this.property], opts);
  },

  onRender() {

    this.onChange = function(target, that, opt, value) {
        for (var i = 0; i < editor.CssComposer.getAll().models.length; i++) {
            if (editor.CssComposer.getAll().models[i].attributes.selectorsAdd === ':root') {
                var root_style = editor.CssComposer.getAll().models[i];
            }
        }
        root_style.attributes.style[that.property] = value;
        root_style.setStyle(root_style.attributes.style, opt); // update css composer

        var iframe = $('.gjs-frame')[0]
        var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
        $(innerDoc).find(':root').css(that.property, value);

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
  },

});
