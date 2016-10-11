<?php
/*private static $username = "root";
private static $password = "";
private static $hostname = "localhost";*/ 

//connection to the database
/*$dbhandle = mysql_connect($hostname, $username, $password) or die("Unable to connect to MySQL");
$selected = mysql_select_db("bd_tesis",$dbhandle) or die("No se encontro bd_tesis");

public function buscarUsuario($usuario, $passUsuario){
	$query = mysql_query("SELECT cedula, password FROM usuario WHERE cedula='$usuario' and password='$passUsuario'");

	if(!$query || mysql_num_rows($result) <= 0){
        return false;
    }
}*/
$postdata = json_decode(file_get_contents('php://input'),true);
	if($postdata['user'] == "prueba" && $postdata['pas'] == "1234"){
		echo "1";
		$this->response($postdata, 200);
	}
	else {
		echo "0";
	}
?>