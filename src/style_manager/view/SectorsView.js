import Backbone from 'backbone';
import { extend, isString } from 'underscore';
import { isTaggableNode } from 'utils/mixins';
import { appendAtIndex } from 'utils/dom';
import SectorView from './SectorView';

export default Backbone.View.extend({
  initialize(o = {}) {
    const config = o.config || {};
    this.pfx = config.stylePrefix || '';
    this.ppfx = config.pStylePrefix || '';
    this.target = o.target || {};
    this.config = config;

    // The target that will emit events for properties
    const target = {};
    extend(target, Backbone.Events);
    const body = document.body;
    const dummy = document.createElement(`el-${new Date().getTime()}`);
    body.appendChild(dummy);
    target.computedDefault = { ...window.getComputedStyle(dummy) };
    body.removeChild(dummy);
    this.propTarget = target;
    const coll = this.collection;
    const events =
      'component:toggled component:update:classes component:update:state change:device';
    this.listenTo(coll, 'add', this.addTo);
    this.listenTo(coll, 'reset', this.render);
    this.listenTo(this.target, events, this.targetUpdated);
  },

  /**
   * Add to collection
   * @param {Object} model Model
   * @return {Object}
   * @private
   * */
  addTo(model, coll, opts = {}) {
    this.addToCollection(model, null, opts);
  },

  /**
   * Fired when target is updated
   * @private
   */
  targetUpdated() {
    const em = this.target;
    const pt = this.propTarget;
    let model = em.getSelected();
    if (!model) return;

    // aryeh edits
    editor.pt = pt;
    // var iContainer = cc.getBySelectorsAdd('.table-build th');

    const config = em.get('Config');
    const state = !config.devicePreviewMode ? model.get('state') : '';
    const el = model.getEl();
    pt.helper = null;

    // Create computed style container
    if (el && isTaggableNode(el)) {
      const stateStr = state ? `:${state}` : null;
      pt.computed = window.getComputedStyle(el, stateStr);
    }

    // Create a new rule for the state as a helper
    const appendStateRule = (style = {}) => {
      const cc = em.get('CssComposer');
      const helperCls = 'hc-state';
      const rules = cc.getAll();
      let helperRule = cc.getClassRule(helperCls);

      if (!helperRule) {
        helperRule = cc.setClassRule(helperCls);
      } else {
        // I will make it last again, otherwise it could be overridden
        const rules = cc.getAll();
        rules.remove(helperRule);
        rules.add(helperRule);
      }

      helperRule.set('important', 1);
      helperRule.setStyle(style);
      pt.helper = helperRule;
    };

    model = em.get('StyleManager').getModelToStyle(model);
    state && appendStateRule(model.getStyle());
    pt.model = model;
    pt.trigger('update');
  },

  /**
   * Select different target for the Style Manager.
   * It could be a Component, CSSRule, or a string of any CSS selector
   * @param {Component|CSSRule|String} target
   * @return {Styleable} A Component or CSSRule
   */
  setTarget(target, opts = {}) {
    const em = this.target;
    const config = em.get('Config');
    const { targetIsClass, stylable } = opts;
    let model = target;

    if (isString(target)) {
      let rule;
      const rules = em.get('CssComposer').getAll();

      if (targetIsClass) {
        rule = rules.filter(
          rule => rule.get('selectors').getFullString() === target
        )[0];
      }

      if (!rule) {
        rule = rules.filter(rule => rule.get('selectorsAdd') === target)[0];
      }

      if (!rule) {
        rule = rules.add({ selectors: [], selectorsAdd: target });
      }

      stylable && rule.set({ stylable });
      model = rule;
    }

    const state = !config.devicePreviewMode ? model.get('state') : '';
    const pt = this.propTarget;
    pt.model = model;
    pt.trigger('styleManager:update', model);
    return model;
  },

  /**
   * Add new object to collection
   * @param {Object} model Model
   * @param  {Object} fragmentEl collection
   * @return {Object} Object created
   * @private
   * */
  addToCollection(model, fragmentEl, opts = {}) {
    const { pfx, target, propTarget, config, el } = this;
    const appendTo = fragmentEl || el;
    const rendered = new SectorView({
      model,
      id: `${pfx}${model.get('id')}`,
      name: model.get('name'),
      properties: model.get('properties'),
      target,
      propTarget,
      config
    }).render().el;
    appendAtIndex(appendTo, rendered, opts.at);

    return rendered;
  },

  render() {
    const frag = document.createDocumentFragment();
    const $el = this.$el;
    const pfx = this.pfx;
    const ppfx = this.ppfx;
    $el.empty();
    this.collection.each(model => this.addToCollection(model, frag));
    $el.append(frag);
    $el.addClass(`${pfx}sectors ${ppfx}one-bg ${ppfx}two-color`);
    return this;
  }
});
