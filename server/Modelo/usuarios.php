<?php
require_once 'DB/db.php';
class usuarios extends DB {
	const ALL_USERS = "select * from usuario";
	const LOOK_USER = "select cedula,nombres,apellidos,password FROM usuario WHERE cedula=?";
	const INSERT_USER = "insert into usuario (cedula,nombres,apellidos,password) values (?,?,?,?)";

//--------FUNCION PARA INICIAR SESION (RETORNA "SI", SI LOS DATOS SON CORRECTOS)------------------>>>

	public function login($username,$password){
		$arguments = ["username"=>$username];
		$result=$this->query(self::LOOK_USER,$arguments);
		$contact=$result->fetch_array(MYSQLI_ASSOC);
		if (!empty($contact)){
			$pass = $contact["password"];
			if ($pass === md5($password)){
				return "yes";
			} else {
				return "no";
			}
		} else {
			return "no";
		}
	}

//---------FUNCION PARA AGREGAR UN USUSARIO NUEVO----------------->>>
	public function agregarUsuario($user) {
		$this->open_connection();
		$statement = $this->conn->prepare(self::INSERT_USER);
		if($statement){
			if (!is_null($user) && count($user)>0) {
				$statement->bind_param ("isss", $user['cedula'], $user['nombres'], $user['apellidos'], md5($user['password']));
			}
			$result = $statement->execute();
			$statement->close();
		}else{
			$log->error("Error preparing statement of query".$query );
		}
		$this->close_connection();
		return $result;
	}
}
?>