<?php
require_once 'DB/db.php';
class usuarios extends DB {	
	const ALL_USERS = "select * from usuario WHERE IDSupervisor=0 or IDSupervisor=?";//Con supervisor o supervisados por el usuario
	const LOOK_USER = "SELECT * FROM usuario WHERE cedula=?";
	const LOOK_REGISTER_USER = "SELECT * FROM usuario WHERE cedula=? or correo=?";
	const INSERT_USER = "insert into usuario (cedula,nombres,apellidos,correo,password,rolUsuario) values (?,?,?,?,?,?)";
	const UPDATE_SUPERVISOR = "update usuario set IDSupervisor=? where cedula=?";
	const UPDATE_ROL = "update usuario set rolUsuario=? where cedula=?";
	const UPDATE_INFO = "update usuario set password=? where cedula=?";
//--------FUNCION PARA INICIAR SESION (RETORNA "SI", SI LOS DATOS SON CORRECTOS)------------------>>>

	public function login($username,$password){
		$arguments = ["username"=>$username];
		$result=$this->query(self::LOOK_USER,$arguments);
		$contact=$result->fetch_array(MYSQLI_ASSOC);
		if (!empty($contact)){
			$pass = $contact["password"];
			if ($pass === md5($password)){
				return $contact;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}

//---------FUNCION PARA AGREGAR UN USUSARIO NUEVO----------------->>>
	public function agregarUsuario($user) {
		$this->open_connection();
		$lookUser = $this->conn->prepare(self::LOOK_REGISTER_USER);
		$lookUser->bind_param("is",$user['cedula'],$user['correo']);
		$lookUser->execute();
		$checkUser=$lookUser->get_result();
		$this->close_connection();
		if($checkUser->num_rows==0){
			$this->open_connection();
			$statement = $this->conn->prepare(self::INSERT_USER);
			if($statement){
				if (!is_null($user) && count($user)>0) {
					$statement->bind_param ("isssss", $user['cedula'], $user['nombres'], $user['apellidos'],$user['correo'], md5($user['password']),$user['rol']);
				}
				$result=$statement->execute();
				$statement->close();
				return $result;
				$this->close_connection();				
			}else{
				return "No hay statement";
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
			}
			$result = $statement->execute();
			$statement->close();
			$this->close_connection();
			return $result;
		}else{
			return false;
		}
	}


	public function updateRol($data){
		$this->open_connection();
		$statement = $this->conn->prepare(self::UPDATE_ROL);
		if($statement){
			if(!is_null($data) && count($data)>0){
				$statement->bind_param("si",$data['nuevoRol'],$data['cedula']);
			}
			$result = $statement->execute();
			$statement->close();
			$this->close_connection();
			return $result;
		}else{
			return false;
		}
	}

	public function updateInfo($data){
		$this->open_connection();
		$statement = $this->conn->prepare(self::UPDATE_INFO);
		if($statement){
			if(!is_null($data) && count($data)>0){
				$statement->bind_param("si",md5($data['contrasena']),$data['cedula']);
			}
			$result = $statement->execute();
			$statement->close();
			$this->close_connection();
			return $result;
		}else{
			return false;
		}
	}

	public function getUsers($cedula){
		$arguments = ["username"=>$cedula];
		$this->open_connection();
		$statement = $this->query(self::ALL_USERS,$arguments);
		$allUsers=[];
		if ($statement->num_rows > 0){
			while ($row = $statement->fetch_assoc()) {
				array_push($allUsers, $row);
			}
		}
		return $allUsers;
	}
}
?>