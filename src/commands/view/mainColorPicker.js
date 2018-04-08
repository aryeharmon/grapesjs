var parse_str = require('locutus/php/strings/parse_str');
require('utils/ColorPicker');

module.exports = {
  template: `
    <% _(styles).each(function(style, property) { %>
      <div>
        <label><strong><%= property %></strong></label> <input class='colorpicker' data-property='<%= property %>' data-color="<%= style %>" name="<%= property %>"/>
        <textarea onchange="editor_settings.colors['<%= property %>'] = $(this).val()" id="Comment<%= property %>"><% if(editor_settings && editor_settings.colors && editor_settings.colors[property]) { %><%= editor_settings.colors[property] %><% } %></textarea>
      </div>
    <% }) %>
    <div>
      <label><strong>Add Color</strong></label> <input type="text" class="new-color" name="new_color"/> <button class="new-color-submit">Add Color</button>
    </div>
  `,
  run(editor, sender) {
    var that = this;

    this.render(editor);

    // alert(editor.trigger);
  },
  render(editor) {
    var that = this;

    window.editor_settings.colors = window.editor_settings.colors || {};

    var template = _.template(that.template);

    for (var i = 0; i < editor.CssComposer.getAll().models.length; i++) {
        if (editor.CssComposer.getAll().models[i].attributes.selectorsAdd === ':root') {
            var root_style = editor.CssComposer.getAll().models[i];
        }
    }

    this.modal = editor.Modal || null;
    this.modal.setTitle('Color Manager');

    this.modal.setContent(template({
      styles: root_style.attributes.style,
      editor_settings: editor_settings,
    }));

    function setValue(that, color) {
      var property = $(that).data('property');

      root_style.attributes.style[property] = color;
      root_style.setStyle(root_style.attributes.style, {});

      var iframe = window.$('.gjs-frame')[0];
      var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
      // innerDoc.documentElement.style.setProperty('--hello', color);
      innerDoc.documentElement.style.setProperty(property, color);
    }

    $(".colorpicker").each(function() {
      var that = this;

      $(this).spectrum({
        color: $(this).data('color'),
        preferredFormat: "hex",
        showInput: true,
        showPalette: true,
        move: function(color) {
          setValue(that, color);
        },
        change: function(color) {
          setValue(that, color);
        },
        show: function(color) {
          setValue(that, color);
        },
        hide: function(color) {
          setValue(that, color);
        },
      });
    });

    $('.new-color-submit').click(function() {
      var name = $('.new-color').val();
      if (name) {
        root_style.attributes.style['--' + name] = undefined;
        root_style.setStyle(root_style.attributes.style, {});
        that.render(editor);
      }
    })

    this.modal.open();
  },
};
