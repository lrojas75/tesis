<?php
require_once 'DB/db.php';
class focoInfeccion extends DB {
	const INSERT_SUMIDERO="insert into focoinfeccion (Tipo,Estado,Larvas,Pupas,Tratamiento,Insecticida,Cantidad,Ubicacion,idInfoGeneral) values (?,?,?,?,?,?,?,?,?)";

	const INSERT_VIVIENDA="insert into focoinfeccion (Tipo,Habitantes,Clave,tipoDeposito,TieneAgua,L,P,Medidatanque,Eliminados,Tratados,Larvicida,Ubicacion,idInfoGeneral) values (?,?,?,?,?,?,?,?,?,?,?,?,?)";

	public function agregarSumidero($sumidero){
		$this->open_connection();
		$statement = $this->conn->prepare(self::INSERT_SUMIDERO);
		if($statement){
			if (!is_null($sumidero) && count($sumidero)>0) {
				$statement->bind_param ("ssssssisi",$sumidero['tipo'], $sumidero['estado'], $sumidero['larvas'], $sumidero['pupas'], $sumidero['tratado'], $sumidero['insecticida'], $sumidero['cantidadInsecticida'], $sumidero['ubicacion'], $sumidero['idInfoGeneral']);
			}
			$result = $statement->execute();
			$statement->close();
		}else{
			$log->error("Error preparing statement of query".$query);
		}
		$this->close_connection();
		return $result;
	}


	public function agregarVivienda($vivienda){
		$this->open_connection();
		$statement = $this->conn->prepare(self::INSERT_VIVIENDA);
		if($statement){
			if (!is_null($vivienda) && count($vivienda)>0) {
				$statement->bind_param ("sisssiiiiidsi",$vivienda['tipo'], $vivienda['habitantes'], $vivienda['clave'], $vivienda['deposito'], $vivienda['tieneAgua'], $vivienda['L'], $vivienda['P'], $vivienda['medidaTanque'], $vivienda['eliminados'],  $vivienda['tratados'],  $vivienda['larvicida'],  $vivienda['ubicacion'], $vivienda['idInfoGeneral']);
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