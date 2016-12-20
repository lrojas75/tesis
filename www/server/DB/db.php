<?php
abstract class DB {
	private static $db_host = "localhost";
	private static $db_user = "root";
	private static $db_pass = "";
	private static $db_name = "bd_tesis";
	protected $conn;
	protected $log;
  //---------ABRIR CONEXION EN BD----------------->>>
	public function open_connection() {
		$this->conn = new mysqli(self::$db_host, self::$db_user, self::$db_pass, self::$db_name);
		if ($this->conn->connect_error) {
      die('Error de conexión: ' . $this->conn->connect_error);
		}
	}
  //----------CERRAR CONEXION BD---------------->>>
	protected function close_connection() {
		$result =$this->conn->close();
	}
  //-----------EJECUTAR UN QUERY--------------->>>
	public function query($query, $parameters=NULL){
		$this->open_connection();
		$statement = $this->conn->prepare($query);
		if($statement){
			if (!is_null($parameters)&& count($parameters)>0) {
				foreach ($parameters as $parameter) {
					if (is_integer($parameter)) {
						$statement->bind_param ("i", $parameter);
					}
					elseif (is_double($parameter)) {
						$statement->bind_param("d", $parameter);
					}
					elseif (is_string($parameter)) {
						$statement->bind_param("s", $parameter);
					}
				}
			}
			$statement->execute();
			$result=$statement->get_result();
			$statement->close();
		}else{
			$log->error("Error preparing statement of query ".$query );
		}
		$this->close_connection();
		return $result;
	}
  //-------------------------->>>
}
?>