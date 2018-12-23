var assetTemplate = `
<form id="TableEdit">

  <strong>Desktop</strong>

  <div>
  repeat: <input name="repeat" class="repeat" value="<%= repeat %>" placeholder="repeat">
  </div>
  <div>
  in: <input name="in" class="in" value="<%= data_in %>" placefolder="in">
  </div>

  <div>
  ng_click: <input name="ng_click" class="ng-click" value="<%= ng_click %>" placefolder="ng click">
  </div>
  <div>
  ng_if: <input name="ng_if" class="ng-if" value="<%= ng_if %>" placefolder="ng if">
  </div>
  <div>
  ng-class: <input name="ng_class" class="ng-class" value="<%= ng_class %>" placefolder="ng class">
  </div>
  <div>
  Has search: <input type="checkbox" name="has_search" class="has-search"<% if (has_search == 'true') { %> checked="checked"<% } %>>
  </div>
  <div>
  search-class: <input name="search_class" class="search-class" value="<%= search_class %>" placefolder="search class">
  </div>
  <div>
  Has pagination: <input type="checkbox" name="has_pagination" class="has-pagination" <% if (has_pagination == 'true') { %> checked="checked"<% } %>>
  </div>
  <div>
  pagination-class: <input name="pagination_class" class="pagination-class" value="<%= pagination_class %>" placefolder="pagination class">
  </div>
  <div>
  pagination-per-page: <input name="pagination_per_page" type="number" class="pagination-per-page" value="<%= pagination_per_page %>" placefolder="10">
  </div>
  <div>
  API exist : <input type="checkbox" name="api-exist" class="api-exist" <% if (api_exist == 'true') { %> checked="checked"<% } %>>
  </div>
    <div id="api_div" <% if (api_exist == 'false') { %> hidden <% } %>>
        <div>
        API URL : <input name="api_url" class="api-url" placeholder="api url" value="<%= api_url %>">
        </div>
        <div>
        API Methods : <select name="api_method" class="api-method">
                          <option value="get" <%= api_method == "get" ? 'selected="selected"' : '' %>>GET</option>
                          <option value="post" <%= api_method == "post" ? 'selected="selected"' : '' %>>POST</option>
                      </select>
        </div>
        API Params :
        <table id="api_table" width="100">
          <tr>
            <td><strong>Key</strong></td>
            <td><strong>Value</strong></td>
            <td><strong>Default Value</strong></td>
          </tr>
        <% _.each(api_params, function(col, index) { %>
          <tr data-row="<%= index %>">
            <td><input name="param_key[<%= index %>]"  placeholder="param key" value="<%= col.param_key %>"></td>
            <td><input name="param_value[<%= index %>]"  placeholder="param value" value="<%= col.param_value %>"></td>
            <td><input name="param_default[<%= index %>]"  placeholder="default value" value="<%= col.param_default %>"></td>
            <td>
              <button type="button" class="remove-param" data-index="<%= index %>">Remove</button>
            </td>
          <tr>
        <% }); %>
          </table>
          <button id="addParamBtn" type="button" class="btn btn-primary">Add Param</button>
    </div>



  <table width="100">
    <tr>
      <td>Column #</strong></td>
      <td><strong>Rank</strong></td>
      <td><strong>Name</strong></td>
      <td><strong>Content</strong></td>
      <td><strong>Editor View</strong></td>
      <td><strong>Width</strong></td>
      <td><strong>Class</strong></td>
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
        <textarea name="name[<%= index %>]"><%= col.name %></textarea>
      </td>
      <td>
        <textarea name="content[<%= index %>]"><%= col.content %></textarea>
      </td>
      <td>
        <textarea name="editor[<%= index %>]"><%= col.editor %></textarea>
      </td>
      <td>
        <input type="number" name="width[<%= index %>]" value="<%= col.width %>">
      </td>
      <td>
        <input type="text" name="class[<%= index %>]" value="<%= col.class %>">
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

    var cols = atob(that.opt.target.get('attributes').datatable || 'W10=');
    var ng_click = atob(that.opt.target.get('attributes').ng_click || 'IA==');
    var ng_if = atob(that.opt.target.get('attributes').ng_if || 'IA==');
    var ng_class = atob(that.opt.target.get('attributes').ng_class || 'IA==');
    var has_search = atob(
      that.opt.target.get('attributes').has_search || 'IA=='
    );
    var search_class = atob(
      that.opt.target.get('attributes').search_class || 'IA=='
    );
    var has_pagination = atob(
      that.opt.target.get('attributes').has_pagination || 'IA=='
    );
    var pagination_class = atob(
      that.opt.target.get('attributes').pagination_class || 'IA=='
    );
    var pagination_per_page = atob(
      that.opt.target.get('attributes').pagination_per_page || 'IA=='
    );
    var api_exist = atob(
      that.opt.target.get('attributes').api_exist || 'ZmFsc2U='
    );
    var api_url = atob(that.opt.target.get('attributes').api_url || 'IA==');
    var api_method = atob(
      that.opt.target.get('attributes').api_method || 'Z2V0'
    );
    var api_params = atob(
      that.opt.target.get('attributes').api_params || 'W10='
    );

    that.columns = cols ? JSON.parse(cols) : [{}];

    that.api_params = api_params ? JSON.parse(api_params) : [];

    var content = this.template({
      columns: that.columns,
      repeat: that.opt.target.get('attributes').repeat,
      data_in: that.opt.target.get('attributes').in,
      ng_click: ng_click,
      ng_if: ng_if,
      ng_class: ng_class,
      has_search: has_search,
      search_class: search_class,
      has_pagination: has_pagination,
      pagination_class: pagination_class,
      pagination_per_page: pagination_per_page,
      api_exist: api_exist,
      api_url: api_url,
      api_method: api_method,
      api_params: that.api_params
    });

    // $(that.modal.getContentEl()).html(content);
    that.modal.setContent($('<div>').html(content));

    that.modal.open();

    that.events();
  },
  events: function() {
    var that = this;

    $('#addColBtn').click(function(e) {
      that.mapColumn();
      that.mapParams();

      setTimeout(function() {
        that.columns.push({});

        var content = that.template({
          columns: that.columns,
          repeat: $('#TableEdit .repeat').val(),
          data_in: $('#TableEdit .in').val(),
          ng_click: $('#TableEdit .ng-click').val(),
          ng_if: $('#TableEdit .ng-if').val(),
          ng_class: $('#TableEdit .ng-class').val(),
          has_search: $('#TableEdit .has-search')[0].checked,
          search_class: $('#TableEdit .search-class').val(),
          has_pagination: $('#TableEdit .has-pagination')[0].checked,
          pagination_class: $('#TableEdit .pagination-class').val(),
          pagination_per_page: $('#TableEdit .pagination-per-page').val(),
          api_exist: $('#TableEdit .api-exist')[0].checked,
          api_url: $('#TableEdit .api-url').val(),
          api_method: $('#TableEdit .api-method').val(),
          api_params: that.api_params
        });

        // $(that.modal.getContentEl()).html(content);
        that.modal.setContent($('<div>').html(content));

        that.events();
      }, 0);
    });

    $('.remove-col').click(function(e) {
      var j = $(this);
      that.mapColumn();
      that.mapParams();

      setTimeout(function() {
        that.columns.splice(parseInt(j.data('index')), 1);

        var content = that.template({
          columns: that.columns,
          repeat: $('#TableEdit .repeat').val(),
          data_in: $('#TableEdit .in').val(),
          ng_click: $('#TableEdit .ng-click').val(),
          ng_if: $('#TableEdit .ng-if').val(),
          ng_class: $('#TableEdit .ng-class').val(),
          has_search: $('#TableEdit .has-search')[0].checked,
          search_class: $('#TableEdit .search-class').val(),
          has_pagination: $('#TableEdit .has-pagination')[0].checked,
          pagination_class: $('#TableEdit .pagination-class').val(),
          pagination_per_page: $('#TableEdit .pagination-per-page').val(),
          api_exist: $('#TableEdit .api-exist')[0].checked,
          api_url: $('#TableEdit .api-url').val(),
          api_method: $('#TableEdit .api-method').val(),
          api_params: that.api_params
        });

        that.modal.setContent($('<div>').html(content));
        // $(that.modal.getContentEl()).html(content);

        that.events();
      }, 1);
    });

    $('.api-exist').change(function() {
      if (this.checked) {
        $('#api_div').show();
      } else {
        $('#api_div').hide();
      }
    });

    $('#addParamBtn').click(function(e) {
      that.mapParams();

      setTimeout(function() {
        that.api_params.push({
          param_key: '',
          param_value: '',
          param_default: ''
        });

        var content = that.template({
          api_params: that.api_params,
          columns: that.columns,
          repeat: $('#TableEdit .repeat').val(),
          data_in: $('#TableEdit .in').val(),
          ng_click: $('#TableEdit .ng-click').val(),
          ng_if: $('#TableEdit .ng-if').val(),
          ng_class: $('#TableEdit .ng-class').val(),
          has_search: $('#TableEdit .has-search')[0].checked,
          search_class: $('#TableEdit .search-class').val(),
          has_pagination: $('#TableEdit .has-pagination')[0].checked,
          pagination_class: $('#TableEdit .pagination-class').val(),
          pagination_per_page: $('#TableEdit .pagination-per-page').val(),
          api_exist: $('#TableEdit .api-exist')[0].checked,
          api_url: $('#TableEdit .api-url').val(),
          api_method: $('#TableEdit .api-method').val()
        });

        that.modal.setContent($('<div>').html(content));
        that.events();
        $('#api_div').show();
      }, 0);
    });

    $('.remove-param').click(function(e) {
      var j = $(this);
      that.mapParams();

      setTimeout(function() {
        that.api_params.splice(parseInt(j.data('index')), 1);

        var content = that.template({
          api_params: that.api_params,
          columns: that.columns,
          repeat: $('#TableEdit .repeat').val(),
          data_in: $('#TableEdit .in').val(),
          ng_click: $('#TableEdit .ng-click').val(),
          ng_if: $('#TableEdit .ng-if').val(),
          ng_class: $('#TableEdit .ng-class').val(),
          has_search: $('#TableEdit .has-search')[0].checked,
          search_class: $('#TableEdit .search-class').val(),
          has_pagination: $('#TableEdit .has-pagination')[0].checked,
          pagination_class: $('#TableEdit .pagination-class').val(),
          pagination_per_page: $('#TableEdit .pagination-per-page').val(),
          api_exist: $('#TableEdit .api-exist')[0].checked,
          api_url: $('#TableEdit .api-url').val(),
          api_method: $('#TableEdit .api-method').val()
        });

        that.modal.setContent($('<div>').html(content));
        that.events();
        $('#api_div').show();
      }, 1);
    });

    // alert(that.opt.target.get('datatable'));

    $('#addTableBtn').click(function(e) {
      that.mapColumn();
      that.mapParams();

      setTimeout(function() {
        that.opt.target.get('attributes').datatable = btoa(
          JSON.stringify(that.columns)
        );
        that.opt.target.get('attributes').repeat = $(
          '#TableEdit .repeat'
        ).val();
        that.opt.target.get('attributes').in = $('#TableEdit .in').val();

        that.opt.target.get('attributes').ng_click = btoa(
          $('#TableEdit .ng-click').val()
        );
        that.opt.target.get('attributes').ng_if = btoa(
          $('#TableEdit .ng-if').val()
        );
        that.opt.target.get('attributes').ng_class = btoa(
          $('#TableEdit .ng-class').val()
        );
        that.opt.target.get('attributes').has_search = btoa(
          $('#TableEdit .has-search')[0].checked
        );
        that.opt.target.get('attributes').search_class = btoa(
          $('#TableEdit .search-class').val()
        );
        that.opt.target.get('attributes').has_pagination = btoa(
          $('#TableEdit .has-pagination')[0].checked
        );
        that.opt.target.get('attributes').pagination_class = btoa(
          $('#TableEdit .pagination-class').val()
        );
        that.opt.target.get('attributes').pagination_per_page = btoa(
          $('#TableEdit .pagination-per-page').val()
        );
        that.opt.target.get('attributes').api_exist = btoa(
          $('#TableEdit .api-exist')[0].checked
        );
        that.opt.target.get('attributes').api_url = btoa(
          $('#TableEdit .api-url').val()
        );
        that.opt.target.get('attributes').api_method = btoa(
          $('#TableEdit .api-method').val()
        );
        that.opt.target.get('attributes').api_params = btoa(
          JSON.stringify(that.api_params)
        );
        e.preventDefault();
        that.modal.close();
      }, 1);
    });
  },
  mapParams: function() {
    var that = this;
    var form = $.extend({}, $('#TableEdit').serializeArray());

    var fields = {};

    for (var n in form) {
      fields[form[n].name] = form[n].value;
    }

    for (var n = 0; n < that.api_params.length; n++) {
      var col = that.api_params[n];
      col.param_key = fields['param_key[' + n + ']'];
      col.param_value = fields['param_value[' + n + ']'];
      col.param_default = fields['param_default[' + n + ']'];
    }
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
      col.class = fields['class[' + n + ']'];
      col.content = fields['content[' + n + ']'];
      col.editor = fields['editor[' + n + ']'];
      col.name = fields['name[' + n + ']'];
    }
  }
};
