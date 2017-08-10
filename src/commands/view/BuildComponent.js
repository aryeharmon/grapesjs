var parse_str = require('locutus/php/strings/parse_str');

var Component = function() {
  var that = this;
  that.traits = [{
    "type": "text",
    "label": "JSON URL",
    "name": "src"
  },
  {
    "type": "checkbox",
    "label": "Repeater",
    "name": "Repeater"
  }, {
    "type": "number",
    "label": "Max",
    "name": "Max",
    "default": "0",
    "value": "10"
  }, {
    "type": "select",
    "label": "Each Line",
    "name": "line_count",
    "options": [{
      "value": "col-xs-12",
      "name": "1"
    }, {
      "value": "col-xs-6",
      "name": "2"
    }, {
      "value": "col-xs-4",
      "name": "3"
    }, {
      "value": "col-xs-3",
      "name": "4"
    }, {
      "value": "col-xs-2",
      "name": "6"
    }, {
      "value": "col-xs-1",
      "name": "12"
    }]
  }];

  this.removeTrait = function(index) {
    that.traits.splice(index, 1);
  };
  this.addTrait = function(type) {
    that.traits.push({
      type: type,
      options: [],
      label: '',
      name: '',
      default: '',
      value: '',
    });
  };

  this.addTraitOption = function(index) {
      this.traits[index].options.push({
        name: '',
        value: '',
      });
  };
  this.removeTraitOption = function(index, o_index) {
    that.traits[index].options.splice(o_index, 1);
  };
};


module.exports = {
  run(editor, sender) {
    var that = this;

    this.component = new Component;

    this.render(editor);

    // alert(editor.trigger);
  },
  get_form_data: function() {
    var that = this;

    var form_data = {};

    parse_str($("#saveComponent").serialize(), form_data);

    form_data.traits = $.map(form_data.traits, function(value, index) {
      return [value];
    });

    for (var i = 0; i < form_data.traits.length; i++) {
      var optionsObj = form_data.traits[i].options || {};
      form_data.traits[i].options = $.map(optionsObj, function(value, index) {
          return [value];
      });
    }

    $.extend(that.component, form_data);
  },
  render(editor) {
    var that = this;

    this.modal = editor.Modal || null;
    this.modal.setTitle('Component editor');
    this.modal.setContent(`
      <div>
        <h3 class="component-editor-title">Add a new Component</h3>

        <form id="saveComponent">
          <input type="hidden" name="id" value="` + (that.component.id || '') + `"/>

          <div class="form-group">
            <label>Name</label>
            <input type="label" name="tagName" class="form-control" value="` + (that.component.tagName || '') + `">
          </div>

          <hr>


          <div id="traits"></div>

          <select class="add-type">
            <option>text</option>
            <option>email</option>
            <option>password</option>
            <option>number</option>
            <option>checkbox</option>
            <option>select</option>
          </select>
          <button id="add-settings" type="button" class="btn btn-default">Add Setting</button>
          <hr>

          <button type="submit" class="btn btn-default">Save</button>
        </form>

      </div>



      <div>
        <h3>Existing Component</h3>
        
        <ul id="components">
          <li>test1 <button>Edit</button></li>
        </ul>

      </div>
    `);
    this.modal.open();

    for (var id in components) {
      $('#components').append(`<li class="edit-component" data-id="`+id+`">`+ components[id].tagName +` <button>Edit</button></li>`);
    }

    for (var i = 0; i < this.component.traits.length; i++) {
      var trait = this.component.traits[i];
      $('#traits').append('<input type="hidden" name="traits[' + i + '][type]" value="' + trait.type + '"/>');
      $('#traits').append('<div><strong>' + trait.type + '</strong> <button type="button" class="remove-setting" data-i="' + i + '">Remove Setting</button></div>');

      if (trait.type === 'text' || trait.type === 'checkbox' || trait.type === 'number' || trait.type === 'select' || trait.type === 'email' || trait.type === 'password') {
        $('#traits').append(`
          <div class="form-group">
            <label>label</label>
            <input type="label" name="traits[` + i + `][label]" class="form-control" value="` + (trait.label || "") + `">
          </div>
          <div class="form-group">
            <label>name</label>
            <input type="text" name="traits[` + i + `][name]" class="form-control" value="` + (trait.name || "") + `">
          </div>
          <div class="form-group">
            <label>default</label>
            <input type="text" name="traits[` + i + `][default]" class="form-control" value="` + (trait.default || "") + `">
          </div>
          <div class="form-group">
            <label>value</label>
            <input type="text" name="traits[` + i + `][value]" class="form-control" value="` + (trait.value || "") + `">
          </div>
        `);
      }
      if (trait.type === 'select') {
        for (var n = 0; n < trait.options.length; n++) {
          var option = trait.options[n];
          $('#traits').append(`
            <div><strong>Opotion ` + (n + 1) + ` </strong></div>
            <div class="form-group">
              <label>name</label>
              <input type="text" name="traits[` + i + `][options][` + n + `][name]" class="form-control" value="` + (option.name || "") + `">
            </div>
          `);
          $('#traits').append(`
            <div>Opotion 1</div>
            <div class="form-group">
              <label>value</label>
              <input type="text" name="traits[` + i + `][options][` + n + `][value]" class="form-control" value="` + (option.value || "") + `">
            </div>
          `);
          $('#traits').append(`
            <div>
              <button type="button" class="remove-option" data-i="` + i + `" data-n="` + n + `">Remove Option</button>
            </div>
          `);
        }
        
        $('#traits').append(`
          <button type="button" class="add-option" data-i="` + i + `">Add Option</button>
        `);
      }
      $('#traits').append('<hr>');
    }

    $("#add-settings").click(function(e) {
      that.get_form_data();
      that.component.addTrait($('.add-type').val());
      that.render(editor);
    });
    $(".add-option").click(function(e) {
      that.get_form_data();

      var i = $(this).data('i');
      that.component.addTraitOption(i);
      that.render(editor);
    });
    $(".remove-option").click(function(e) {
      that.get_form_data();

      var i = $(this).data('i');
      var n = $(this).data('n');

      that.component.removeTraitOption(i, n);

      that.render(editor);
    });
    $(".remove-setting").click(function(e) {
      that.get_form_data();
      var i = $(this).data('i');

      that.component.removeTrait(i);

      that.render(editor);
    });

    $("#saveComponent").submit(function(e) {
      e.preventDefault();
      that.get_form_data();
      var url = "/save-component";

      $.ajax({
       type: "POST",
       url: url,
       data: $("#saveComponent").serialize(),
       success: function(data)
       {

        var model = defaultModel.extend({
            defaults: Object.assign({}, defaultModel.prototype.defaults, {
              style: {
                "min-height": '40px',
                "display": 'block',
              },
              tagName: that.component.tagName,
              classes: ['cutom-element-type'],
              stylable: 'false',
              draggable: '*',
              droppable: true,
              saveable: true,
              traits: that.component.traits,
            }),
          },
          {
            isComponent: function(el) {
              if(el.tagName == that.component.tagName.toUpperCase()){
                return {type: that.component.tagName};
              }
            },
          });

        if (editor.DomComponents.getType(that.component.tagName)) {
          editor.DomComponents.getType(that.component.tagName).model = model;
        } else {
          editor.DomComponents.addType(that.component.tagName, {
            model: model,
            view: defaultType.view,
          });
        }


        editor.BlockManager.add(data, {
          label: that.component.tagName,
          category: 'Custom Components',
          attributes: {class:'fa fa-thermometer-full'},
          content: {
            type: that.component.tagName,
          },
        });

        that.component = new Component;
        alert('saved');
        that.render(editor);

       }
      });
    });


  },
};
