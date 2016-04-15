main = function() {
  var original = document.getElementById("original").value;
  if (window.localStorage) localStorage.original = original;
  // var r = calculate(original);
  // var template = fillTable.innerHTML;
  // finaltable.innerHTML = _.template(template, {items: r});
};

$(document).ready(function () {
  // If the browser supports localStorage and we have some stored data
  if (window.localStorage && localStorage.original) {
    original.value = localStorage.original;
  }
  $("#button").click(function() {
    main();
    $('#andAnimation').toggleClass('animation1');

    $('#andAnimation').on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",
      function(e){
      // do something here
        setTimeout(function() {
          $('#andAnimation').removeClass('animation1');
        }, 500);
        $(this).off(e);
      });
 });
});

/**
*	Función que lee el archivo indicado en el fileInput
*/

function readSingleFile(evt) {
    //Recuperar el fichero (el primero, porque se podría una lista)
    let f = evt.target.files[0];

	//Si se cargó el fichero, prepararse para leerlo
    if (f) {
      let r = new FileReader();
      r.onload = function(e) {
		  //Una vez cargado, sustituir el contenido el textarea
		  $("#original").val('');
	      $("#original").val(e.target.result);
      }
      r.readAsText(f);
    } else {
      alert("No se ha cargado ningún archivo");
    }
}

//Funcion para cargar un archivo de ejemplo en la tabla
dump = function(fileName) {
    $.get(fileName, function (data) {
        $("#original").val(data);
    });
};
