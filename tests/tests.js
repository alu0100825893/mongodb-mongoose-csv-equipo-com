var expect = chai.expect

describe('CVS', function() {
  describe('#calculate', function() {
    it ('deberia saber el numero de lineas',function() {
      this.original = "\"color\",\"numero\",\"objeto\"\n\"azul\",\"2\",\"coche\"\n\"rojo\",\"6,2\",\"lápiz\"";
      expect(calculate(this.original).length).to.deep.equal(3);
    });

    it ('deberia analizar una entrada separada por comas',function() {
      this.original = "\"color\",\"numero\",\"objeto\"\n\"azul\",\"2\",\"coche\"\n\"rojo\",\"62\",\"lápiz\"";
      var aux = calculate(this.original);
      expect(aux[0].value).to.deep.equal(['color','numero','objeto']);
      expect(aux[1].value).to.deep.equal(['azul','2','coche']);
      expect(aux[2].value).to.deep.equal(['rojo','62','lápiz']);
    });

    it ('deberia analizar una entrada separada por espacios en vez de comas',function() {
      this.original = "\"color\" \"numero\" \"objeto\"\n\"azul\" \"2\" \"coche\"\n\"rojo\" \"62\" \"lápiz\"";
      var aux = calculate(this.original);
      expect(aux[0].value).to.deep.equal(['color','numero','objeto']);
      expect(aux[1].value).to.deep.equal(['azul','2','coche']);
      expect(aux[2].value).to.deep.equal(['rojo','62','lápiz']);
    });

    it ('deberia analizar una entrada y detectar una linea erronea',function() {
      this.original = "\"color\",\"numero\",\"objeto\"\n\"azul\",\"2\",\"coche\",\"moto\"\n\"rojo\",\"62\",\"lápiz\"";
      var aux = calculate(this.original);
      expect(aux[0].value).to.deep.equal(['color','numero','objeto']);
      expect(aux[0].rowClass).to.deep.equal('');
      expect(aux[1].value).to.deep.equal(['azul','2','coche','moto']);
      expect(aux[1].rowClass).to.deep.equal('error');
      expect(aux[2].value).to.deep.equal(['rojo','62','lápiz']);
      expect(aux[2].rowClass).to.deep.equal('');
    });

    it ('deberia analizar una entrada con campos vacios',function() {
      this.original = "\"color\",\"numero\",\"objeto\"\n\"azul\",\"2\",  \n\"rojo\", ,\"lápiz\"";
      var aux = calculate(this.original);
      expect(aux[0].value).to.deep.equal(['color','numero','objeto']);
      expect(aux[1].value).to.deep.equal(['azul','2','']);
      expect(aux[2].value).to.deep.equal(['rojo','','lápiz']);
    });

    it ('deberia analizar una entrada en la que las comillas son opcionales',function() {
      this.original = "color,\"numero\",\"objeto\"\n\"azul\",2 ,\"coche\"\n\"rojo\",\"62\",lápiz";
      var aux = calculate(this.original);
      expect(aux[0].value).to.deep.equal(['color','numero','objeto']);
      expect(aux[1].value).to.deep.equal(['azul','2','coche']);
      expect(aux[2].value).to.deep.equal(['rojo','62','lápiz']);
    });
  });
});
