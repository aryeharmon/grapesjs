const express = require('express')
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser')
const app = express();
const uuidv1 = require('uuid/v1');
var jsonfile = require('jsonfile');
var camelCase = require('camelcase');
var async = require('async');
var _ = require('lodash');
var cheerio = require('cheerio');

var fs = require('fs');

var storage_file = './storage.json';

var layouts_file = './layouts.json';
var components_file = './components.json';
var categories_file = './categories.json';
var pages_file = './pages.json';
var menues_file = './menues.json';

var layouts = {};
var components = {};
var categories = {};
var pages = {};
var menues = {};

var cheerio = require('cheerio');


var routerObj = express.Router();

app.use(function (req, res, next) {
  routerObj(req, res, next)
});


jsonfile.readFile(layouts_file, function (err, obj) {
  layouts = obj;
});
jsonfile.readFile(components_file, function (err, obj) {
  components = obj;
});
jsonfile.readFile(categories_file, function (err, obj) {
  categories = obj;
});
jsonfile.readFile(menues_file, function (err, obj) {
  menues = obj;
});
jsonfile.readFile(pages_file, function (err, obj) {
  pages = obj;

  create_routes(routerObj, function () {
    // console.log(123)
  });

});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb',
  parameterLimit: 1000000
}))

// parse application/json
app.use(bodyParser.json({
  limit: '50mb',
  parameterLimit: 1000000
}))

app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  helpers: {
    equal: function (a, b) {
      return a == b;
    },
    toLowerCase: function (str) {
      return str.toLowerCase();
    },
    toUpperCase: function (str) {
      return str.toUpperCase();
    },
    toJSON: function (obj) {
      return JSON.stringify(obj);
    },
    lookup: function (source) {
      if (!source) {
        return;
      }
      var obj = Object.create(source);

      for (var i = 1; i < arguments.length - 1; i++) {
        if (obj && obj[arguments[i]]) {
          obj = obj[arguments[i]];
        } else {
          return;
        }
      }
      return obj;
    },
    add_default: function (array) {
      var array = array || [];

      return array.concat([{
        name: 'ng-transclude',
        value: 'ng-transclude',
        default: 'ng-transclude',
      }]);
    },
    keys: function (obj) {
      return Object.keys(obj);
    },
    join: function (array, string) {
      return array.join(string);
    },
    filter: function (obj, property, value) {
      // return array.join(string);
    },
    "string-exists": function (html, string) {
      if (html && html.indexOf(string) > -1) {
        return true;
      } else {
        return false;
      }
    },
    convert: function (html) {
      var html = html.replace(new RegExp('\'', 'g'), "\\'");
      return html;
    },
    getComponentClassByHtml: function (html) {

      // var regex = new RegExp(/^<(\S*)/, 'g');
      var result = html.match(/^<(\S*)/);

      var tagName = _.find(components, function (obj) {
        return '<' + obj.tagName === (result[0] || '');
      });
      if (tagName) {
        return tagName.icon;
      }
      return '';
      // return array.join(string);
    },
  },
}));
app.set('view engine', 'handlebars');

app.use(express.static('dist'))
app.use(express.static('node_modules'))

app.post('/save-component', function (req, res) {
  var id = req.body.id || uuidv1();
  components[id] = {
    tagName: req.body.tagName,
    traits: req.body.traits,
    category: req.body.category,
    icon: req.body.icon,
    id: id,
  };

  jsonfile.writeFile(components_file, components, function (err) {
    res.send(id);
  });
});

app.post('/remove-component', function (req, res) {
  delete components[req.body.id];

  jsonfile.writeFile(components_file, components, function (err) {
    res.send(req.body.id);
  });
});

app.post('/save-layout', function (req, res) {
  var id = uuidv1();
  layouts[id] = {
    label: req.body.label,
    image_preview: req.body.image_preview,
    category: req.body.category,
    subcategory: req.body.subcategory,
    html: req.body.html,
  };

  jsonfile.writeFile(layouts_file, layouts, function (err) {
    res.send(id);
  });
});

app.post('/delete-layout', function (req, res) {
  delete layouts[req.body.id];

  jsonfile.writeFile(layouts_file, layouts, function (err) {
    res.json({
      success: true
    });
  });
});

app.get('/list-category', function (req, res) {
  res.json(categories);
});

app.get('/components', (req, res) => {

  const filterBy = req.query.filterBy || {};
  const __components = Object.keys(components).filter(key => {
    return filterBy && filterBy.categoryId && components[key].category === filterBy.categoryId;
  }).map(key => {
    return components[key]
  });

  res.json(__components);
});
app.post('/add-category', function (req, res) {
  var id = req.body.id || uuidv1();
  categories[id] = {
    name: req.body.name,
  };

  jsonfile.writeFile(categories_file, categories, function (err) {
    res.json(categories);
  });
});

app.post('/remove-category', function (req, res) {
  delete categories[req.body.id];

  jsonfile.writeFile(categories_file, categories, function (err) {
    res.send(req.body.id);
  });
});

app.get('/storage/load', function (req, res) {
  jsonfile.readFile(storage_file, function (err, obj) {
    res.json(obj);
  });
});
app.post('/storage/store', function (req, res) {
  jsonfile.writeFile(storage_file, res.body, function (err) {
    res.send({
      success: true
    });
  });
});

app.post('/storage/html', function (req, res) {

  var $ = cheerio.load(req.body.html);

  async.each($('region'), function (that, callback) {
    var region_name = $(that).attr('name');

    var plum = $('<region class="region" name="' + region_name + '"></region>');
    $(that).replaceWith(plum);

    fs.writeFile("./regions/" + region_name + ".html", $.html(that), function (err) {
      if (err) {
        return console.log(err);
      }

      callback();
    });

  }, function () {
    fs.writeFile("./pages/html/" + req.body._id + ".html", $('body').html(), function (err) {
      if (err) {
        return console.log(err);
      }

      console.log("html file saved");
    });
    fs.writeFile("./style.css", req.body.css.replace(new RegExp('cutom-element-type', 'g'), 'dskjfhskjghs'), function (err) {
      if (err) {
        return console.log(err);
      }

      console.log("css file saved");
    });
    res.json({
      success: true
    });

  });
});
app.get('/view', function (req, res) {
  fs.readFile('./html.html', 'utf8', function (err, html) {
    fs.readFile('./css.css', 'utf8', function (err, css) {
      res.locals.html = html;
      res.locals.css = css;
      res.locals.components = Object.keys(components).map(function (key) {
        return camelCase(components[key].tagName);
      });
      res.render('view', {
        layout: false
      })
    });
  });
});
app.get('/amp-view', function (req, res) {
  fs.readFile('./html.html', 'utf8', function (err, html) {
    fs.readFile('./css.css', 'utf8', function (err, css) {
      res.locals.html = html;
      res.locals.css = css;
      res.locals.components = Object.keys(components).map(function (key) {
        return camelCase(components[key].tagName);
      });
      res.render('amp-view', {
        layout: false
      })
    });
  });
});

app.all('/admin', function (req, res) {
  res.locals.pages = pages;
  res.render('admin', {
    layout: 'admin'
  });
});
app.get('/admin/page/delete/:id', function (req, res) {
  delete pages[req.params.id];

  jsonfile.writeFile(pages_file, pages, function (err) {
    routerObj = express.Router();
    create_routes(routerObj, function () {
      res.redirect('/admin');
    })
  });
});

app.get('/admin/menu', function (req, res) {
  res.locals.menues = menues;

  res.render('menu', {
    layout: 'admin'
  });
});
app.post('/admin/menu', function (req, res) {

  var id = req.body._id || uuidv1();

  menues[id] = {
    _id: id,
    name: req.body.name,
  };

  jsonfile.writeFile(menues_file, menues, function (err) {
    res.redirect('/admin/menu');
  });

});
app.get('/admin/menu/delete/:id', function (req, res) {
  delete menues[req.params.id];

  jsonfile.writeFile(menues_file, menues, function (err) {
    res.redirect('/admin/menu');
  });
});
app.get('/admin/menu/edit/:id', function (req, res) {
  res.locals.menues = menues;

  res.locals.menu = menues[req.params.id];

  res.render('menu-edit', {
    layout: 'admin'
  });
});
app.get('/menu/:id', function (req, res) {
  var menu = menues[req.params.id].menu || [];
  res.json({
    items: menu
  });
});
app.post('/admin/menu/edit/:id', function (req, res) {
  req.body.menu = JSON.parse(req.body.menu);

  menues[req.params.id].menu = req.body.menu;

  jsonfile.writeFile(menues_file, menues, function (err) {
    res.redirect('/admin/menu/edit/' + req.params.id);
  });

});


var create_routes = function (routerObj, callback) {
  async.each(pages, function (page, callback) {
    routerObj.get('/edit/' + page.slug, function (req, res) {
      res.locals.layouts = layouts;
      res.locals.components = components;
      res.locals.categories = categories;

      fs.readFile('./pages/html/' + page._id + '.html', 'utf8', function (err, html) {
        fs.readFile('./style.css', 'utf8', function (err, css) {


          var $ = cheerio.load(html);

          async.each($('region'), function (that, callback) {
            var region_name = $(that).attr('name');
            fs.readFile('./regions/' + region_name + '.html', 'utf8', function (err, html) {
              var plum = $(html);
              $(that).replaceWith(plum);
              callback();
            });
          }, function () {


            fs.readdir('./regions', function (err, filenames) {
              if (err) {
                onError(err);
                return;
              }

              res.locals.regions = {};

              async.each(filenames, function (filename, callback) {
                fs.readFile('./regions/' + filename, 'utf-8', function (err, content) {
                  res.locals.regions[filename.replace('.html', '')] = content;
                  callback();
                });
              }, function () {
                res.locals.html = $('body').html();
                res.locals.css = css;
                res.locals.page = page;
                res.locals.categoriesOptions = Object.keys(categories).map(key => {
                  return {
                    name: categories[key].name,
                    id: key,
                  };
                });
                
                res.locals.subcomponents = Object.keys(components).map(key => {
                  return components[key];
                });

                res.render('home');

              });
            });

          });

        });
      });
    });


    routerObj.get('/' + page.slug, function (req, res) {
      fs.readFile('./pages/html/' + page._id + '.html', 'utf8', function (err, html) {
        fs.readFile('./style.css', 'utf8', function (err, css) {

          var re = new RegExp("<mustach-loop (.*)insatnce=\"([^\"]+)\"[^>]*>((.|\n)*?)<\/mustach-loop>", "g");
          html = html.replace(re, "{{#$2}}$3{{/$2}}");

          var $ = cheerio.load(html);

          async.each($('region'), function (that, callback) {
            var region_name = $(that).attr('name');
            fs.readFile('./regions/' + region_name + '.html', 'utf8', function (err, html) {
              var plum = $(html);
              $(that).replaceWith(plum);
              callback();
            });
          }, function () {
            res.locals.html = $('body').html();
            res.locals.css = css;
            res.locals.components = Object.keys(components).map(function (key) {
              return camelCase(components[key].tagName);
            });
            res.render('amp-view', {
              layout: false
            })
          });



        });
      });
    });

    callback();
  }, function () {
    callback();
  });
}

app.post('/admin/save/page', function (req, res) {
  var id = req.body._id || uuidv1();

  pages[id] = {
    _id: id,
    page_name: req.body.page_name,
    alt_name: req.body.alt_name,
    slug: req.body.slug,
  };

  fs.writeFile("./pages/html/" + id + ".html", '', function (err) {
    if (err) {
      return console.log(err);
    }
  });

  jsonfile.writeFile(pages_file, pages, function (err) {
    routerObj = express.Router();
    create_routes(routerObj, function () {
      res.redirect('/admin');
    })
  });
});

//app.listen(3000);
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'));
