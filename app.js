const express = require('express')
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser')
const app = express();
const uuidv1 = require('uuid/v1');
var jsonfile = require('jsonfile');

var layouts_file = './layouts.json';
var components_file = './components.json';
var categories_file = './categories.json';

var layouts = {};
var components = {};
var categories = {};

jsonfile.readFile(layouts_file, function(err, obj) {
	layouts = obj;
});
jsonfile.readFile(components_file, function(err, obj) {
	components = obj;
});
jsonfile.readFile(categories_file, function(err, obj) {
	categories = obj;
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())



app.engine('handlebars', exphbs({
	defaultLayout: 'main',
	helpers: {
	    toLowerCase: function(str){
	        return str.toLowerCase();
	    },
	    toUpperCase: function(str){
	        return str.toUpperCase();
	    },
	    toJSON: function(obj){
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
	},
}));
app.set('view engine', 'handlebars');

app.use(express.static('dist'))
app.use(express.static('node_modules'))

app.get('/', function (req, res) {
	res.locals.layouts = layouts;
	res.locals.components = components;
	res.locals.categories = categories;
    res.render('home');
});

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
		html: req.body.html,
	};

	jsonfile.writeFile(layouts_file, layouts, function (err) {
		res.send(id);
	});
});
app.post('/delete-layout', function (req, res) {
	delete layouts[req.body.id];

	jsonfile.writeFile(layouts_file, layouts, function (err) {
		res.json({success: true});
	});
});

app.get('/list-category', function (req, res) {
	res.json(categories);
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

app.listen(3000);