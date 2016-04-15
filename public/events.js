(() => {
// "use strict"; // Use ECMAScript 5 strict mode in browsers that support it
const resultTemplate = `
<div class="contenido">
   <table id="result" class="center">
     <% _.each(items, function(name) { %>
       <tr class="<%= name.rowClass %>">
         <% _.each(name.value, function(cell) { %>
           <td><%= cell %></td>
         <% }); %>
       </tr>
     <% }); %>
   </table>
  </p>
</div>
`;

    const ajaxRequest = (input)  => {
        console.log(input);
        $.ajax({ 
           url: '/calculate',
           type: 'GET',
           cache: false, 
           data: {csvString: input}, 
           success: function(data){
                var parsedTemplate = _.template(resultTemplate,{items: data });
                $("#finaltable").html(parsedTemplate);
           }
           , error: function(jqXHR, textStatus, err){
               alert('text status '+textStatus+', err '+err)
           }
        })
    }
    
    const dump = (fileName) => {
        var reader = new FileReader();
        reader.onload = function(e) { 
            console.log(e.target)
            let input = e.target.result;
            $('#original').val(input);
        }
        var c = reader.readAsText(fileName);
    };
    
    const handleFileSelect = (evt) => {
        evt.stopPropagation();
        evt.preventDefault();
        let files = evt.currentTarget.files; // FileList object.
        evt.target.style.background = "green";
    
    
        // files is a FileList of File objects. List some properties.
        let ulnode=document.createElement("UL");
        for (var i = 0, f; f = files[i]; i++) {
            if (files[i]) {
                dump(files[i])
            } else { alert("Failed to load file"); }
            
            let linode=document.createElement("LI");
            let stronode=document.createElement("strong");
            let textStrnode=document.createTextNode(escape(f.name));
            let textnode=document.createTextNode(' ('  + f.type + ') - ' + f.size + ' bytes');
            stronode.appendChild(textStrnode);
            linode.appendChild(stronode);
            linode.appendChild(textnode);
            ulnode.appendChild(linode);
        }
    
        var list=document.getElementById("list");
        list.insertBefore(ulnode,list.childNodes[2]);
  }


    $(document).ready(() => {
        console.log(resultTemplate)
        if (window.localStorage && localStorage.original) {
            original.value = localStorage.original;
        //  let inputFile = 
        $('#files').change(handleFileSelect);
        $('#button').click(() => {
            $('#andAnimation').toggleClass('animation1');
            $('#andAnimation').on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",
                function(e){
                    setTimeout(function() {
                        $('#andAnimation').removeClass('animation1');
                    }, 500);
                $(this).off(e);
            });
            var original = document.getElementById("original").value;
            if (window.localStorage) 
                localStorage.original = original;
            ajaxRequest(original);
            
        })
    }
    });

})();
