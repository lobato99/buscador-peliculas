var cont=2; 
var bloqueo = false;

$(document).ready(function() { 
        document.getElementById("boton").addEventListener("click", function( event ) { // para detectar la pulsacion en el boton
            $("#contenedor").empty();
            cont=2;
            getPage();
        }, false);
        
     });

$(window).scroll(function () { // Scroll infinito
    if($(window).scrollTop() + $(window).height() > $(document).height() - 100){
            getPage(cont);
            cont++;
    }
    });
$('#busqueda').keypress(function(event){ // para detectar la pulsacion en el "intro"
    var keycode = (event.keyCode);
    if(keycode == '13'){
         $("#contenedor").empty();
            cont=2;
            getPage();
    }
});


function getPage(n=1){ // obtenemos la pagina pasada por parametros, en el caso de no pasar parametro se accede a la primera pagina
    var busq=document.getElementById("busqueda").value;
    var cadena="http://www.omdbapi.com/?s="+busq+"&page="+n+"&apikey=ffbff699";
    $.ajax({
             type: "GET",
             url: cadena,
             dataType: "json",
             success: function(data){
                if (bloqueo == false){
                    bloqueo = true;
                    var result=data["Search"];
                    $.each(result, function() {
                    var info = '<div class="card col-md-3"><img src="'+this["Poster"]+'" id="'+this["imdbID"]+'"width="150" class="imagen"><p>Titulo: ' + this["Title"] + '</p><p>Año: ' + this["Year"];
                    $("#contenedor").append(info);

                });
                $("img").click(function(event) {
                    detalle(event);
                });
                
                bloqueo = false;
             }
            } 
         });
}

function detalle(event){ //Cargamos la informacion de la pelicula en la ventana modal y posteriormente la hacemos visibe
    getDetalle(event.target.id);
    showModal();

}
function showModal() { // Abrir la ventana modal
  document.getElementById('openModal').style.display = 'block';
}
function CloseModal() { // Cerrar ventana modal
  document.getElementById('openModal').style.display = 'none';
}
function getDetalle(valor){ //obtenemos el detalle de una pelicula a traves de su imdb
    var cadena="http://www.omdbapi.com/?i="+valor+"&apikey=ffbff699";
    $.ajax({
             type: "GET",
             url: cadena,
             dataType: "json",
             success: function(data){
                    var result=data;
                    $("#modal").empty();
                    $("#modal").append('<a href="#close" title="Close" class="close" onclick="CloseModal()" style="z-index:99">X</a>')
                    var info = '<div class="card col-md-5 m-3"><img src="'+result["Poster"]+' class="imagen"></div><div class="card col-md-6 m-3"><h4>'+result["Title"]+'</h4><p>Actores: '+result["Actors"]+'</p><p>Año: '+result["Year"]+'</p><p>Genero: '+result["Genre"]+'</p><p>Sinopsis: '+result["Plot"]+'</p></div>';
                    $("#modal").append(info);
                }
    });
}