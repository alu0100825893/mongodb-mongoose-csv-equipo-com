"use strict";

var express = require('express')
var csv = require('./csv');
var app = express()
// https://nodejs.org/api/path.html
var path = require("path")
var mongoose = require('mongoose');





// view engine setup
app.set('views', path.join(__dirname, 'views'));
// set the view engine to ejs
app.set('view engine', 'ejs'); // http://expressjs.com/api.html#app.set


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

//Conectando a una base de datos 
mongoose.connect('mongodb://localhost/baseDatos');

//Elementos de la base de datos
var CsvSchema = mongoose.Schema({
        "nombre" : String,
        "contenido" : String,
        "numeroRegistro" : Number,
        "elementoActual" : Boolean
});


var Csv = mongoose.model("Csv", CsvSchema);

mongoose.connection.close();

app.get('/', (req, res)  => {
    
    mongoose.connect('mongodb://localhost/baseDatos');
    
    var findedEnv
    Csv.find({}, (err, finded) => {
        findedEnv = finded;
        res.render('layout', { title: 'CSV ajax', botones: findedEnv})
        mongoose.connection.close();
    });
});


app.get('/calculate', (req, res) =>{
      var answer = csv.calculate(req.query.csvString)
      res.send(answer);

});

app.get('/mongo/queryBoton', (req, res) =>{
    mongoose.connect('mongodb://localhost/baseDatos');
    let request = req.query.botonId;
    Csv.find({numeroRegistro: request}, (err, finded) => { 
        let answer = finded[0].contenido;
        res.send(answer);
        mongoose.connection.close();
    });

});

app.get('/mongo/save', (req, respuesta) => {
    mongoose.connect('mongodb://localhost/baseDatos');
    
    let numEntradas;
    let numReg;
    let elementoAct;
    var answer;
    Csv.find({}, (err, finded) => {
        numEntradas = finded.length;
    }).then( (value) => {
        if(numEntradas < 4) {
            //Se pueden crear registros
            numReg = numEntradas + 1;
            if (numEntradas == 0) {
                elementoAct = true;
            }
            else {
                elementoAct = false;
            }
            
            let csvTemp = new Csv({
                "nombre": req.query.nombre,
                "contenido": req.query.contenido,
                "numeroRegistro" : numReg,
                "elementoActual" : elementoAct
            });
            
            let p1 = csvTemp.save( (err) => { 
              if (err) console.log("Algo ha ido mal en el guardado");
            });
            
            p1.then( (value) => {
                console.log("Guardado: " + value.nombre);
                mongoose.connection.close();
            });
            
        }
        else {
            //Se reutilizan registros
            console.log("reutilizando reg");
            
            Csv.find({elementoActual : true}, (err, finded) => {
                numReg = finded[0].numeroRegistro;
                answer = numReg;
            }).then( (value) => {
                let siguiente = (numReg + 1) % 4;
                if (siguiente == 0) siguiente = 4;
                //Actualizando registro actual y el siguiente
                Csv.update({numeroRegistro : siguiente},{elementoActual : true}, () => {
                    Csv.update({numeroRegistro : numReg},
                        {nombre: req.query.nombre, contenido : req.query.contenido, elementoActual : false},
                        () => {
                            respuesta.send(answer.toString());
                            mongoose.connection.close();
                        })
                })
            })
        }
    })
    
});


app.listen(app.get('port'), () => {
  console.log("Node app is running at localhost:" + app.get('port'));
});