var BoxOpened = "";
var ImgOpened = "";
var Counter = 0;
var ImgFound = 0;
var turno_jugador = 1;
var pts_jugador1 = 0;
var pts_jugador2 = 0; 
var pts_totales = 0;
$(".results1").css("color","red");

var Source = "#boxcard";
var usr1 = "";
var urs2 = "";

var ImgSource = ["img/1.png", "img/2.png", "img/3.png", "img/4.png", "img/5.png", "img/6.png", "img/7.png", "img/8.png",
	  			 "img/9.png", "img/10.png", "img/11.png", "img/12.png", "img/13.png", "img/14.png", "img/15.png", "img/16.png",
	  			 "img/17.png", "img/18.png", "img/19.png", "img/20.png", "img/21.png", "img/22.png", "img/23.png", "img/24.png",
	  			 "img/25.png", "img/26.png", "img/27.png", "img/28.png", "img/29.png", "img/30.png", "img/31.png", "img/32.png"];

function validaUsuario()
{
	//Extraer los datos de los input en el HTML
	var usuario1 = $("#txtUsuario1").val();
	var clave1   = $("#txtClave1").val();
	var usuario2 = $("#txtUsuario2").val();
	var clave2   = $("#txtClave2").val();
	//Preparar los parámetros para AJAX
	var parametros = "opcion=valida"+
	                 "&usuario1="+usuario1+
	                 "&clave1="+clave1+
	                 "&usuario2="+usuario2+
	                 "&clave2="+clave2+
	                 "&id="+Math.random();
	
	//Validamos que no esten vacíos
	if(usuario1!="" && clave1!="" && usuario2!="" && clave2!="")
	{
		//Hacemos la petición remota
		$.ajax({
			cache:false,
			type:"POST",
			dataType:"json",
			url: "php/utilerias.php",
			data:parametros,
			success: function(response){
				if(response.respuesta == true)
				{
					$(".results1").html(response.usuario1);
					$(".results2").html(response.usuario2);
					usr1 = response.usuario1;
					usr2 = response.usuario2;
					$(".results1").css("color", "red");
					$("#inicio").hide("slow");
					$("#main").show("slow"); 
				}
				else
				{
					alert("Datos incorrectos :(");
				}
			},
			error: function(xhr,ajaxOptions,thrownError){
				//Si todo sale mal
			}
		});
	}
	else
	{
		alert("Usuarios y claves son obligatorios");
	}
}

function guardaUsuario()
{
	var usuario = $("#txtUsuario").val();
	var clave   = $("#txtClave").val();
	var edad    = $("#txtEdad").val();
	//Preparar los parámetros para AJAX
	var parametros = "opcion=guardar"+
	                 "&usuario="+usuario+
	                 "&clave="+clave+
	                 "&edad="+edad+
	                 "&id="+Math.random();
	
	if(usuario!="" && clave!="" && edad!="")
	{
		//Hacemos la petición remota
		$.ajax({
			cache:false,
			type:"POST",
			dataType:"json",
			url: "php/utilerias.php",
			data:parametros,
			success: function(response){
				if(response.respuesta == true)
				{    
					alert("Guardado correctamente");
				}
				else
				{
					alert("Datos incorrectos :(");
				}
			},
			error: function(xhr,ajaxOptions,thrownError){
				//Si todo sale mal
			}
		});
	}
	else
	{
		alert("Todos los datos son obligatorios");
	}	 
}

function inicio()
{
	$("#inicio").show("slow");
	$("#picbox").hide("slow");
	$("#registro").hide("slow");
}

function registro(){
	$("#inicio").hide("slow");
	$("#picbox").hide("slow");
	$("#registro").show("slow");
}


function RandomFunction(MaxValue, MinValue) {
		return Math.round(Math.random() * (MaxValue - MinValue) + MinValue);
	}
	
function ShuffleImages() {
	var ImgAll = $(Source).children();
	var ImgThis = $(Source + " div:first-child");
	var ImgArr = new Array();

	for (var i = 0; i < ImgAll.length; i++) {
		ImgArr[i] = $("#" + ImgThis.attr("id") + " img").attr("src");
		ImgThis = ImgThis.next();
	}
	
		ImgThis = $(Source + " div:first-child");
	
	for (var z = 0; z < ImgAll.length; z++) {
	var RandomNumber = RandomFunction(0, ImgArr.length - 1);

		$("#" + ImgThis.attr("id") + " img").attr("src", ImgArr[RandomNumber]);
		ImgArr.splice(RandomNumber, 1);
		ImgThis = ImgThis.next();
	}
}

function ResetGame()
{
	turno_jugador = 1;
	pts_jugador1 = 0;
	pts_jugador2 = 0; 
	pts_totales = 0;
	$(".results1").css("color", "red");
	$(".results2").css("color", "white");
	ShuffleImages();
	$(Source + " div img").hide();
	$(Source + " div").css("visibility", "visible");
	Counter = 0;
	$("#success").remove();
	$("#counter").html("" + Counter);
	BoxOpened = "";
	ImgOpened = "";
	ImgFound = 0;
	return false;
}

function OpenCard() {
  var id = $(this).attr("id");

  if ($("#" + id + " img").is(":hidden")) {
    $(Source + " div").unbind("click", OpenCard);
  
    $("#" + id + " img").slideDown('fast');

    if (ImgOpened == "") {
      BoxOpened = id;
      ImgOpened = $("#" + id + " img").attr("src");
      setTimeout(function() {
        $(Source + " div").bind("click", OpenCard)
      }, 300);
    } else {
      CurrentOpened = $("#" + id + " img").attr("src");
      if (ImgOpened != CurrentOpened) {
        
        setTimeout(function() {
          $("#" + id + " img").slideUp('fast');
          $("#" + BoxOpened + " img").slideUp('fast');
          BoxOpened = "";
          ImgOpened = "";
          if (turno_jugador == 1 ) {
          turno_jugador = 2;
            $(".results2").css("color", "red");
             $(".results1").css("color", "white");
        }
        else{
          turno_jugador = 1;
           $(".results1").css("color", "red");
            $(".results2").css("color", "white");
        }
      
        }, 400);
      } else {
        if (turno_jugador == 1) {
          pts_jugador1++;
          $('.results1').html(usr1+": "+ pts_jugador1);
          pts_totales = pts_jugador1 + pts_jugador2;
          if (pts_totales == 32 && pts_jugador1 > pts_jugador2) {
            
              alert("El ganador es "+usr1);
            
          }else if (pts_totales == 32 && pts_jugador2 > pts_jugador1)
          {
            alert("El ganador es "+usr2);
          }


        }else{
          pts_jugador2++;
          $('.results2').html(usr2+": "+ pts_jugador2);
          pts_totales = pts_jugador1 + pts_jugador2;
          if (pts_totales == 32 && pts_jugador2 > pts_jugador1)
          {
            alert("El ganador es "+usr2);
          }else if (pts_totales == 32 && pts_jugador2 > pts_jugador1)
          {
            alert("El ganador es "+usr1);
          }
          
        
        }
        setTimeout(function(){
          $("#" + id + " img").parent().css("visibility", "hidden");
        $("#" + BoxOpened + " img").parent().css("visibility", "hidden");
        ImgFound++;
        BoxOpened = "";
        ImgOpened = "";
      }, 500);
        
      }
      setTimeout(function() {
        $(Source + " div").bind("click", OpenCard)
      }, 400);
    }
    Counter++;
    $("#counter").html("" + Counter);

    if (ImgFound == ImgSource.length) {
      $("#counter").prepend('<span id="success">You Found All Pictues With </span>');
    }
  }
}


$(function() {

for (var y = 1; y < 3 ; y++) {
	$.each(ImgSource, function(i, val) {
		$(Source).append("<div id=card" + y + i + "><img src=" + val + " />");
	});
}
	$(Source + " div").click(OpenCard);
	ShuffleImages();
});


