var express = require('express')
var csv = require('./csv');
var app = express()
// https://nodejs.org/api/path.html
var path = require("path");
var database = require("./database.js");    // Para conectar con la BD

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// set the view engine to ejs
app.set('view engine', 'ejs'); // http://expressjs.com/api.html#app.set

//Iniciamos la base de datos
database.iniciar();

// Serve static files
app.use(express.static(__dirname + '/public'));

// Luego la consultamos con app.get('port')
app.set('port', (process.env.PORT || 5000)); 

/*
 * body-parser is a piece of express middleware that 
 *   reads a form's input and stores it as a javascript
 *   object accessible through `req.body` 
 *
 * 'body-parser' must be installed (via `npm install --save body-parser`)
 * For more info see: https://github.com/expressjs/body-parser
 */

// instruct the app to use the `bodyParser()` middleware for all routes
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));

// A browser's default method is 'GET', so this
// is the route that express uses when we visit
// our site initially.

app.get('/', function(req, res) {

    res.render('layout', { title: 'CSV ajax'})
});


app.get('/calculate', function (req, res){
      var answer = csv.calculate(req.query.csvString)
      res.send(answer);

});

app.get('/mongo/save', function (req, res){
    //console.log(req.query.contenido);
    database.mongoose.connect('mongodb://localhost/baseDatos');
    
    
    var csvTemp = new database.Csv({
        "nombre": req.query.nombre,
        "contenido": req.query.contenido,
        "numeroRegistro" : 1
    });
    //console.log(req.params);
    var p1 = csvTemp.save(function (err) {
      if (err) console.log("Algo ha ido mal en el guardado");
    });
    
    p1.then( (value) => {
        //console.log(value);
        console.log("Guardado: " + value.nombre);
        database.mongoose.connection.close();
    });
        
        
    
});

// app.get('/', function(req, res){
//   // The form's action is '/' and its method is 'POST',
//   // so the `app.post('/', ...` route will receive the
//   // result of our form
//   res.sendfile(__dirname + '/public/index.html');
// });

// app.get('/tests', function(req, res){
//   // The form's action is '/' and its method is 'POST',
//   // so the `app.post('/', ...` route will receive the
//   // result of our form
//   res.sendfile(__dirname + '/public/test/index.html');
// });
app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});

