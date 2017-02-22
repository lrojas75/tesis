<?php
require_once 'DB/db.php';
class focoInfeccion extends DB {
	const INSERT_SUMIDERO="insert into focoinfeccion (Tipo,Estado,Larvas,Pupas,Tratamiento,Insecticida,Cantidad,Ubicacion,idInfoGeneral) values (?,?,?,?,?,?,?,?,?)";

	const INSERT_VIVIENDA="insert into focoinfeccion (Tipo,Habitantes,Clave,tipoDeposito,TieneAgua,L,P,Medidatanque,Eliminados,Tratados,Larvicida,Ubicacion,idInfoGeneral) values (?,?,?,?,?,?,?,?,?,?,?,?,?)";

	const INSERT_CDH="insert into focoinfeccion(Tipo,Nombre,Apellido,Cedula,RazonSocial,Ubicacion,ObservacionCDH,idInfoGeneral,plazo) values (?,?,?,?,?,?,?,?,?)";

	const INSERT_CDHTOLDILLO="insert into fococdh (Tipo,Bueno,Regular,Malo,Total,EnUso,IDFoco) values (?,?,?,?,?,?,?)";
	const INSERT_CDHFOCO="insert into fococdh (Tipo,Cantidad,Lugar,IDFoco) values (?,?,?,?)";

	const LAST_FOCO = "select max(ID) from focoInfeccion where idInfoGeneral=?";

	const GET_INSECTICIDAS = "select * from insecticidas";
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
			$log->error("Error preparing statement of query".$statement);
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
			$log->error("Error preparing statement of query".$statement);
		}
		$this->close_connection();
		return $result;
	}

	public function agregarCDHToldillo($foco,$id){
		$arguments=["id"=>$id];
		$focoGetID = $this->query(self::LAST_FOCO,$arguments);
		$focoID = $focoGetID->fetch_array(MYSQLI_ASSOC);
		if(!is_null($focoID)){			
			if (!is_null($foco)) {
				$this->open_connection();
				$statement = $this->conn->prepare(self::INSERT_CDHTOLDILLO);
				if($statement){
					$statement->bind_param ("siiiiii",$foco['tipo'],$foco['bueno'],$foco['regular'],$foco['malo'],$foco['total'],$foco['enuso'],intval($focoID['max(ID)']));
					$result = $statement->execute();
					$statement->close();
					$this->close_connection();
					return $result;
				}
			}else{
				$log->error("Error preparing statement of query".$statement);
			}			
		}
	}

	public function agregarCDHFoco($foco,$id){
		$arguments=["id"=>$id];
		$focoGetID = $this->query(self::LAST_FOCO,$arguments);
		$focoID = $focoGetID->fetch_array(MYSQLI_ASSOC);
		if(!is_null($focoID)){			
			if (!is_null($foco)) {
				$this->open_connection();
				$statement = $this->conn->prepare(self::INSERT_CDHFOCO);
				if($statement){
					$statement->bind_param ("sisi",$foco['tipo'],$foco['cantidad'],$foco['lugar'],intval($focoID['max(ID)']));
					$result = $statement->execute();
					$statement->close();
					$this->close_connection();
					return $result;
				}
			}else{
				$log->error("Error preparing statement of query".$statement);
			}			
		}
	}

	public function agregarCDH($cdh){
		$this->open_connection();
		$statement = $this->conn->prepare(self::INSERT_CDH);
		if($statement){
			if(!is_null($cdh) && count($cdh)>0){
				$statement->bind_param("sssssssii",$cdh['tipo'],$cdh['nombre'],$cdh['apellido'],$cdh['cedula'],$cdh['razonsocial'],$cdh['ubicacion'],$cdh['observacion'],$cdh['infoID'],$cdh['plazo']);
				$result = $statement->execute();
				$statement->close();
				$this->close_connection();			
				if($cdh['tipocdh']=='general'){
					foreach ($cdh['encontrados'] as $foco) {
						$resultFocoEncontrado=$this->agregarCDHFoco($foco,$cdh['infoID']);
					}
					foreach ($cdh['potenciales'] as $foco) {
						$resultPotencial=$this->agregarCDHFoco($foco,$cdh['infoID']);
					}
					return $result;
				}else{
					foreach ($cdh['toldillos'] as $toldillo) {
						$resultToldillo=$this->agregarCDHToldillo($toldillo,$cdh['infoID']);
					}
					return $result;
				}
				return $result;
			}
		}else{
			$log->error("Error statement"+$cdh);
		}
	}

	public function getInsecticidas(){
		$this->open_connection();
		$result = $this->conn->query(self::GET_INSECTICIDAS);
		$insecticidas=[];
		if ($result->num_rows > 0){
			while ($row = $result->fetch_assoc()) {
				array_push($insecticidas, $row);
			}
			return $insecticidas;
		}

	
		$this->close_connection();
		
	}

}
?>