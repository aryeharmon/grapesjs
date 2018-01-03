var Backbone = require('backbone');
var ClassTagView = require('./ClassTagView');

module.exports = Backbone.View.extend({
  template: _.template(`
  <div id="<%= pfx %>up">
    <div id="<%= pfx %>label"><%= label %></div>
    <div id="<%= pfx %>status-c">
      <span id="<%= pfx %>input-c">
        <div class="<%= ppfx %>field <%= ppfx %>select">
          <span id="<%= ppfx %>input-holder">
            <select id="<%= pfx %>states">
              <option value=""><%= statesLabel %></option>
            </select>
          </span>
          <div class="<%= ppfx %>sel-arrow">
            <div class="<%= ppfx %>d-s-arrow"></div>
          </div>
        </div>
      </span>
    </div>
  </div>
  <div id="<%= pfx %>tags-field" class="<%= ppfx %>field">
    <div id="<%= pfx %>tags-c"></div>
    <input id="<%= pfx %>new" />
    <span id="<%= pfx %>add-tag" class="fa fa-plus"></span>
  </div>
  <div id="<%= pfx %>sel-help">
    <div id="<%= pfx %>label"><%= selectedLabel %></div>
    <div id="<%= pfx %>sel"></div>
    <div style="clear:both"></div>
  </div>
  <div>
    <ul class="css-rule-list">
      <li>123</li>
    </ul>
  <div>
  `),

  events: {},

  initialize(o = {}) {
    this.config = o.config || {};
    this.pfx = this.config.stylePrefix || '';
    this.ppfx = this.config.pStylePrefix || '';
    this.className = this.pfx + 'tags';
    this.addBtnId = this.pfx + 'add-tag';
    this.newInputId = this.pfx + 'new';
    this.stateInputId = this.pfx + 'states';
    this.stateInputC = this.pfx + 'input-c';
    this.states = this.config.states || [];
    this.events['click #' + this.addBtnId] = 'startNewTag';
    this.events['blur #' + this.newInputId] = 'endNewTag';
    this.events['keyup #' + this.newInputId] = 'onInputKeyUp';
    this.events['change #' + this.stateInputId] = 'stateChanged';

    this.target = this.config.em;
    this.em = this.target;

    this.listenTo(this.target ,'change:selectedComponent',this.componentChanged);
    this.listenTo(this.target, 'targetClassUpdated', this.updateSelector);

    this.listenTo(this.collection, 'add', this.addNew);
    this.listenTo(this.collection, 'reset', this.renderClasses);
    this.listenTo(this.collection, 'remove', this.tagRemoved);

    this.delegateEvents();
  },

  /**
   * Triggered when a tag is removed from collection
   * @param {Object} model Removed model
   * @private
   */
  tagRemoved(model) {
    this.updateStateVis();
  },

  /**
   * Create select input with states
   * @return {string} String of options
   * @private
   */
  getStateOptions() {
    var strInput = '';
    for(var i = 0; i < this.states.length; i++){
      strInput += '<option value="' + this.states[i].name + '">' + this.states[i].label + '</option>';
    }
    return strInput;
  },

  /**
   * Add new model
   * @param {Object} model
   * @private
   */
  addNew(model) {
    this.addToClasses(model);
  },

  /**
   * Start tag creation
   * @param {Object} e
   * @private
   */
  startNewTag(e) {
    this.$addBtn.get(0).style.display = 'none';
    this.$input.show().focus();
  },

  /**
   * End tag creation
   * @param {Object} e
   * @private
   */
  endNewTag(e) {
    this.$addBtn.get(0).style.display = '';
    this.$input.hide().val('');
  },

  /**
   * Checks what to do on keyup event
   * @param  {Object} e
   * @private
   */
  onInputKeyUp(e) {
    if (e.keyCode === 13)
      this.addNewTag(this.$input.val());
    else if(e.keyCode === 27)
      this.endNewTag();
  },

  /**
   * Triggered when component is changed
   * @param  {Object} e
   * @private
   */
  componentChanged(e) {
    this.compTarget = this.target.get('selectedComponent');
    const target = this.compTarget;
    let validSelectors = [];

    // aryeh edit
    function css(a) {
        var iframe = window.$('.gjs-frame')[0];
        var innerDoc = iframe.contentDocument || iframe.contentWindow.document;

        var sheets = innerDoc.styleSheets, o = [];
        a.matches = a.matches || a.webkitMatchesSelector || a.mozMatchesSelector || a.msMatchesSelector || a.oMatchesSelector;
        for (var i in sheets) {
            var rules = sheets[i].rules || sheets[i].cssRules;
            for (var r in rules) {
                if (a.matches(rules[r].selectorText)) {
                    o.push(rules[r].cssText.split('{')[0].trim());
                }
            }
        }
        return o;
    } 
    window.aryeh = target;
    var styles = css(target.view.el);
    $('.css-rule-list').html('');
    for (var n = 0; n < styles.length; n++) {
      if (styles[n].indexOf('*') === -1) {
        if (styles[n].indexOf('gjs') === -1) {
          $('.css-rule-list').append('<li><button data-rule="'+ styles[n] +'">'+ styles[n] +'</button></li>');
        }
      }
    }

    $('.css-rule-list button').click(function() {
      var $el = $(this);
      

      if ($el.hasClass('selected')) {
        $('.css-rule-list button').removeClass('selected');
        window.editor.pt.model = window.editor.old_model;
        window.editor.pt.trigger('update');
      } else {
        $('.css-rule-list button').removeClass('selected');
        $el.addClass('selected');

        window.editor.old_model = editor.pt.model;
        window.editor.pt.model = editor.CssComposer.getBySelectorsAdd($el.data('rule'));
        window.editor.pt.trigger('update');
      }

    });
    // end aryeh edit

    if (target) {
      this.getStates().val(target.get('state'));
      validSelectors = target.get('classes').getValid();
    }

    this.collection.reset(validSelectors);
    this.updateStateVis();
  },

  /**
   * Update states visibility. Hides states in case there is no tags
   * inside collection
   * @private
   */
  updateStateVis() {
    const em = this.em;
    const avoidInline = em && em.getConfig('avoidInlineStyle');

    if(this.collection.length || avoidInline)
      this.getStatesC().css('display','block');
    else
      this.getStatesC().css('display','none');
    this.updateSelector();
  },


  /**
   * Udpate selector helper
   * @return {this}
   * @private
   */
  updateSelector() {
    const selected = this.target.getSelected();
    this.compTarget = selected;

    if (!selected || !selected.get) {
      return;
    }

    const state = selected.get('state');
    let result = this.collection.getFullString();
    result = result || `#${selected.getId()}`;
    result += state ? `:${state}` : '';
    const el = this.el.querySelector('#' + this.pfx + 'sel');
    el && (el.innerHTML = result);
  },


  /**
   * Triggered when the select with states is changed
   * @param  {Object} e
   * @private
   */
  stateChanged(e) {
    if(this.compTarget){
      this.compTarget.set('state', this.$states.val());
      if(this.target)
        this.target.trigger('targetStateUpdated');
      this.updateSelector();
    }
  },

  /**
   * Add new tag to collection, if possible, and to the component
   * @param  {Object} e
   * @private
   */
  addNewTag(label) {
    const target = this.target;
    const component = this.compTarget;

    if (!label.trim()) {
      return;
    }

    if (target) {
      const sm = target.get('SelectorManager');
      var model = sm.add({label});

      if (component) {
        var compCls = component.get('classes');
        var lenB = compCls.length;
        compCls.add(model);
        var lenA = compCls.length;
        this.collection.add(model);

        if (lenA > lenB) {
          target.trigger('targetClassAdded');
        }

        this.updateStateVis();
      }
    }
    this.endNewTag();
  },

  /**
   * Add new object to collection
   * @param   {Object} model  Model
   * @param   {Object} fragmentEl   Fragment collection
   * @return {Object} Object created
   * @private
   * */
  addToClasses(model, fragmentEl) {
    var fragment  = fragmentEl || null;

    var view = new ClassTagView({
        model,
        config: this.config,
        coll: this.collection,
    });
    var rendered  = view.render().el;

    if(fragment)
      fragment.appendChild(rendered);
    else
      this.getClasses().append(rendered);

    return rendered;
  },

  /**
   * Render the collection of classes
   * @return {this}
   * @private
   */
  renderClasses() {
    var fragment = document.createDocumentFragment();

    this.collection.each(function(model){
      this.addToClasses(model, fragment);
    },this);

    if(this.getClasses())
      this.getClasses().empty().append(fragment);

    return this;
  },

  /**
   * Return classes element
   * @return {HTMLElement}
   * @private
   */
  getClasses() {
    if(!this.$classes)
      this.$classes = this.$el.find('#' + this.pfx + 'tags-c');
    return this.$classes;
  },

  /**
   * Return states element
   * @return {HTMLElement}
   * @private
   */
  getStates() {
    if(!this.$states)
      this.$states = this.$el.find('#' + this.stateInputId);
    return this.$states;
  },

  /**
   * Return states container element
   * @return {HTMLElement}
   * @private
   */
  getStatesC() {
    if(!this.$statesC)
      this.$statesC = this.$el.find('#' + this.stateInputC);
    return this.$statesC;
  },

  render() {
    const config = this.config;
    this.$el.html(this.template({
      selectedLabel: config.selectedLabel,
      statesLabel: config.statesLabel,
      label: config.label,
      pfx: this.pfx,
      ppfx: this.ppfx,
    }));
  
    this.$input = this.$el.find('input#' + this.newInputId);
    this.$addBtn = this.$el.find('#' + this.addBtnId);
    this.$classes = this.$el.find('#' + this.pfx + 'tags-c');
    this.$states = this.$el.find('#' + this.stateInputId);
    this.$statesC = this.$el.find('#' + this.stateInputC);
    this.$states.append(this.getStateOptions());
    this.renderClasses();
    this.$el.attr('class', this.className);
    return this;
  },

});
