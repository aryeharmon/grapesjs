var assetTemplate = `
<form id="NewRegionForm">
  <div class="form-group">
    <input name="region_name" value="<%= name %>" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter region name">
  </div>
  
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
`;

module.exports = {

  template: _.template(assetTemplate),

  run(editor, sender, opts) {
    var opt = opts || {};
    // var config = editor.getConfig();
    var modal = editor.Modal;

    modal.setTitle(opt.modalTitle || 'Select a Region');

    var content = this.template({
      name: opts.target.get('name') || '',
    });


    modal.setContent(content);

    modal.open();


    $('#NewRegionForm').submit(function(e) {
        var name = $("#NewRegionForm").find('input[name=region_name]').val();
        opts.target.set('name', name);
        modal.close();
        e.preventDefault();
    });
  },
};
