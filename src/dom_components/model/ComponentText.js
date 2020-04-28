import Component from './Component';

export default Component.extend({
  defaults: {
    ...Component.prototype.defaults,
    type: 'text',
    droppable: false,
    editable: true
  },

  toHTML() {
    this.trigger('sync:content', { silent: 1 });
    return Component.prototype.toHTML.apply(this, arguments);
  },

  isComponent(el) {
    var result = '';

    if(['SPAN','P','P','H1','H2','H3','H4','H5'].indexOf(el.tagName) > -1){
        console.log('1111111111')
      result = {type: 'text'};
    }
    return result;
  }


});
