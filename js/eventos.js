var inicioJuego = function()
{

	var BoxOpened = "";
	var imgAbierta = "";
	var contador = 0;
	var imgEncontrada = 0;

	var ptjugador_1 = 0;
	var jugador_2 = 0;
	var Source = "#cartas";

	var imagenes = ["img/1.png", "img/2.png", "img/3.png", "img/4.png", "img/5.png", "img/6.png", "img/7.png", "img/8.png",
	  				"img/9.png", "img/10.png", "img/11.png", "img/12.png", "img/13.png", "img/14.png", "img/15.png", "img/16.png",
	  				"img/17.png", "img/18.png", "img/19.png", "img/20.png", "img/21.png", "img/22.png", "img/23.png", "img/24.png",
	  				"img/25.png", "img/26.png", "img/27.png", "img/28.png", "img/29.png", "img/30.png", "img/31.png", "img/32.png"];

	var validaUsuario = function()
	{
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
		if(usuario1!="" && clave1!="" && usuario2!="" && clave2!="" )
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
						$("#inicio").hide("slow");
						$("#picbox").show("slow"); 
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
			alert("Usuario y clave son obligatorios");
		}
	}

	var GuardaUsuario = function()
	{
		var usuario = $("#txtAltaUsuario").val();
		var nombre = $("#txtAltaNombre").val();
		var clave   = $("#txtAltaClave").val();
		var tipo = $("#txtAltaTipo").val();
		//Preparar los parámetros para AJAX
		var parametros = "opcion=guardar"+
		                 "&usuario="+usuario+
		                 "&nombre="+nombre+
		                 "&clave="+clave+
		                 "&tipo="+tipo+
		                 "&id="+Math.random();
	}

	function Random(MaxValue, MinValue) {
			return Math.round(Math.random() * (MaxValue - MinValue) + MinValue);
		}
		
	function cambiarImagenes() {
		var ImgAll = $(Source).children();
		var ImgThis = $(Source + " div:first-child");
		var ImgArr = new Array();

		for (var i = 0; i < ImgAll.length; i++) {
			ImgArr[i] = $("#" + ImgThis.attr("id") + " img").attr("src");
			ImgThis = ImgThis.next();
		}
		
			ImgThis = $(Source + " div:first-child");
		
		for (var z = 0; z < ImgAll.length; z++) {
		var numeroRandom = Random(0, ImgArr.length - 1);

			$("#" + ImgThis.attr("id") + " img").attr("src", ImgArr[numeroRandom]);
			ImgArr.splice(numeroRandom, 1);
			ImgThis = ImgThis.next();
		}
	}

	var reiniciarJuego = function() {
		cambiarImagenes();
		$(Source + " div img").hide();
		$(Source + " div").css("visibility", "visible");
		contador = 0;
		$("#success").remove();
		$("#contador").html("" + contador);
		BoxOpened = "";
		imgAbierta = "";
		ImgFound = 0;
		return false;
	}

	function turno(){

	}

	function abrirCarta() {
		var id = $(this).attr("id");

		if ($("#" + id + " img").is(":hidden")) {
			$(Source + " div").unbind("click", abrirCarta);
		
			$("#" + id + " img").slideDown('fast');

			if (imgAbierta == "") {
				BoxOpened = id;
				imgAbierta = $("#" + id + " img").attr("src");
				setTimeout(function() {
					$(Source + " div").bind("click", abrirCarta)
				}, 300);
			} else {
				CurrentOpened = $("#" + id + " img").attr("src");
				if (imgAbierta != CurrentOpened) {
					setTimeout(function() {
						$("#" + id + " img").slideUp('fast');
						$("#" + BoxOpened + " img").slideUp('fast');
						BoxOpened = "";
						imgAbierta = "";
					}, 400);
				} else {
					setTimeout(function(){
					$("#" + id + " img").parent().css("visibility", "hidden");
					$("#" + BoxOpened + " img").parent().css("visibility", "hidden");
				    
					imgEncontrada++;
					BoxOpened = "";
					imgAbierta = "";
					}, 400);
				}
				setTimeout(function() {
					$(Source + " div").bind("click", abrirCarta)
				}, 400);
			}
			contador++;
			$("#contador").html("" + contador);

			if (imgEncontrada == imagenes.length) {
				$("#contador").prepend('<span id="success">You Found All Pictues With </span>');
			}
		}
	}

	//$("#btnReinicia").on("click",reiniciarJuego);

	$(function() {

	for (var y = 1; y < 3 ; y++) {
		$.each(imagenes, function(i, val) {
			$(Source).append("<div id=card" + y + i + "><img src=" + val + " />");
		});
	}
		$(Source + " div").click(abrirCarta);
		cambiarImagenes();
	});

	$("#btnReinicia").on("click",reiniciarJuego);
	$("#btnComenzar").on("click",validaUsuario);
	$("#btnRegistrarse").on("click",GuardaUsuario);

}

$(document).on("ready",inicioJuego);