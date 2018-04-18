var Component = require('./ComponentImage');
var OComponent = require('./Component');

module.exports = Component.extend(
  {
    defaults: _.extend({}, Component.prototype.defaults, {
      type: 'gragh',
      void: 0,
      mapUrl: 'https://maps.google.com/maps',
      tagName: 'div',
      mapType: 'q',
      address: '',
      zoom: '1',
      attributes: { frameborder: 0 },
      toolbar: OComponent.prototype.defaults.toolbar,
      traits: [
        // {
        //   label: 'Address',
        //   name: 'address',
        //   placeholder: 'eg. London, UK',
        //   changeProp: 1
        // },
        // {
        //   type: 'select',
        //   label: 'Map type',
        //   name: 'mapType',
        //   changeProp: 1,
        //   options: [
        //     { value: 'q', name: 'Roadmap' },
        //     { value: 'w', name: 'Satellite' }
        //   ]
        // },
        {
          type: 'color',
          label: 'Font Color',
          name: 'fontcolor'
          // changeProp: 1,
        },
        {
          type: 'text',
          label: 'fontfamily',
          name: 'fontfamily'
          // changeProp: 1,
        },
        {
          type: 'number',
          label: 'fontsize',
          name: 'fontsize'
          // changeProp: 1,
        },
        {
          type: 'color',
          label: 'blendedHueprogressioncolor1',
          name: 'blendedHueprogressioncolor1'
          // changeProp: 1,
        },
        {
          type: 'color',
          label: 'blendedhueprogressioncolor2',
          name: 'blendedhueprogressioncolor2'
          // changeProp: 1,
        },
        {
          type: 'color',
          label: 'defaultlinearcolorscalecolor1',
          name: 'defaultlinearcolorscalecolor1'
          // changeProp: 1,
        },
        {
          type: 'color',
          label: 'defaultlinearcolorscalecolor2',
          name: 'defaultlinearcolorscalecolor2'
          // changeProp: 1,
        },
        {
          type: 'color',
          label: 'defaultBackgroundfillcolor',
          name: 'defaultBackgroundfillcolor'
          // changeProp: 1,
        },
        {
          type: 'color',
          label: 'defaultBackgroundstroke',
          name: 'defaultBackgroundstroke'
          // changeProp: 1,
        },
        {
          type: 'text',
          label: 'defaultBackgroundcornertype',
          name: 'defaultBackgroundcornertype'
          // changeProp: 1,
        },
        {
          type: 'number',
          label: 'defaultBackgroundfillcorners',
          name: 'defaultBackgroundfillcorners'
          // changeProp: 1,
        },
        {
          type: 'color',
          label: 'defaulttooltiptitlefontColor',
          name: 'defaulttooltiptitlefontColor'
          // changeProp: 1,
        },
        {
          type: 'color',
          label: 'defaulttooltiptextfontColor',
          name: 'defaulttooltiptextfontColor'
          // changeProp: 1,
        },
        {
          type: 'number',
          label: 'defaulttooltipbackgroundcorners',
          name: 'defaulttooltipbackgroundcorners'
          // changeProp: 1,
        },
        {
          type: 'number',
          label: 'defaulttooltop',
          name: 'defaulttooltop'
          // changeProp: 1,
        },
        {
          type: 'number',
          label: 'defaulttoolright',
          name: 'defaulttoolright'
          // changeProp: 1,
        },
        {
          type: 'number',
          label: 'defaulttoolbottom',
          name: 'defaulttoolbottom'
          // changeProp: 1,
        },
        {
          type: 'number',
          label: 'defaulttoolleft',
          name: 'defaulttoolleft'
          // changeProp: 1,
        },
        {
          type: 'color',
          label: 'defaultcolorrangestrokecolor',
          name: 'defaultcolorrangestrokecolor'
          // changeProp: 1,
        },
        {
          type: 'color',
          label: 'defaultcolorrangeticksstrokecolor',
          name: 'defaultcolorrangeticksstrokecolor'
          // changeProp: 1,
        },
        {
          type: 'text',
          label: 'defaultcolorrangeticksposition',
          name: 'defaultcolorrangeticksposition'
          // changeProp: 1,
        },
        {
          type: 'color',
          label: 'defaultcolorrangetickslength',
          name: 'defaultcolorrangetickslength'
          // changeProp: 1,
        },
        {
          type: 'color',
          label: 'defaultcolorrangeminorticksstrokecolor',
          name: 'defaultcolorrangeminorticksstrokecolor'
          // changeProp: 1,
        },
        {
          type: 'text',
          label: 'defaultcolorrangeminorticksposition',
          name: 'defaultcolorrangeminorticksposition'
          // changeProp: 1,
        },
        {
          type: 'number',
          label: 'defaultcolorrangeminortickslength',
          name: 'defaultcolorrangeminortickslength'
          // changeProp: 1,
        },
        {
          type: 'number',
          label: 'defaultcolorrangemarkerpaddingtop',
          name: 'defaultcolorrangemarkerpaddingtop'
          // changeProp: 1,
        },
        {
          type: 'number',
          label: 'defaultcolorrangemarkerpaddingright',
          name: 'defaultcolorrangemarkerpaddingright'
          // changeProp: 1,
        },
        {
          type: 'number',
          label: 'defaultcolorrangemarkerpaddingbottom',
          name: 'defaultcolorrangemarkerpaddingbottom'
          // changeProp: 1,
        },
        {
          type: 'number',
          label: 'defaultcolorrangemarkerpaddingleft',
          name: 'defaultcolorrangemarkerpaddingleft'
          // changeProp: 1,
        },
        {
          type: 'color',
          label: 'defaultcolorrangemarkerfillcolor',
          name: 'defaultcolorrangemarkerfillcolor'
          // changeProp: 1,
        },
        {
          type: 'color',
          label: 'defaultscrollerfillcolor',
          name: 'defaultscrollerfillcolor'
          // changeProp: 1,
        },
        {
          type: 'color',
          label: 'defaultscrollerselectedfillcolor',
          name: 'defaultscrollerselectedfillcolor'
          // changeProp: 1,
        },
        {
          type: 'color',
          label: 'defaultscrollerthumbsfillcolor',
          name: 'defaultscrollerthumbsfillcolor'
          // changeProp: 1,
        },
        {
          type: 'color',
          label: 'defaultscrollerthumbsstrokecolor',
          name: 'defaultscrollerthumbsstrokecolor'
          // changeProp: 1,
        },
        {
          type: 'color',
          label: 'defaultscrollerthumbshoveredfillcolor',
          name: 'defaultscrollerthumbshoveredfillcolor'
          // changeProp: 1,
        },
        {
          type: 'color',
          label: 'defaultscrollerthumbshoveredstrokecolor',
          name: 'defaultscrollerthumbshoveredstrokecolor'
          // changeProp: 1,
        },
        {
          type: 'color',
          label: 'defaultlegendnormalstrokecolor',
          name: 'defaultlegendnormalstrokecolor'
          // changeProp: 1,
        },
        {
          type: 'color',
          label: 'defaultlegendnormalfillcolor',
          name: 'defaultlegendnormalfillcolor'
          // changeProp: 1,
        },
        {
          type: 'color',
          label: 'defaultlegendhoverstrokecolor',
          name: 'defaultlegendhoverstrokecolor'
          // changeProp: 1,
        },
        {
          type: 'color',
          label: 'defaultlegendhoverfillcolor',
          name: 'defaultlegendhoverfillcolor'
          // changeProp: 1,
        },
        {
          type: 'color',
          label: 'defaultlegendpushedstrokecolor',
          name: 'defaultlegendpushedstrokecolor'
          // changeProp: 1,
        },
        {
          type: 'color',
          label: 'defaultlegendpushedfillcolor',
          name: 'defaultlegendpushedfillcolor'
          // changeProp: 1,
        },
        {
          type: 'color',
          label: 'defaultlegenddisabledfillcolor',
          name: 'defaultlegenddisabledfillcolor'
          // changeProp: 1,
        }
        // {
        //   label: 'Zoom',
        //   name: 'zoom',
        //   type: 'range',
        //   min: '1',
        //   max: '20',
        //   changeProp: 1
        // }
      ]
    }),

    initialize(o, opt) {
      var that = this;

      Component.prototype.initialize.apply(this, arguments);

      window.ffff = this;

      this.set('fontcolor', this.attributes.attributes.fontcolor);
      this.set('fontfamily', this.attributes.attributes.fontcolor);
      this.set('fontsize', this.attributes.attributes.fontcolor);
      this.set(
        'blendedHueprogressioncolor1',
        this.attributes.attributes.fontcolor
      );
      this.set(
        'blendedhueprogressioncolor2',
        this.attributes.attributes.fontcolor
      );
      this.set(
        'defaultlinearcolorscalecolor1',
        this.attributes.attributes.fontcolor
      );
      this.set(
        'defaultlinearcolorscalecolor2',
        this.attributes.attributes.fontcolor
      );
      this.set(
        'defaultBackgroundfillcolor',
        this.attributes.attributes.fontcolor
      );
      this.set('defaultBackgroundstroke', this.attributes.attributes.fontcolor);
      this.set(
        'defaultBackgroundcornertype',
        this.attributes.attributes.fontcolor
      );
      this.set(
        'defaultBackgroundfillcorners',
        this.attributes.attributes.fontcolor
      );
      this.set(
        'defaulttooltiptitlefontColor',
        this.attributes.attributes.fontcolor
      );
      this.set(
        'defaulttooltiptextfontColor',
        this.attributes.attributes.fontcolor
      );
      this.set(
        'defaulttooltipbackgroundcorners',
        this.attributes.attributes.fontcolor
      );
      this.set('defaulttooltop', this.attributes.attributes.fontcolor);
      this.set('defaulttoolright', this.attributes.attributes.fontcolor);
      this.set('defaulttoolbottom', this.attributes.attributes.fontcolor);
      this.set('defaulttoolleft', this.attributes.attributes.fontcolor);
      this.set(
        'defaultcolorrangestrokecolor',
        this.attributes.attributes.fontcolor
      );
      this.set(
        'defaultcolorrangeticksstrokecolor',
        this.attributes.attributes.fontcolor
      );
      this.set(
        'defaultcolorrangeticksposition',
        this.attributes.attributes.fontcolor
      );
      this.set(
        'defaultcolorrangetickslength',
        this.attributes.attributes.fontcolor
      );
      this.set(
        'defaultcolorrangeminorticksstrokecolor',
        this.attributes.attributes.fontcolor
      );
      this.set(
        'defaultcolorrangeminorticksposition',
        this.attributes.attributes.fontcolor
      );
      this.set(
        'defaultcolorrangeminortickslength',
        this.attributes.attributes.fontcolor
      );
      this.set(
        'defaultcolorrangemarkerpaddingtop',
        this.attributes.attributes.fontcolor
      );
      this.set(
        'defaultcolorrangemarkerpaddingright',
        this.attributes.attributes.fontcolor
      );
      this.set(
        'defaultcolorrangemarkerpaddingbottom',
        this.attributes.attributes.fontcolor
      );
      this.set(
        'defaultcolorrangemarkerpaddingleft',
        this.attributes.attributes.fontcolor
      );
      this.set(
        'defaultcolorrangemarkerfillcolor',
        this.attributes.attributes.fontcolor
      );
      this.set(
        'defaultscrollerfillcolor',
        this.attributes.attributes.fontcolor
      );
      this.set(
        'defaultscrollerselectedfillcolor',
        this.attributes.attributes.fontcolor
      );
      this.set(
        'defaultscrollerthumbsfillcolor',
        this.attributes.attributes.fontcolor
      );
      this.set(
        'defaultscrollerthumbsstrokecolor',
        this.attributes.attributes.fontcolor
      );
      this.set(
        'defaultscrollerthumbshoveredfillcolor',
        this.attributes.attributes.fontcolor
      );
      this.set(
        'defaultscrollerthumbshoveredstrokecolor',
        this.attributes.attributes.fontcolor
      );
      this.set(
        'defaultlegendnormalstrokecolor',
        this.attributes.attributes.fontcolor
      );
      this.set(
        'defaultlegendnormalfillcolor',
        this.attributes.attributes.fontcolor
      );
      this.set(
        'defaultlegendhoverstrokecolor',
        this.attributes.attributes.fontcolor
      );
      this.set(
        'defaultlegendhoverfillcolor',
        this.attributes.attributes.fontcolor
      );
      this.set(
        'defaultlegendpushedstrokecolor',
        this.attributes.attributes.fontcolor
      );
      this.set(
        'defaultlegendpushedfillcolor',
        this.attributes.attributes.fontcolor
      );
      this.set(
        'defaultlegenddisabledfillcolor',
        this.attributes.attributes.fontcolor
      );

      setTimeout(function() {
        var data = [
          ['2004-01-02', 13.25, 13.31, 13.11, 13.14, 20719100],
          ['2004-01-05', 13.28, 13.56, 13.26, 13.55, 35303600],
          ['2004-01-06', 13.52, 13.71, 13.4, 13.6, 40102300],
          ['2004-01-07', 13.67, 13.99, 13.59, 13.97, 45144500],
          ['2004-01-08', 13.99, 14.38, 13.75, 14.24, 70729904],
          ['2004-01-09', 14.07, 14.36, 14, 14.17, 41084600],
          ['2004-01-12', 14.34, 15.51, 14.24, 14.66, 62697300],
          ['2004-01-13', 14.42, 14.48, 14.04, 14.36, 78349296],
          ['2004-01-14', 14.48, 14.67, 14.39, 14.59, 30544200],
          ['2004-01-15', 14.44, 14.98, 14.44, 14.89, 50435400],
          ['2004-01-16', 15.02, 15.03, 14.67, 14.85, 46804600],
          ['2004-01-20', 14.9, 14.97, 14.56, 14.71, 40741200],
          ['2004-01-21', 14.63, 14.92, 14.51, 14.71, 36799000],
          ['2004-01-22', 14.8, 14.91, 14.42, 14.53, 34467800],
          ['2004-01-23', 14.55, 14.67, 14.35, 14.54, 28788600],
          ['2004-01-26', 14.46, 14.54, 14.28, 14.47, 33778900],
          ['2004-01-27', 14.37, 14.68, 14.18, 14.2, 32494900],
          ['2004-01-28', 14.3, 14.4, 13.86, 13.94, 44854200],
          ['2004-01-29', 14.04, 14.22, 13.73, 14.19, 50153700],
          ['2004-01-30', 14.09, 14.3, 13.78, 13.86, 45126700],
          ['2004-02-02', 13.77, 13.9, 13.51, 13.64, 41958400],
          ['2004-02-03', 13.58, 13.99, 13.52, 13.91, 32302400],
          ['2004-02-04', 13.19, 13.69, 13.12, 13.27, 47086400],
          ['2004-02-05', 13.44, 13.77, 13.32, 13.56, 39729800],
          ['2004-02-06', 13.55, 13.76, 13.36, 13.42, 41294000],
          ['2004-02-09', 13.52, 13.63, 13.25, 13.28, 33215800],
          ['2004-02-10', 13.27, 13.53, 13.26, 13.39, 30343900],
          ['2004-02-11', 13.51, 13.79, 13.33, 13.7, 38711400],
          ['2004-02-12', 13.63, 13.85, 13.51, 13.72, 27978900],
          ['2004-02-13', 13.79, 14.1, 13.66, 13.79, 41834100]
        ];

        var iframe = window.$('.gjs-frame')[0];
        var innerDoc = iframe.contentDocument || iframe.contentWindow.document;

        that.listenTo(that, 'change:attributes', function() {
          // alert(555);
          iframe.contentWindow.test(data);
        });

        iframe.contentWindow.test(data);
      }, 3000);
    }
  },
  {
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
      if (el.id == 'container') {
        result = { type: 'gragh' };
      }
      return result;
    }
  }
);
