"use strict";

var mongoose = require('mongoose');
module.exports.mongoose = mongoose;

//Declarar variables
var Csv;
var CsvSchema;


//Funcion para iniciar el esquema y modelo a utilizar en la DB

var iniciar = module.exports.iniciar = function() {
    
    //Conectando a una base de datos 
    mongoose.connect('mongodb://localhost/baseDatos');
    
    console.log('Se ha conectado con la base de datos');
    
    //Elementos de la base de datos
    CsvSchema = mongoose.Schema({
        "nombre" : String,
        "contenido" : String,
        "numeroRegistro" : Number,
        "elementoActual" : Boolean
    });
    
    Csv = mongoose.model("Csv", CsvSchema);
    
    mongoose.connection.close();
}

//Función para solicitar los datos guardados y así generar botones
var getBotones = module.exports.getBotones = function(res) {
    
    mongoose.connect('mongodb://localhost/baseDatos');
    var findedEnv
    Csv.find({}, (err, finded) => {
        findedEnv = finded;
        res.render('layout', { title: 'CSV ajax', botones: findedEnv})
        mongoose.connection.close();
    });
    
}

//Función para guardar una entrada en la base de datos
var guardarEntrada = module.exports.guardarEntrada = function(req, res) {
    mongoose.connect('mongodb://localhost/baseDatos');
    
    let numEntradas;
    let numReg;
    let elementoAct;
    let answer;
    
    Csv.find({}, (err, finded) => {
        console.log("error",err)
        numEntradas = finded.length;
        console.log("num entradas",numEntradas);
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
                            res.send(answer.toString());
                            mongoose.connection.close();
                        })
                })
            })
            
        }
    })
}

//Lee la info del boton
var queryBoton = module.exports.queryBoton = function(req, res) {
    
     mongoose.connect('mongodb://localhost/baseDatos');
    console.log(req.query.botonId)
    let request = req.query.botonId;
    Csv.find({numeroRegistro: request}, (err, finded) => { 
        let answer = finded[0].contenido;
        res.send(answer);
        mongoose.connection.close();
    });
    
}