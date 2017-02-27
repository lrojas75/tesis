<?php
require_once 'restApi.php';
require_once 'Modelo/usuarios.php';
require_once 'Modelo/infogeneral.php';
require_once 'Modelo/focoinfeccion.php';


class WebAPI extends REST {

  public function processApi() {
    $func = strtolower (trim (str_replace ( "/", "", $_REQUEST ['val'])));
    if (( int ) method_exists ($this, $func) > 0){
      $this->$func ();
    }else{
      $this->response ( '', 404 );
    }
  }

    //<--------FUNCION PARA VALIDAR UN USUARIO PARA LOGIN------------------>
  private function loginUsuario(){
    if ($this->get_request_method () != "POST") {
      $this->response ( '', 406 );
    }else{
      $usuario = new usuarios();
      $data = json_decode(file_get_contents('php://input'),true);
      $result=$usuario->login($data["username"],$data["password"]);
      if ($result=="yes"){        
        $this->response('', 200 );
      } else {
        $this->response('', 400 );
      }
    }
  }

    private function getUserData(){
    if ($this->get_request_method () != "GET") {
      $this->response ( '', 406 );
    }else{
      $usuario = new usuarios();
      $user = $_GET['usuario'];      
      $data = json_decode(file_get_contents('php://input'),true);
      $result=$usuario->lookUser($user);
      if ($result){
        $sendData=json_encode($result);
        $this->response($sendData, 200 );
      } else {
        $this->response('', 400 );
      }
    }
  }

    //<--------FUNCION PARA AGREGAR UN USUARIO NUEVO------------------>
  private function registroUsuario(){
    if ($this->get_request_method () != "POST") {
      $this->response ( '', 406 );
    }
    else{
      $usuario = new usuarios();
      $data = json_decode(file_get_contents('php://input'),true);
      $result = $usuario->agregarUsuario($data);
      if ($result == "TRUE"){
        $this->response($result, 200 );
      } else {
        if ($result=="repetido") {
          $this->response("repetido", 406 );
          # code...
        }else{
          $this->response($result, 400 );

        }
      }
    }
  }

//<<--------------------------FUNCION PARA VALIDAR QUE NO HAYA MÁS DE UNA INFORMACIÓN GENERAL POR DIA------------->>
  private function checkInfoGeneral(){
    if ($this->get_request_method () != "GET") {
      $this->response ( '', 406 );
    }else{
      $infogeneral =  new infoGeneral();
      $user = $_GET['usuario'];
      $fecha= $_GET['fecha'];
      $result = $infogeneral->checkInformacionGeneral($user,$fecha);
      $this->response(json_encode($result),200);
    }
  }

//<<--------------------------FUNCION PARA OBTENER LOS INSECTICIDAS------------->>
 private function obtenerInsecticidas(){
    if ($this->get_request_method () != "GET") {
      $this->response ( '', 406 );
    }else{
      $insecticidas =  new focoInfeccion();
      $result = $insecticidas->getInsecticidas();
      $this->response(json_encode($result),200);
    }
  }

//<<----------------------------FUNCIONES PARA GUARDAR DATOS DE INFORMACION GENERAL -------------------------------->>
  private function addInfoGeneral(){
    if ($this->get_request_method () != "POST") {
      $this->response ( '', 406 );
    }else{
      $infogeneral = new infoGeneral();
      $data = json_decode(file_get_contents('php://input'),true);
      $result = $infogeneral->agregarInformacionGeneral($data);
      if ($result == "TRUE"){
        $this->response('', 200 );
      } else {
        $this->response('', 400 );
      }
    }
  }

  public function modInfoGeneral(){
    if ($this->get_request_method () != "POST") {
      $this->response ( '', 406 );
    }else{
      $infogeneral=new infoGeneral();
      $data = json_decode(file_get_contents('php://input'),true);
      $result=$infogeneral->agregarComunaBarrio($data);
      if ($result == "TRUE"){
        $this->response('', 200 );
      } else {
        $this->response('', 400 );
      }
    }
  }
//<<----------------------------FUNCIONES PARA GUARDAR DATOS DE FOCOS DE INFECCION -------------------------------->>

  private function addSumidero(){
    if ($this->get_request_method () != "POST") {
      $this->response ( '', 406 );
    }else{
      $focoinfeccion = new focoInfeccion();
      $data = json_decode(file_get_contents('php://input'),true);
      $result = $focoinfeccion->agregarSumidero($data);
      if ($result == "TRUE"){
        $this->response('', 200 );
      } else {
        $this->response('', 400 );
      }
    }
  }

  private function addVivienda(){
    if ($this->get_request_method () != "POST") {
      $this->response ( '', 406 );
    }else{
      $focoinfeccion = new focoInfeccion();
      $data = json_decode(file_get_contents('php://input'),true);
      $result = $focoinfeccion->agregarVivienda($data);
      if ($result == "TRUE"){
        echo $result;
        $this->response('', 200 );
      } else {
        $this->response($result, 400 );
      }
    }
  }

  private function addCDH(){
    if ($this->get_request_method () != "POST") {
      $this->response ( 'Metodo', 406 );
    }else{
      $focoinfeccion = new focoInfeccion();
      $data = json_decode(file_get_contents('php://input'),true);
      $result = $focoinfeccion->agregarCDH($data);
      if ($result == "TRUE"){
        echo $result;
        $this->response('', 200 );
      } else {
        $this->response($result, 400 );
      }
    }
  }

  private function allUsers(){
    if ($this->get_request_method () != "GET") {
      $this->response ( '', 406 );
    }else{
      $usuario =  new usuarios();
      $result = $usuario->getUsers();
      $this->response(json_encode($result),200);      
    }
  }

  private function cambiarSupervisor(){
    if ($this->get_request_method () != "POST") {
      $this->response ( '', 406 );
    }else{
      $usuario =  new usuarios();
      $data = json_decode(file_get_contents('php://input'),true);      
      $result = $usuario->updateSupervisor($data);
      $this->response($result,200);
    }
  }

}

$api = new webApi();
$api->processApi();
?>