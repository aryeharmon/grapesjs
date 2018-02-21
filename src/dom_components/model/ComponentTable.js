const Component = require('./Component');

module.exports = Component.extend(
  {
    defaults: {
      ...Component.prototype.defaults,
      type: 'table',
      tagName: 'table',
      droppable: ['tbody', 'thead', 'tfoot'],
      traits: [
        {
          "type":"name",
          "label":"Name",
          "name":"name",
          "default":"dddd",
          "value":"ddd"
        },
        {
          label: 'datatable',
          name: 'datatable',
          // changeProp: 1,
        },
        {
          label: 'repeat',
          name: 'repeat',
          // changeProp: 1,
        },
        {
          label: 'in',
          name: 'in',
          // changeProp: 1,
        },
        {
          label: 'ng-click',
          name: 'ng-click',
          // changeProp: 1,
        },
        {
          label: 'ng-if',
          name: 'ng-if',
          // changeProp: 1,
        },
        {
          label: 'ng-class',
          name: 'ng-class',
          // changeProp: 1,
        },
      ],
    },
    isComponent(el) {
      let result = '';

      if (el.tagName == 'TABLE') {
        result = { type: 'table' };
      }

      return result;
    }
  }
);
