var mongoose = require(mongoose);
module.exports.mongoose = mongoose;

var iniciar = function() {
    
    //Conectando a una base de datos 
    mongoose.connect('mongodb://localhost/baseDatos');
    
    //Elementos de la base de datos
    var CsvSchema = mongoose.Schema({
        "nombre" : String,
        "contenido" : String,
        "numeroRegistro" : Number,
        "elementoActual" : Boolean
    });

    //Exportar
    module.exports.CsvSchema = CsvSchema;
    
    var Csv = mongoose.model("Csv", CsvSchema);
    //Exportar modelo Csv
    module.exports.Csv = Csv;
    
}

