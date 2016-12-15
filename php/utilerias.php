<?php
	//Limpiar parámetros - contra ataques
	function GetSQLValueString($theValue, $theType, $theDefinedValue = "", $theNotDefinedValue = "") 
	{
	  $theValue = get_magic_quotes_gpc() ? stripslashes($theValue) : $theValue;
	  $theValue = function_exists("mysql_real_escape_string") ? mysql_real_escape_string($theValue) : mysql_escape_string($theValue);
	  switch ($theType) {
	    case "text":
	      $theValue = ($theValue != "") ? "'" . $theValue . "'" : "NULL";
	      break;    
	    case "long":
	    case "int":
	      $theValue = ($theValue != "") ? intval($theValue) : "NULL";
	      break;
	    case "double":
	      $theValue = ($theValue != "") ? "'" . doubleval($theValue) . "'" : "NULL";
	      break;
	    case "date":
	      $theValue = ($theValue != "") ? "'" . $theValue . "'" : "NULL";
	      break;
	    case "defined":
	      $theValue = ($theValue != "") ? $theDefinedValue : $theNotDefinedValue;
	      break;
	  }
	  return $theValue;
	}
	
	function validaUsuario()
	{		
		$respuesta = false;			
		$u1 = GetSQLValueString($_POST["usuario1"],"text"); //limpieza
		$c1 = GetSQLValueString($_POST["clave1"],"text"); //limpieza
		$u2 = GetSQLValueString($_POST["usuario2"],"text"); //limpieza
		$c2 = GetSQLValueString($_POST["clave2"],"text"); //limpieza
		//usuario2
		//contraseña2
		//Conexión al servidor
		$conexion  = mysql_connect("localhost","root","");
		//Conexión a la base de datos
		mysql_select_db("bd2163");
		$consulta  = sprintf("select usuario,clave from jugadores where (usuario=%s and clave=%s) OR (usuario=%s and clave=%s) limit 1",$u1,$c1,$u2,$u2);
		$resultado = mysql_query($consulta);
		//Esperamos un solo resultado
		if(mysql_num_rows($resultado) == 2	)
		{
			$respuesta = true;
		}
		$arregloJSON = array('respuesta' => $respuesta );
		print json_encode($arregloJSON);
	}

	function guardaUsuario()
	{
		$respuesta = false;
		$usuario= GetSQLValueString($_POST["usuario"],"text"); //limpieza
		$nombre= GetSQLValueString($_POST["nombre"],"text"); //limpieza
		$edad= GetSQLValueString($_POST["edad"],"text"); //limpieza
		//Conexión al servidor
		$conexion  = mysql_connect("localhost","root","");
		//Conexión a la base de datos
		mysql_select_db("bd2163");
		$consulta  = sprintf("insert into jugadores values(%s, %s, %s)",$usuario,$nombre,$edad);
		$resultado = mysql_query($consulta);
		if($resultado)
		{
			$respuesta = true;
		}
		$arregloJSON = array('respuesta' => $respuesta );
		print json_encode($arregloJSON);
	}

	//Menú principal
	$opc = $_POST["opcion"];
	switch ($opc) {
		case 'valida':
			validaUsuario();
			break;
		
		case 'guardar':
			validaUsuario();
			break;

		default:
			# code...
			break;
	}
?>