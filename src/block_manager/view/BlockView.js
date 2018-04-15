import { isObject } from 'underscore';
import { on, off, hasDnd } from 'utils/mixins';

module.exports = Backbone.View.extend({
  events: {
    mousedown: 'startDrag',
    dblclick: 'test'
  },

  test: function(e) {
    $(this.$el.find('.dropdown')).toggle();
  },

  initialize(o, config = {}) {
    this.config = config;
    this.endDrag = this.endDrag.bind(this);
    this.ppfx = config.pStylePrefix || '';
    this.listenTo(this.model, 'destroy remove', this.remove);
  },

  /**
   * Start block dragging
   * @private
   */
  startDrag(e) {
    //Right or middel click
    if (e.button !== 0) {
      return;
    }

    if (!this.config.getSorter) {
      return;
    }

    var children = this.model.get('children');

    this.config.em.refreshCanvas();
    var sorter = this.config.getSorter();

    if (e.target.tagName === 'LI') {
      sorter.setDragHelper(e.target, e);
      sorter.setDropContent(children[$(e.target).data('id')].content);
    } else {
      sorter.setDragHelper(this.el, e);
      sorter.setDropContent(this.model.get('content'));
    }

    sorter.startSort(this.el);

    on(document, 'mouseup', this.endDrag);
  },

  /**
   * Drop block
   * @private
   */
  endDrag(e) {
    off(document, 'mouseup', this.endDrag);
    const sorter = this.config.getSorter();

    // After dropping the block in the canvas the mouseup event is not yet
    // triggerd on 'this.doc' and so clicking outside, the sorter, tries to move
    // things (throws false positives). As this method just need to drop away
    // the block helper I use the trick of 'moved = 0' to void those errors.
    sorter.moved = 0;
    sorter.endMove();
  },

  template: _.template(`
    <style>
      .dropdown {
        position: fixed;
        top: 40px;
        right: 253px;
        left: auto;
        width: 241px;
        z-index: 6666666;
        background: #f00b0b42;
      }
      .dropdown-item {
          display: block;
          width: 247px;
          height: 160px;
          margin-bottom: 10px;
          background-repeat: no-repeat;
          background-size: 100% 100%;
      }
    </style>
    <div class="<%= className %>-label" style="position: relative;">
      <% if (children.length > 0) { %>
      <div class="dropdown" style="display: none;">
        <ul style="padding: 0;list-style: none;height: 100%;overflow: scroll;">
          <% _.each(children, function(child, index){ %>
            <li data-id="<%= index %>"  class="dropdown-item" style="background-image:url(<%= child.img %>)"><%= child.name %></li>
          <% }); %>
        </ul>
      </div>
      <% } %>
      <%= label %>
    </div>
  `),

  render() {
    var children = this.model.get('children');

    var className = this.ppfx + 'block';
    this.$el.addClass(className);

    this.el.innerHTML = this.template({
      className: className,
      label: this.model.get('label'),
      children: children
    });

    return this;
  }
});
