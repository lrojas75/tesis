<?php
require_once 'db.php';
class focosInfeccion extends DB {
	const INSERT_INFO_GENERAL = "insert into informaciongeneral (Municipio,Barrio,Comuna,Actividad,Fecha) values (?,?,?,?,?)";
	const INSERT_SUMIDERO = "insert into focoinfeccion (idTipo, Estado, Larvas, Pupas, Tratamiento, Larvicida, Cantidad, Usuario, idInfoGeneral, Ubicacion) values (?,?,?,?,?,?,?,?,?)";

//--------AGREGAR INFORMACION GENERAL------------------>>>
	public function agregarInformacionGeneral($info){
		$this->open_connection();
		$statement = $this->conn->prepare(self::INSERT_INFO_GENERAL);
		if($statement){
			if (!is_null($info) && count($info)>0) {
				$statement->bind_param ("sssss", $info['municipio'], $info['barrio'], $info['comuna'], $info['actividad'], $info['fecha']);
			}
			$result = $statement->execute();
			$statement->close();
		}else{
			$log->error("Error preparing statement of query".$query);
		}
		$this->close_connection();
		return $result;
	}

	public function agregarSumidero($sumidero){
		$this->open_connection();
		$statement = $this->conn->prepare(self::INSERT_SUMIDERO);
		if($statement){
			if (!is_null($sumidero) && count($sumidero)>0) {
				$statement->bind_param ("isssssdis", $sumidero['estado'], $sumidero['larvas'], $sumidero['pupas'], $sumidero['tratado'], $sumidero['insecticida'], $sumidero['cantidadInsecticida'], $sumidero['ubicacion']);
			}
			$result = $statement->execute();
			$statement->close();
		}else{
			$log->error("Error preparing statement of query".$query);
		}
		$this->close_connection();
		return $result;
	}
}
	
?>