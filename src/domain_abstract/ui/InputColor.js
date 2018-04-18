require('utils/ColorPicker');
const Input = require('./Input');
const $ = Backbone.$;

module.exports = Input.extend({
  template() {
    const ppfx = this.ppfx;
    return `
      <div class="${this.holderClass()}"></div>
      <div class="${ppfx}field-colorp">
        <div class="${ppfx}field-colorp-c" data-colorp-c>
          <div class="${ppfx}checker-bg"></div>
        </div>
      </div>
    `;
  },

  inputClass() {
    const ppfx = this.ppfx;
    return `${ppfx}field ${ppfx}field-color`;
  },

  holderClass() {
    return `${this.ppfx}input-holder`;
  },

  /**
   * Set value to the model
   * @param {string} val
   * @param {Object} opts
   */
  setValue(val, opts = {}) {
    const model = this.model;

    var original_val = val;

    if (window.editor) {
      for (
        var i = 0;
        i < window.editor.CssComposer.getAll().models.length;
        i++
      ) {
        if (
          window.editor.CssComposer.getAll().models[i].attributes
            .selectorsAdd === ':root'
        ) {
          var root_style = window.editor.CssComposer.getAll().models[i];
          if (val && val.indexOf('var(') > -1) {
            var variable = val.replace('var(', '').replace(')', '');
            val = root_style.attributes.style[variable];
          }
        }
      }
    }

    const value = val || model.get('defaults');
    const inputEl = this.getInputEl();
    const colorEl = this.getColorEl();
    const valueClr = value != 'none' ? value : '';
    inputEl.value = original_val;
    colorEl.get(0).style.backgroundColor = valueClr;

    // This prevents from adding multiple thumbs in spectrum
    if (opts.fromTarget) {
      colorEl.spectrum('set', valueClr);
      this.noneColor = value == 'none';
    }
  },

  /**
   * Get the color input element
   * @return {HTMLElement}
   */
  getColorEl() {
    if (!this.colorEl) {
      const self = this;
      const ppfx = this.ppfx;
      var model = this.model;

      var colorEl = $(`<div class="${this.ppfx}field-color-picker"></div>`);
      var cpStyle = colorEl.get(0).style;
      var elToAppend = this.em && this.em.config ? this.em.config.el : '';
      var colorPickerConfig =
        (this.em && this.em.getConfig && this.em.getConfig('colorPicker')) ||
        {};
      const getColor = color => {
        let cl =
          color.getAlpha() == 1 ? color.toHexString() : color.toRgbString();
        return cl.replace(/ /g, '');
      };

      let changed = 0;
      let previousColor;
      this.$el.find(`[data-colorp-c]`).append(colorEl);

      // aryeh edits
      window.css_map = {};
      var palette = [];
      var iframe = window.$('.gjs-frame')[0];
      if (iframe) {
        var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
        var allCSS = [].slice
          .call(innerDoc.styleSheets)
          .reduce(function(prev, styleSheet) {
            if (!styleSheet.href) {
              return (
                prev +
                [].slice
                  .call(styleSheet.cssRules)
                  .reduce(function(prev, cssRule) {
                    if (cssRule.selectorText == ':root') {
                      var css = cssRule.cssText.split('{');
                      css = css[1].replace('}', '').split(';');
                      for (var i = 0; i < css.length; i++) {
                        var prop = css[i].split(':');
                        if (prop.length == 2 && prop[0].indexOf('--') == 1) {
                          palette.push(prop[1]);
                          window.css_map[
                            prop[1].replace(/\s/g, '')
                          ] = prop[0].replace(/\s/g, '');
                        }
                      }
                    }
                  }, '')
              );
            }
          }, '');
      }
      // end edits

      colorEl.spectrum({
        containerClassName: `${ppfx}one-bg ${ppfx}two-color`,
        appendTo: elToAppend || 'body',
        maxSelectionSize: 8,
        showPalette: true,
        showAlpha: true,
        chooseText: 'Ok',
        cancelText: '⨯',
        palette: [palette],
        // config expanded here so that the functions below are not overridden
        ...colorPickerConfig,

        move(color) {
          const cl = getColor(color);
          cpStyle.backgroundColor = cl;

          model.setValueFromInput(
            window.css_map[cl.replace(/\s/g, '')]
              ? 'var(' + window.css_map[cl.replace(/\s/g, '')] + ')'
              : cl,
            0
          );
        },
        change(color) {
          changed = 1;
          const cl = getColor(color);

          cpStyle.backgroundColor = cl;
          model.setValueFromInput(
            window.css_map[cl.replace(/\s/g, '')]
              ? 'var(' + window.css_map[cl.replace(/\s/g, '')] + ')'
              : cl
          );
          window.aryeh = model;
          self.noneColor = 0;
        },
        show(color) {
          changed = 0;
          previousColor = getColor(color);
        },
        hide(color) {
          if (!changed && previousColor) {
            if (self.noneColor) {
              previousColor = '';
            }
            cpStyle.backgroundColor = previousColor;
            colorEl.spectrum('set', previousColor);
            model.setValueFromInput(
              window.css_map[previousColor.replace(/\s/g, '')]
                ? 'var(' +
                  window.css_map[previousColor.replace(/\s/g, '')] +
                  ')'
                : previousColor.replace(/\s/g, ''),
              0
            );
          }
        }
      });

      this.colorEl = colorEl;
    }
    return this.colorEl;
  },

  render() {
    Input.prototype.render.call(this);
    // This will make the color input available on render
    this.getColorEl();
    return this;
  }
});
