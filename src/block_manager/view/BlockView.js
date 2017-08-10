var Backbone = require('backbone');

module.exports = Backbone.View.extend({

  events: {
    mousedown: 'onDrag',
    contextmenu: 'onRightClick',
  },

  onRightClick: function(event) {
    var that = this;
    event.preventDefault();
    var category = that.model.get('category').id;

    if (category === 'Custom Layouts') {    
      var result = confirm('Want to delete "' + that.model.get('label') + '" ?');
      if (result) {
        $.ajax({
          type: "POST",
          url: '/delete-layout',
          data: {
            id: that.model.id,
          },
          success: function(data) {
            editor.BlockManager.remove(that.model.id);
          }
        });
      }
    }
  },

  initialize(o, config) {
    _.bindAll(this, 'onDrop');
    this.config = config || {};
    this.ppfx = this.config.pStylePrefix || '';
    this.listenTo(this.model, 'destroy', this.remove);
    this.doc = $(document);
  },

  /**
   * Start block dragging
   * @private
   */
  onDrag(e) {
    //Right or middel click
    if (e.button !== 0) {
      return;
    }

    if(!this.config.getSorter) {
      return;
    }

    this.config.em.refreshCanvas();
    var sorter = this.config.getSorter();
    sorter.setDragHelper(this.el, e);
    sorter.startSort(this.el);
    sorter.setDropContent(this.model.get('content'));
    this.doc.on('mouseup', this.onDrop);
  },

  /**
   * Drop block
   * @private
   */
  onDrop() {
    this.doc.off('mouseup', this.onDrop);
    this.config.getSorter().endMove();
  },

  render() {
    var className = this.ppfx + 'block';
    this.$el.addClass(className);
    this.el.innerHTML = '<div class="' + className + '-label">' + this.model.get('label') + '</div>';
    return this;
  },

});
