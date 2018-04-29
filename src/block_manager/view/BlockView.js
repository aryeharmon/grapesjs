import { isObject } from 'underscore';
import { on, off, hasDnd } from 'utils/mixins';

module.exports = Backbone.View.extend({
  events: {
    mousedown: 'startDrag',
    dblclick: 'test'
  },

  test: function(e) {
    var that = this;
    $(that.$el.find('.dropdown')).toggle();

    var event = function() {
      $(that.$el.find('.dropdown')).toggle();
      $(that.$el.find('.dropdown .close')).off('click', event);
    };

    $(that.$el.find('.dropdown .close')).on('click', event);
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

      if (window.allow_input_layout) {
        sorter.setDropContent(children[$(e.target).data('id')].content);
      } else {
        sorter.setDropContent(
          children[$(e.target).data('id')].content.replace(
            /data-layout="\d+"/,
            ''
          )
        );
      }
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
        overflow-y: scroll;
        max-height: 100%;
      }
      .dropdown-item {
          display: block;
          margin-bottom: 10px;
          background-repeat: no-repeat;
          background-size: contain;
      }
      .close {
        font-size: 44px;
        display: inline;
        cursor: pointer;
      }
    </style>
    <div class="<%= className %>-label" style="position: relative;">
      <% if (children.length > 0) { %>
      <div class="dropdown" style="display: none;">
        <div class="close">x</div>
        <ul style="padding: 0;list-style: none;height: 100%;overflow: scroll;">
          <% _.each(children, function(child, index){ %>
            <li data-id="<%= index %>"  class="dropdown-item" style="background-image:url(<%= child.img %>)"><%= child.name %><img src="<%= child.img %>" style="visibility: hidden;    width: 100%;" /></li>
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
