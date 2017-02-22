<?php
require_once 'DB/db.php';
class usuarios extends DB {
	const ALL_USERS = "select * from usuario";
	const LOOK_USER = "select * FROM usuario WHERE cedula=?";
	const INSERT_USER = "insert into usuario (cedula,nombres,apellidos,password,rolUsuario) values (?,?,?,?,?)";
	const UPDATE_SUPERVISOR = "update usario set IDSupervisor=? where cedula=?";
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
		$arguments = ["username"=>$user['cedula']];
		$lookUser = $this->query(self::LOOK_USER,$arguments);
		$checkUser=$lookUser->fetch_array(MYSQLI_ASSOC);
		if(is_null($checkUser)){
			$this->open_connection();
			$statement = $this->conn->prepare(self::INSERT_USER);
			if($statement){
				if (!is_null($user) && count($user)>0) {
					$statement->bind_param ("issss", $user['cedula'], $user['nombres'], $user['apellidos'], md5($user['password']),$user['rol']);
					$result = $statement->execute();
					$statement->close();
					$this->close_connection();
					return $result;
				}				
			}else{
				return "false";
			}
		}else{
			return "repetido";
		}
	}

	public function updateSupervisor($data){
		$this->open_connection();
		$statement = $this->conn->prepare(self::UPDATE_SUPERVISOR);
		if($statement){
			if(!is_null($data) && count($data)>0){
				$statement->bind_param("ii",$data['IDSupervisor'],$data['cedula']);
				$result = $statement->execute();
				$statement->close();
				$this->close_connection();
				return $result;
			}else{
				return false;
			}
		}else{
			return false;
		}
	}
}
?>