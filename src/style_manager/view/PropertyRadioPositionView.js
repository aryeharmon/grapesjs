module.exports = require('./PropertyView').extend({

  templateInput() {
    const pfx = this.pfx;
    const ppfx = this.ppfx;
    return `
      <div class="${ppfx}field ${ppfx}field-radio">
        <span id="${pfx}input-holder"></span>
      </div>
    `;
  },

  onRender() {
    const pfx = this.pfx;
    const ppfx = this.ppfx;
    const itemCls = `${ppfx}radio-item-label`;
    const model = this.model;
    const prop = model.get('property');
    const options = model.get('list') || model.get('options') || [];
    if (!this.$input) {
      if(options && options.length) {
        let inputStr = '';
        options.forEach(el => {
          let cl = el.className ?  `${el.className} ${pfx}icon ${itemCls}` : '';
          let id = `${prop}-${el.value}`;
          let labelTxt = el.name || el.value;
          let titleAttr = el.title ? `title="${el.title}"` : '';
          inputStr += `
            <div class="${ppfx}radio-item">
              <input type="radio" class="${pfx}radio" id="${id}" name="${prop}" value="${el.value}"/>
              <label class="${cl || itemCls}" ${titleAttr} for="${id}">${cl ? '' : labelTxt}</label>
            </div>`;
        });
        this.$inputEl = $(inputStr);
        this.input = this.$inputEl.get(0);
        this.$el.find(`#${pfx}input-holder`).html(inputStr);
        this.$input = this.$el.find(`#${pfx}input-holder input[name="${prop}"]`);
      }
    }
      this.onChange = function(target, that, opt) {
        var value = $('input[name=position]:checked').val();
        // var value = that.$input.parent().find('input:checked').val();
          var selected = window.editor.getSelected();
          if (!selected.view.$el.closest('.flex-start > div').length) {
            return;
          }
          var parent = selected.view.$el.closest('.flex-start > div').data('model');
          // window.editor.select(parent);
          if (parent.attributes.classes && parent.attributes.classes.models.length === 0) {
            var sm = parent.view.em.get('SelectorManager');
            var labelmodel = sm.add({label: 'col' + parseInt(Math.random()*10000000000)});
            if (parent) {
                var compCls = parent.get('classes');
                var lenB = compCls.length;
                compCls.add(labelmodel);
                var lenA = compCls.length;
                window.asfsafsafsaf.add(labelmodel);
                parent.view.em.trigger('targetClassAdded');
                // this.updateStateVis();
            }
          }
          var modelToStyle = parent.view.em.get('StyleManager').getModelToStyle(parent);
          var style = modelToStyle.getStyle();
          switch (value) {
              case "none":
                  delete style['margin-left'];
                  delete style['margin-right'];
                break;
              case "right":
                  style['margin-left'] = 'auto';
                  delete style['margin-right'];
                break;
              case "center":
                  style['margin-left'] = 'auto';
                  style['margin-right'] = 'auto';
                break;
              case "left":
                  style['margin-right'] = 'auto';
                  delete style['margin-left'];
                break;
              default:
                  delete style['margin-left'];
                  delete style['margin-right'];
          }
              modelToStyle.setStyle(style, {avoidStore: 0});
           //window.editor.select(selected);
      };

  },
  getInputValue() {
    return this.$input ? this.$el.find('input:checked').val() : '';
  },
  setValue(value) {
    if (!window.editor || !window.editor.getSelected()) {
      return;
    }

    const model = this.model;
      var selected = window.editor.getSelected();
      if (!selected.view.$el.closest('.flex-start > div').length) {
        return;
      }
      var parent = selected.view.$el.closest('.flex-start > div').data('model');
      var modelToStyle = parent.view.em.get('StyleManager').getModelToStyle(parent);
      var style = modelToStyle.getStyle();
      var pre_selected = 'none';
      if (style['margin-left'] === 'auto' && style['margin-right'] === 'auto') {
          pre_selected = 'center';
      } else if(style['margin-left'] === 'auto' ) { // finsih this ok
          pre_selected = 'right';
      }
      else if(style['margin-right'] === 'auto') {
          pre_selected = 'left';
      }
      if (value) {
          v  = value;
      }
      var v = model.get('value') || pre_selected;
    if(this.$input) {
      var that = this;
      setTimeout(function (args) {
          that.$input.filter(`[value="${v}"]`).prop('checked', true);
      }, 100)
    }
  },
});
