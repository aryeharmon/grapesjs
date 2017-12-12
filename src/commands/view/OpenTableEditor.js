var assetTemplate = `
<form id="TableEdit">
  
  <strong>Desktop</strong>

  
  <input name="in" class="in" value="<%= data_in %>">
  <input name="repeat" class="repeat" value="<%= repeat %>">

  <table width="100">
    <tr>
      <td>Column #</strong></td>
      <td><strong>Rank</strong></td>
      <td><strong>Name</strong></td>
      <td><strong>Content</strong></td>
      <td><strong>Width</strong></td>
      <td><strong>Actuons</strong></td>
    </tr>
    <% _.each(columns, function(col, index) { %> 
    <tr data-row="<%= index %>">
      <td><%= index + 1 %></td>
      <td>
        <select name="rank[<%= index %>]">
          <option <%= col.rank == '1' ? 'selected="selected"' : '' %>>1</option>
          <option <%= col.rank == '2' ? 'selected="selected"' : '' %>>2</option>
          <option <%= col.rank == '3' ? 'selected="selected"' : '' %>>3</option>
          <option <%= col.rank == '4' ? 'selected="selected"' : '' %>>4</option>
        </select>
      </td>
      <td>
        <input name="name[<%= index %>]" value="<%= col.name %>">
      </td>
      <td>
        <textarea name="content[<%= index %>]"><%= col.content %></textarea>
      </td>
      <td>
        <input type="number" name="width[<%= index %>]" value="<%= col.width %>">
      </td>
      <td>
        <button type="button" class="remove-col" data-index="<%= index %>">Remove</button>
      </td>
    </tr>
    <% }); %>
  </table>

  <button id="addColBtn" type="button" class="btn btn-primary">Add Column</button>
  <button id="addTableBtn" type="button" class="submitTable btn btn-primary">Submit</button>
</form>
`;

module.exports = {

  template: _.template(assetTemplate),

  run(editor, sender, opts) {
    var that = this;
    that.opt = opts || {};

    // var config = editor.getConfig();
    that.modal = editor.Modal;

    that.modal.setTitle(that.opt.modalTitle || 'Table Editor');

    var cols = atob(that.opt.target.get('attributes').datatable)

    that.columns = cols ? JSON.parse(cols) : [{}];

    var content = this.template({
      columns: that.columns,
      repeat: that.opt.target.get('attributes').repeat,
      data_in: that.opt.target.get('attributes').in,
    });

    that.modal.setContent(content);

    that.modal.open();

    that.events();
  },
  events: function() {
    var that = this;

    $('#addColBtn').click(function(e) {
      that.mapColumn();

      setTimeout(function() {      
        that.columns.push({});

        var content = that.template({
          columns: that.columns,
          repeat: $('#TableEdit .repeat').val(),
          data_in: $('#TableEdit .in').val(),
        });

        that.modal.setContent(content);

        that.events();
      }, 0);
    });

    $('.remove-col').click(function(e) {
      var j = $(this);
      that.mapColumn();

      setTimeout(function() { 
        that.columns.splice(parseInt(j.data('index')), 1);

        var content = that.template({
          columns: that.columns,
          repeat: $('#TableEdit .repeat').val(),
          data_in: $('#TableEdit .in').val(),
        });

        that.modal.setContent(content);

        that.events();
      }, 1);
    });

    // alert(that.opt.target.get('datatable'));

    $('#addTableBtn').click(function(e) {
      that.mapColumn();
      setTimeout(function() { 
        that.opt.target.get('attributes').datatable = btoa(JSON.stringify(that.columns));
        that.opt.target.get('attributes').repeat = $('#TableEdit .repeat').val();
        that.opt.target.get('attributes').in = $('#TableEdit .in').val();
        e.preventDefault();
        that.modal.close();
      }, 1);
    });
  },
  mapColumn: function() {
    var that = this;
    var form = $.extend({}, $('#TableEdit').serializeArray());

    var fields = {};

    for (var n in form) {
      fields[form[n].name] = form[n].value;
    }

    for (var n = 0; n < that.columns.length; n++) {
      var col = that.columns[n];

      col.rank = fields['rank[' + n + ']'];
      col.width = fields['width[' + n + ']'];
      col.content = fields['content[' + n + ']'];
      col.name = fields['name[' + n + ']'];
    }
  },
};
