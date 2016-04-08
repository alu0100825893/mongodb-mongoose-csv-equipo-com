main = function() {
  var original = document.getElementById("original").value;
  if (window.localStorage) localStorage.original = original;
  var r = calculate(original);
  var template = fillTable.innerHTML;
  finaltable.innerHTML = _.template(template, {items: r});
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
