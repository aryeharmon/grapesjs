module.exports = require('./PropertyView').extend({

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
    var pfx  = this.pfx;
    const model = this.model;
    const options = model.get('list') || model.get('options') || [];

    if (!this.$input) {
      let optionsStr = '';

<<<<<<< HEAD
      if (this.list && this.list.length) {
        _.each(this.list, el => {
          console.log(el, 676666666666);
          var name = el.name ? el.name : el.value;
          var style = el.style ? el.style.replace(/"/g,'&quot;') : '';
          var styleAttr = style ? 'style="' + style + '"' : '';
          input += '<option value="'+el.value.replace(/"/g,'&quot;')+'" ' + styleAttr + '>'+name+'</option>';
        });
      }
=======
      options.forEach(option => {
        let name = option.name || option.value;
        let style = option.style ? option.style.replace(/"/g,'&quot;') : '';
        let styleAttr = style ? `style="${style}"` : '';
        let value = option.value.replace(/"/g,'&quot;');
        optionsStr += `<option value="${value}" ${styleAttr}>${name}</option>`;
      });
>>>>>>> 010f98a7920e532e66939288c4be8e5aa780c273

      this.$input = $(`<select>${optionsStr}</select>`);
      this.input = this.$input.get(0);
      this.$el.find(`#${pfx}input-holder`).html(this.$input);
    }
  },

});
