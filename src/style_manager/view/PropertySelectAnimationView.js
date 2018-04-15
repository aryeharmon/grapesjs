const $ = Backbone.$;

module.exports = require('./PropertyView').extend({
  targetUpdated() {
    var values = [
      'bounce',
      'flash',
      'pulse',
      'rubberBand',
      'shake',
      'swing',
      'tada',
      'wobble',
      'jello',
      'bounceIn',
      'bounceInDown',
      'bounceInLeft',
      'bounceInRight',
      'bounceInUp',
      'bounceOut',
      'bounceOutDown',
      'bounceOutLeft',
      'bounceOutRight',
      'bounceOutUp',
      'fadeIn',
      'fadeInDown',
      'fadeInDownBig',
      'fadeInLeft',
      'fadeInLeftBig',
      'fadeInRight',
      'fadeInRightBig',
      'fadeInUp',
      'fadeInUpBig',
      'fadeOut',
      'fadeOutDown',
      'fadeOutDownBig',
      'fadeOutLeft',
      'fadeOutLeftBig',
      'fadeOutRight',
      'fadeOutRightBig',
      'fadeOutUp',
      'fadeOutUpBig',
      'flip',
      'flipInX',
      'flipInY',
      'flipOutX',
      'flipOutY',
      'lightSpeedIn',
      'lightSpeedOut',
      'rotateIn',
      'rotateInDownLeft',
      'rotateInDownRight',
      'rotateInUpLeft',
      'rotateInUpRight',
      'rotateOut',
      'rotateOutDownLeft',
      'rotateOutDownRight',
      'rotateOutUpLeft',
      'rotateOutUpRight',
      'slideInUp',
      'slideInDown',
      'slideInLeft',
      'slideInRight',
      'slideOutUp',
      'slideOutDown',
      'slideOutLeft',
      'slideOutRight',
      'zoomIn',
      'zoomInDown',
      'zoomInLeft',
      'zoomInRight',
      'zoomInUp',
      'zoomOut',
      'zoomOutDown',
      'zoomOutLeft',
      'zoomOutRight',
      'zoomOutUp',
      'hinge',
      'jackInTheBox',
      'rollIn',
      'rollOut'
    ];

    if (window.editor) {
      // alert(window.editor.getSelected().view.$el.attr('class'))
      for (var n = 0; n < values.length; n++) {
        if (window.editor.getSelected().view.$el.is('.' + values[n])) {
          // $('.animation-select').val(values[n]);
          window.aryeh = this.model;
          this.model.set('value', values[n], {});
          // this.refreshLayers();
          return;
        }
      }
    }

    // this.refreshLayers();

    // alert(333);
  },

  templateInput() {
    const pfx = this.pfx;
    const ppfx = this.ppfx;
    return `
      <div class="${ppfx}field ${ppfx}select">
        <span id="${pfx}input-holder"></span>
        <div class="${ppfx}sel-arrow">
          <div class="${ppfx}d-s-arrow"></div>
        </div>
      </div>
    `;
  },

  onRender() {
    var pfx = this.pfx;
    const model = this.model;
    const options = model.get('list') || model.get('options') || [];

    // $('.animation-select').val('bounceOutLeft');

    if (!this.input) {
      let optionsStr = '';

      options.forEach(option => {
        let name = option.name || option.value;
        let style = option.style ? option.style.replace(/"/g, '&quot;') : '';
        let styleAttr = style ? `style="${style}"` : '';
        let value = option.value.replace(/"/g, '&quot;');
        optionsStr += `<option value="${value}" ${styleAttr}>${name}</option>`;
      });

      const inputH = this.el.querySelector(`#${pfx}input-holder`);
      inputH.innerHTML = `<select class="animation-select">${optionsStr}</select>`;
      this.input = inputH.firstChild;
    }

    this.onChange = function(target, that, opt) {
      var value = $('.animation-select').val();
      if (!value) {
        return;
      }
      var selected = window.editor.getSelected();

      selected.removeClass(
        ['animated'].concat(
          options.map(function(o) {
            return o.value;
          })
        )
      );

      // alert(value);
      selected.addClass(['animated', value]);
    };
  }
});
