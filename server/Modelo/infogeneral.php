<?php
require_once 'DB/db.php';
class infoGeneral extends DB {
	const INSERT_INFO_GENERAL = "insert into informaciongeneral (ID_Usuario,Municipio,Fecha) values (?,?,?)";
	const LAST_INFO_GENERAL = "select max(ID) from informaciongeneral where id_usuario=?";
	const INSERT_COMUNA_BARRIO = "insert into comunaxbarrio (ID_InfoGeneral,Comuna,Barrio, Actividad) values (?,?,?,?)";
	const CHECK_USER_INFO = "select id, municipio from informaciongeneral where (id_usuario=?) and (fecha=?)";
//--------AGREGAR INFORMACION GENERAL------------------>>>

	public function agregarComunaBarrio($data){
		$arguments=["id"=>$data["id"]];
		$infoGetGeneralID = $this->query(self::LAST_INFO_GENERAL,$arguments);
		//Obetener la ultima info general
		$infoID = $infoGetGeneralID->fetch_array(MYSQLI_ASSOC);		
		if(!is_null($infoID)){
			$this->open_connection();
			$statement = $this->conn->prepare(self::INSERT_COMUNA_BARRIO);
			$statement->bind_param("isss",intval($infoID['max(ID)']),$data['comuna'],$data['barrio'],$data['actividad']);
			$result = $statement->execute();
			$statement->close();
			$this->close_connection();
			return $result;
		}else{
			return false;
		}
	}

	public function checkInformacionGeneral($user,$fecha){
		$this->open_connection();		
		if ($stmt = $this->conn->prepare(self::CHECK_USER_INFO)) {
			$stmt->bind_param("ss", $user,$fecha);
			$stmt->execute();
			$result=$stmt->get_result();
			$info=$result->fetch_array(MYSQLI_ASSOC);
			$this->close_connection();
			if (!empty($info)){
				return $info;
			} else {
				return;
			}
		}
	}

	public function agregarInformacionGeneral($info){
		$this->open_connection();
		$statement = $this->conn->prepare(self::INSERT_INFO_GENERAL);
		if($statement){
			if (!is_null($info) && count($info)>0) {
				$statement->bind_param ("iss", $info['id'], $info['municipio'], $info['fecha']);
				$result = $statement->execute();
				$statement->close();
				$this->close_connection();
				$resultComuna = $this->agregarComunaBarrio($info);
				return $result and $resultComuna;
			}			
		}else{
			error_log("Error preparing statement of query".$query);
			$this->close_connection();
			return $result;
		}		
	}

}
	
?>