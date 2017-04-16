<?php
require_once 'DB/db.php';
class focoInfeccion extends DB {
	const INSERT_SUMIDERO="insert into focoinfeccion (Tipo,Estado,Larvas,Pupas,Tratamiento,Insecticida,Cantidad,Ubicacion,idInfoGeneral) values (?,?,?,?,?,?,?,?,?)";

	const INSERT_VIVIENDA="insert into focoinfeccion (Tipo,Habitantes,Nombre,Apellido,Cedula,Clave,Ubicacion,idInfoGeneral) values (?,?,?,?,?,?,?,?)";

	const INSERT_DEPOSITO="insert into depositosvivienda (deposito,tieneAgua,P,L,medidaTanque,eliminado,tratado,larvicida,IDFoco) values (?,?,?,?,?,?,?,?,?)";

	const INSERT_CDH="insert into focoinfeccion(Tipo,Nombre,Apellido,Cedula,RazonSocial,Ubicacion,ObservacionCDH,idInfoGeneral,plazo) values (?,?,?,?,?,?,?,?,?)";

	const INSERT_CDHTOLDILLO="insert into fococdh (Tipo,Bueno,Regular,Malo,Total,EnUso,IDFoco) values (?,?,?,?,?,?,?)";
	const INSERT_CDHFOCO="insert into fococdh (Tipo,Cantidad,Lugar,IDFoco) values (?,?,?,?)";

	const LAST_FOCO = "select max(ID) from focoInfeccion where idInfoGeneral=?";

	const GET_INSECTICIDAS = "select * from insecticidas";
	const INSERT_INSECTICIDA ="insert into insecticidas (Nombre, Usuario_Ingresado) values (?,?)";
	const DELETE_INSECTICIDA ="delete from insecticidas where id=?";

	const GET_FOCOS_SUPERVISOR = "SELECT f.Tipo, f.Tipo, f.Habitantes,f.Nombre,f.Apellido,f.Cedula,f.Clave,f.Ubicacion,f.Plazo,f.Tratamiento,f.Larvas,f.Pupas,f.Estado, u.cedula,i.Fecha,i.Municipio FROM focoinfeccion f INNER JOIN informaciongeneral i on f.idInfoGeneral=i.ID INNER JOIN usuario u on i.ID_Usuario=u.cedula WHERE (u.IDSupervisor=?) or (u.cedula=?)";

	//Selecciona y agrupa los focos por tipo y fecha, devuelve la cantidad de cada uno
	const GET_FOCOS_GRAFICO = "SELECT COUNT(f.id) as cantidad,i.fecha, f.Tipo FROM focoinfeccion f INNER JOIN informaciongeneral i WHERE f.idInfoGeneral=i.ID GROUP BY i.Fecha, f.Tipo";


	//SELECT para la tabla Sumideros
	const GET_SUMIDEROS_REPORTE = "SELECT count(f.id) as cantidad, sum(case when f.Estado = 'Ninguno' then 1 else 0 end) positivos, sum(case when f.Tratamiento='Tratado' then 1 else 0 end) tratados, sum(f.Cantidad) totalinsecticida, i.fecha, f.tipo, i.Municipio FROM focoinfeccion f INNER JOIN informaciongeneral i WHERE (f.idInfoGeneral=i.ID) and f.Tipo='Sumidero' GROUP BY i.Municipio";

	//SELECT para la tabla vivienda
	const GET_VIVIENDA_REPORTE="SELECT count(DISTINCT f.id) as cantidad, count(DISTINCT d.ID) as depositos, sum(case when d.eliminado = 'True' and d.IDFoco=f.ID then 1 else 0 end) eliminados, sum(case when d.tratado = 'True' and d.IDFoco=f.ID then 1 else 0 end) tratados, sum(case when d.IDFoco=F.ID then d.larvicida else 0 end) insecticida, i.fecha, f.tipo, f.idInfoGeneral, i.Municipio FROM focoinfeccion f INNER JOIN informaciongeneral i on (f.idInfoGeneral=i.ID) INNER JOIN depositosvivienda d where f.Tipo='Vivienda' GROUP BY i.Municipio";

	//SELECT para la tabla cdh
	const GET_CDH_REPORTES="SELECT count(DISTINCT f.id) as cantidad, count(DISTINCT cd.ID) as depositos, sum(case when cd.IDFoco=F.ID then cd.Cantidad else 0 end) insecticida, i.fecha, f.tipo, f.idInfoGeneral, i.Municipio FROM focoinfeccion f INNER JOIN informaciongeneral i on (f.idInfoGeneral=i.ID) INNER JOIN fococdh cd where f.Tipo='CDH' GROUP BY i.Municipio";



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
			error_log("Error preparing statement of query".$statement);
		}
		$this->close_connection();
		return $result;
	}

	public function agregarDeposito($deposito,$id){
		$arguments=["id"=>$id];
		$depositoGetID = $this->query(self::LAST_FOCO,$arguments);
		$depositoID = $depositoGetID->fetch_array(MYSQLI_ASSOC);
		if(!is_null($depositoID)){			
			if (!is_null($deposito)) {
				$this->open_connection();
				$statement = $this->conn->prepare(self::INSERT_DEPOSITO);
				if($statement){					
					$statement->bind_param ("ssiiissii",$deposito['deposito'],$deposito['tieneAgua'],$deposito['P'],$deposito['L'],$deposito['medidaTanque'],$deposito['eliminado'], $deposito['tratado'], $deposito['larvicida'],intval($depositoID['max(ID)']));
					$result = $statement->execute();
					$statement->close();
					$this->close_connection();
					return $result;
				}
			}else{
				error_log("Error preparing statement of query".$statement);
			}			
		}
	}

	public function agregarVivienda($vivienda){
		$this->open_connection();
		$statement = $this->conn->prepare(self::INSERT_VIVIENDA);
		if($statement){
			if (!is_null($vivienda) && count($vivienda)>0) {				
				$statement->bind_param ("sisssssi",$vivienda['tipo'], $vivienda['habitantes'], $vivienda['nombres'], $vivienda['apellidos'], $vivienda['cedula'], $vivienda['clave'], $vivienda['ubicacion'], $vivienda['idInfoGeneral']);
			}
			$result = $statement->execute();
			$statement->close();
			$this->close_connection();
			if($result && count($vivienda['depositos'])>0){
				foreach ($vivienda['depositos'] as $deposito) {
						$resultFocoEncontrado=$this->agregarDeposito($deposito,$vivienda['idInfoGeneral']);
					}
			}
		}else{
			error_log("Error preparing statement of query".$statement);
		}
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
				error_log("Error preparing statement of query".$statement);
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
				error_log("Error preparing statement of query".$statement);
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
			error_log("Error statement"+$cdh);
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

	public function deleteInsecticida($IDInsecticida){
		$this->open_connection();
		$statement = $this->conn->prepare(self::DELETE_INSECTICIDA);
		if($statement){
			$statement->bind_param("i",$IDInsecticida);				
			$result = $statement->execute();
			$statement->close();
			$this->close_connection();
			return $result;
		}else{
			return false;
		}
	}

	public function insertInsecticida($NombreInsecticida, $IDUsuario){
		$this->open_connection();
		$statement = $this->conn->prepare(self::INSERT_INSECTICIDA);
		if($statement){
			$statement->bind_param("ss",$NombreInsecticida,$IDUsuario);
			$result = $statement->execute();
			$statement->close();
			$this->close_connection();
			return $result;
		}else{
			return false;
		}
	}

	public function getFocos($IDSupervisor){
		$this->open_connection();
		$stmt = $this->conn->prepare(self::GET_FOCOS_SUPERVISOR);
		$stmt->bind_param("ii", $IDSupervisor,$IDSupervisor);
		$stmt->execute();
		$result=$stmt->get_result();
		$focos=[];
		if ($result->num_rows > 0){
			while ($row = $result->fetch_assoc()) {
				array_push($focos, $row);
			}			
		}
		return $focos;
		$this->close_connection();
	}


	public function getFocosGrafico($year){		
		$result = $this->query(self::GET_FOCOS_GRAFICO);
		$focos_x_mes_vivienda=[0,0,0,0,0,0,0,0,0,0,0,0];
		$focos_x_mes_sumidero=[0,0,0,0,0,0,0,0,0,0,0,0];
		$focos_x_mes_cdh=[0,0,0,0,0,0,0,0,0,0,0,0];
		$focosActualYear=array();
		$focos=mysqli_fetch_all($result,MYSQLI_ASSOC);
		if (count($focos)> 0){
			for ($mes=0; $mes < 12 ; $mes++) {
				foreach ($focos as $row) {
					$fechaFoco=date_parse_from_format("d-m-Y",$row['fecha']);
					if ($fechaFoco['year']>=(int)$year) {						
						if($mes==$fechaFoco['month']){
							switch ($row['Tipo']) {

								case 'Vivienda':
									$focos_x_mes_vivienda[$mes]+=$row['cantidad'];									
									break;

								case 'Sumidero':
									$focos_x_mes_sumidero[$mes]+=$row['cantidad'];
									break;

								case 'CDH':
									$focos_x_mes_cdh[$mes]+=$row['cantidad'];									
									break;
								default:
									# code...
									break;
							}
						}
						
					}
				}
			}
			
		}
		$focos_x_tipomes=[$focos_x_mes_vivienda,$focos_x_mes_sumidero,$focos_x_mes_cdh];
		return $focos_x_tipomes;
	}

	//Funcion para la tabla de sumideros de REPORTES
	public function focosReporte($mes){
		$this->open_connection();
		$result = $this->conn->query(self::GET_SUMIDEROS_REPORTE);
		$focosR=[];
		if ($result->num_rows > 0){
			while ($row = $result->fetch_assoc()) {
				array_push($focosR, $row);
			}
			return $focosR;
		}
		$this->close_connection();
	}
}
?>