var mongoose = require('mongoose');
module.exports.mongoose = mongoose;

//Declarar variables
var Csv;
var CsvSchema;

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