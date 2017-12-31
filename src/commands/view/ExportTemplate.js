const $ = Backbone.$;

module.exports = {

  run(editor, sender, opts = {}) {
    sender && sender.set && sender.set('active', 0);
    const config = editor.getConfig();
    const modal = editor.Modal;
    const pfx = config.stylePrefix;
    this.cm = editor.CodeManager || null;


    if (!this.$editors) {
      const oHtmlEd = this.buildEditor('htmlmixed', 'hopscotch', 'HTML');
      const oCsslEd = this.buildEditor('css', 'hopscotch', 'CSS');
      this.htmlEditor = oHtmlEd.el;
      this.cssEditor = oCsslEd.el;
      const $editors = $(`<div class="${pfx}export-dl"></div>`);
      $editors.append(oHtmlEd.$el).append(oCsslEd.$el);
      this.$editors = $editors;
    }

    modal.setTitle(config.textViewCode);
    modal.setContent(this.$editors);
    modal.open();
    this.htmlEditor.setContent(editor.getHtml());
    this.cssEditor.setContent(editor.getCss());

    var data = {
      css: editor.getCss(),
      html: editor.getHtml(),
      _id: window.page ? window.page._id : 'ggggggg',
    }
    
    window.$.ajax({
      type: "POST",
      url: base_url + '/storage/html',
      data: data,
      success: function(data) {
        console.log('saved template.')
      },
      dataType: 'json'
    });

  },

  stop(editor) {
    const modal = editor.Modal;
    modal && modal.close();
  },

  buildEditor(codeName, theme, label) {
    const input = document.createElement('textarea');
    !this.codeMirror && (this.codeMirror = this.cm.getViewer('CodeMirror'));

    const el = this.codeMirror.clone().set({
      label,
      codeName,
      theme,
      input,
    });

    const $el = new this.cm.EditorView({
      model: el,
      config: this.cm.getConfig()
    }).render().$el;

    el.init(input);

    return { el, $el };
  },
};
