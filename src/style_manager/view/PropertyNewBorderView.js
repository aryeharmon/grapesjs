const Property = require('./PropertyView');

module.exports = Property.extend({
  events() {
    return {
      ...Property.prototype.events,
      'change .positions input[type=checkbox]': 'inputValueChanged',
      'change input[name=border-width]': 'inputValueChanged',
      // 'input .positions input[type=checkbox]': 'inputValueChangedSoft',
      change: ''
    };
  },

  targetUpdated(model) {
    var model = this.model;

    var selected_view = window.editor.getSelected().view;

    var elem_model = selected_view.$el.data('model');

    var modelToStyle = selected_view.em
      .get('StyleManager')
      .getModelToStyle(elem_model);

    var style = modelToStyle.getStyle();

    model.view.$el
      .find('[name=border-top]')
      .prop('checked', style['border-top-width'] ? true : null);
    model.view.$el
      .find('[name=border-right]')
      .prop('checked', style['border-top-right'] ? true : null);
    model.view.$el
      .find('[name=border-bottom]')
      .prop('checked', style['border-top-bottom'] ? true : null);
    model.view.$el
      .find('[name=border-left]')
      .prop('checked', style['border-top-left'] ? true : null);

    model.view.$el
      .find('[name=border-width]')
      .val(
        (
          style['border-top-width'] ||
          style['border-right-width'] ||
          style['border-bottom-width'] ||
          style['border-left-width'] ||
          ''
        ).replace('px', '')
      );
  },
  init(model) {},
  templateInput(model) {
    const ppfx = this.ppfx;
    return `
      <style>
        #gjs-sm-new-border{
          width: 100%;
        }
        #gjs-sm-new-border .gjs-fields{
          display: block;
        }
      </style>

      <div class="positions" style="width: 100%; text-align: center;">
        <div>
          <label><input type="checkbox" name="border-top" style="width: 40px;height: 40px;"></label>
        </div>
        <div>
          <label><input type="checkbox" name="border-left" style="width: 40px;height: 40px;"></label>
          <label><input type="checkbox" name="border-right" style="width: 40px;height: 40px;"></label>
        </div>
        <div>
          <label><input type="checkbox" name="border-bottom" style="width: 40px;height: 40px;"></label>
        </div>
      </div>

      <div class="size" style="width: 100%">
        Width
        <input type="number" name="border-width">
      </div>
    `;
  },

  // border-width: 0;
  // border-top-width: 10px;
  // border-bottom-width: 10px;

  // getSliderEl() {
  //   if (!this.slider) {
  //     this.slider = this.el.querySelector('input[type=range]');
  //   }
  //
  //   return this.slider;
  // },

  inputValueChanged() {
    const model = this.model;

    var selected_view = window.editor.getSelected().view;

    var elem_model = selected_view.$el.data('model');

    var modelToStyle = selected_view.em
      .get('StyleManager')
      .getModelToStyle(elem_model);

    var style = modelToStyle.getStyle();

    style['border-width'] = 0;
    delete style['border-top-width'];
    delete style['border-right-width'];
    delete style['border-bottom-width'];
    delete style['border-left-width'];

    var width = (model.view.$el.find('[name=border-width]').val() || 0) + 'px';

    if (model.view.$el.find('[name=border-top]').val() == 'on') {
      style['border-top-width'] = width;
    } else {
      delete style['border-top-width'];
    }
    if (model.view.$el.find('[name=border-right]').val() == 'on') {
      style['border-right-width'] = width;
    } else {
      delete style['border-right-width'];
    }
    if (model.view.$el.find('[name=border-bottom]').val() == 'on') {
      style['border-bottom-width'] = width;
    } else {
      delete style['border-bottom-width'];
    }
    if (model.view.$el.find('[name=border-left]').val() == 'on') {
      style['border-left-width'] = width;
    } else {
      delete style['border-left-width'];
    }

    modelToStyle.setStyle(style, { avoidStore: 0 });

    // const step = model.get('step');
    // this.getInputEl().value = this.getSliderEl().value;
    // const value = this.getInputValue() - step;
    // model.set('value', value, { avoidStore: 1 }).set('value', value + step);
    // this.elementUpdated();
  },

  setValue(value) {
    // const model = this.model;
    // if (!window.editor || !window.editor.getSelected()) {
    //   return;
    // }
    // var selected_view = window.editor.getSelected().view;
    //
    // var elem_model = selected_view.$el.data('model');
    //
    // var modelToStyle = selected_view.em.get('StyleManager').getModelToStyle(elem_model)
    //
    // var style = modelToStyle.getStyle();
    //
    // alert(JSON.stringify(style))
    // this.getSliderEl().value = value;
    // this.inputInst.setValue(value, { silent: 1 });
  },

  onRender() {
    // window.editor.on('component:update:content', model => {
    //   alert(123);
    // })
    // style['border-width'] = 0;
    //
    // var width = (model.view.$el.find('[name=border-width]').val() || 0) + 'px';
    //
    // if (model.view.$el.find('[name=border-top]').val() == 'on') {
    //   style['border-top-width'] = width;
    // } else {
    //   delete style['border-top-width'];
    // }
    // if (model.view.$el.find('[name=border-right]').val() == 'on') {
    //   style['border-right-width'] = width;
    // } else {
    //   delete style['border-right-width'];
    // }
    // if (model.view.$el.find('[name=border-bottom]').val() == 'on') {
    //   style['border-bottom-width'] = width;
    // } else {
    //   delete style['border-bottom-width'];
    // }
    // if (model.view.$el.find('[name=border-left]').val() == 'on') {
    //   style['border-left-width'] = width;
    // } else {
    //   delete style['border-left-width'];
    // }
    //
    // modelToStyle.setStyle(style, {avoidStore: 0});
    // Property.prototype.onRender.apply(this, arguments);
    //
    // if (!this.model.get('showInput')) {
    //   this.inputInst.el.style.display = 'none';
    // }
  }
});
