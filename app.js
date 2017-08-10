const express = require('express')
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser')
const app = express();
const uuidv1 = require('uuid/v1');
var jsonfile = require('jsonfile');

var layouts_file = './layouts.json';
var components_file = './components.json';

var layouts = {};
var components = {};

jsonfile.readFile(layouts_file, function(err, obj) {
	layouts = obj;
});
jsonfile.readFile(components_file, function(err, obj) {
	components = obj;
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
	},
}));
app.set('view engine', 'handlebars');

app.use(express.static('dist'))
app.use(express.static('node_modules'))

app.get('/', function (req, res) {
	res.locals.layouts = layouts;
	res.locals.components = components;
    res.render('home');
});

app.post('/save-component', function (req, res) {
	var id = uuidv1();
	components[id] = {
		tagName: req.body.tagName,
		traits: req.body.traits,
	};

	jsonfile.writeFile(components_file, components, function (err) {
		res.send(id);
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

app.listen(3000);