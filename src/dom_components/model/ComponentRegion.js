import Component from './Component';
window.aaaaaaaaaaaa = Component;
module.exports = Component.extend({

  defaults: _.extend({}, Component.prototype.defaults, {
    type: 'region',
    // tagName: 'region',
    name: '',
    // void: 1,
    droppable: true,
    resizable: true,
    // traits: [{"type":"name","label":"Name","name":"name","default":"dddd","value":"ddd"}]
  }),

  initialize(o, opt) {
    Component.prototype.initialize.apply(this, arguments);
    var attr = this.get('attributes');
    if(attr.name)
      this.set('name', attr.name);
  },

  initToolbar(...args) {
    Component.prototype.initToolbar.apply(this, args);

    if (this.sm && this.sm.get) {
      var cmd = this.sm.get('Commands');
      var cmdName = 'image-editor';

      // Add Image Editor button only if the default command exists
      if (cmd.has(cmdName)) {
        var tb = this.get('toolbar');
        tb.push({
          attributes: {class: 'fa fa-pencil'},
          command: cmdName,
        });
        this.set('toolbar', tb);
      }
    }
  },

  /**
   * Returns object of attributes for HTML
   * @return {Object}
   * @private
   */
  getAttrToHTML(...args) {
    var attr = Component.prototype.getAttrToHTML.apply(this, args);
    delete attr.onmousedown;
    var name = this.get('name');
    // attr.class = 'region';
    // attr.id = 'region';

    if(name) {
      attr.name = name;
      // attr.class += " " + name;
    }
    return attr;
  },

  /**
   * Parse uri
   * @param  {string} uri
   * @return {object}
   * @private
   */
  parseUri(uri) {
    var el = document.createElement('a');
    el.href = uri;
    var query = {};
    var qrs = el.search.substring(1).split('&');
    for (var i = 0; i < qrs.length; i++) {
      var pair = qrs[i].split('=');
      var name = decodeURIComponent(pair[0]);
      if(name)
        query[name] = decodeURIComponent(pair[1]);
    }
    return {
      hostname: el.hostname,
      pathname: el.pathname,
      protocol: el.protocol,
      search: el.search,
      hash: el.hash,
      port: el.port,
      query,
    };
  },

},{

  /**
   * Detect if the passed element is a valid component.
   * In case the element is valid an object abstracted
   * from the element will be returned
   * @param {HTMLElement}
   * @return {Object}
   * @private
   */
  isComponent(el) {
    var result = '';

    if(el.tagName == 'REGION' || $(el).attr('region')){
	console.log('got here')
      result = {type: 'region'};
    }
    return result;
  },

});
