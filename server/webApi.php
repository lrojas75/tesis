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
      if ($result){        
        $this->response(json_encode($result), 200 );
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
    //<--------FUNCION PARA BUSCAR UN USUARIO------------------>

  private function buscarUsuario(){
    if ($this->get_request_method () != "POST") {
      $this->response ( '', 406 );
    }else{
      $usuario = new usuarios();
      $data = json_decode(file_get_contents('php://input'),true);
      $result=$usuario->buscarUsuario($data["username"],$data["password"]);
      if ($result){        
        $this->response(json_encode($result), 200 );
      } else {
        $this->response('', 400 );
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
      if ($result) {
        $this->response(json_encode($result),200);
      }else{
        $this->response('',400);
      }
      
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
      if ($result){
        echo $result;
        $this->response('', 200 );
      } else {
        $this->response($result, 400 );
      }
    }
  }

  private function addCDH(){
    if ($this->get_request_method () != "POST") {
      $this->response ( '', 406 );
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
//<<----------------------------FUNCIONES PARA MODIFICAR USUARIOS -------------------------------->>

  private function allUsers(){
    if ($this->get_request_method () != "GET") {
      $this->response ( '', 406 );
    }else{
      $usuario =  new usuarios();
      $user = $_GET['usuario'];      
      $result = $usuario->getUsers($user);
      if ($result) {
        $this->response(json_encode($result),200);        
      }else{
        $this->response('',400);        
      }
      
    }
  }

  private function cambiarSupervisor(){
    if ($this->get_request_method () != "POST") {
      $this->response ( '', 406 );
    }else{
      $usuario =  new usuarios();
      $data = json_decode(file_get_contents('php://input'),true);
      $result = $usuario->updateSupervisor($data);
      if ($result) {
        $this->response($result,200);
      }else{
        $this->response('',400);
      }     
      
    }
  }

  private function cambiarRol(){
    if ($this->get_request_method () != "POST") {
      $this->response ( '', 406 );
    }else{
      $usuario =  new usuarios();
      $data = json_decode(file_get_contents('php://input'),true);
      $result = $usuario->updateRol($data);
      if ($result) {
        $this->response('',200);
      }else{
        $this->response('',400);
      }
    }
  }

private function editarInformacion(){
    if ($this->get_request_method () != "POST") {
      $this->response ( '', 406 );
    }else{
      $usuario =  new usuarios();
      $data = json_decode(file_get_contents('php://input'),true);
      $result = $usuario->updateInfo($data);
      if ($result) {
        $this->response('',200);
      }else{
        $this->response('',400);
      }
    }
  }


//<<----------------------------FUNCIONES PARA FOCOS DE INFECCION WEB -------------------------------->>
  private function allFocos(){
    if ($this->get_request_method () != "GET") {
      $this->response ( '', 406 );
    }else{
      $focoinfeccion = new focoInfeccion();
      $user = $_GET['usuario'];
      $result = $focoinfeccion->getFocos($user);
      $this->response(json_encode($result),200);
    }
  }

  private function insertinsecticida(){
    if ($this->get_request_method () != "POST") {
      $this->response ( '', 406 );
    }else{
      $focoinfeccion =  new focoInfeccion();
      $data = json_decode(file_get_contents('php://input'),true);
      $result = $focoinfeccion->insertInsecticida($data['nombre'],$data['usuario']);
      if ($result) {
        $this->response('',200);
      }else{
        $this->response('',400);
      }
    }
  }

  private function deleteinsecticida(){
    if ($this->get_request_method () != "POST") {
      $this->response ( '', 406 );
    }else{
      $focoinfeccion =  new focoInfeccion();
      $data = json_decode(file_get_contents('php://input'),true);
      $result = $focoinfeccion->deleteInsecticida($data['idInsecticida']);
      if ($result) {
        $this->response('',200);
      }else{
        $this->response('',400);
      }
    }

  }
/*-------------------- Funciones del DASHBOARD ------------------------*/
  private function infoGeneralByMonth(){
    $focos = [];
    $ene = [0,0,0];
    $feb = [0,0,0];
    $mar = [0,0,0];
    $abr = [0,0,0];
    $mayo = [0,0,0];
    $jun = [0,0,0];
    $jul = [0,0,0];
    $ago = [0,0,0];
    $sept = [0,0,0];
    $oct = [0,0,0];
    $nov = [0,0,0];
    $dic = [0,0,0];
    $total = 0;
    if ($this->get_request_method () != "GET") {
      $this->response ( '', 406 );
    }else{
      $infogeneral =  new infoGeneral();
      $focoinfeccion =  new focoInfeccion();
      $user = $_GET['usuario'];
      $result = $infogeneral->infoGeneralPorMes($user);
      if($result){
        foreach ($result as $info) {
          $date = strtotime($info['fecha']);
          $mes = date("F", $date);
          $resultSumidero = $focoinfeccion->focosPorId($info['id'],'Sumidero');
          $resultVivienda = $focoinfeccion->focosPorId($info['id'],'Vivienda');
          $resultCDH = $focoinfeccion->focosPorId($info['id'],'CDH');
          switch ($mes) {
            case "January":
              $ene[0] = $ene[0]+count($resultSumidero);
              $ene[1] = $ene[1]+count($resultVivienda);
              $ene[2] = $ene[2]+count($resultCDH);
              break;
            case "February":
              $feb[0] = $feb[0]+count($resultSumidero);
              $feb[1] = $feb[1]+count($resultVivienda);
              $feb[2] = $feb[2]+count($resultCDH);
              break;
            case "March":
              $mar[0] = $mar[0]+count($resultSumidero);
              $mar[1] = $mar[1]+count($resultVivienda);
              $mar[2] = $mar[2]+count($resultCDH);
              break;
            case "April":
              $abr[0] = $abr[0]+count($resultSumidero);
              $abr[1] = $abr[1]+count($resultVivienda);
              $abr[2] = $abr[2]+count($resultCDH);
              break;
            case "May":
              $mayo[0] = $mayo[0]+count($resultSumidero);
              $mayo[1] = $mayo[1]+count($resultVivienda);
              $mayo[2] = $mayo[2]+count($resultCDH);
              break;
            case "June":
              $jun[0] = $jun[0]+count($resultSumidero);
              $jun[1] = $jun[1]+count($resultVivienda);
              $jun[2] = $jun[2]+count($resultCDH);
              break;
            case "July":
              $jul[0] = $jul[0]+count($resultSumidero);
              $jul[1] = $jul[1]+count($resultVivienda);
              $jul[2] = $jul[2]+count($resultCDH);
              break;
            case "August":
              $ago[0] = $ago[0]+count($resultSumidero);
              $ago[1] = $ago[1]+count($resultVivienda);
              $ago[2] = $ago[2]+count($resultCDH);
              break;
            case "September":
              $sept[0] = $sept[0]+count($resultSumidero);
              $sept[1] = $sept[1]+count($resultVivienda);
              $sept[2] = $sept[2]+count($resultCDH);
              break;
            case "October":
              $oct[0] = $oct[0]+count($resultSumidero);
              $oct[1] = $oct[1]+count($resultVivienda);
              $oct[2] = $oct[2]+count($resultCDH);
              break;
            case "November":
              $nov[0] = $nov[0]+count($resultSumidero);
              $nov[1] = $nov[1]+count($resultVivienda);
              $nov[2] = $nov[2]+count($resultCDH);
              break;
            case "December":
              $dic[0] = $dic[0]+count($resultSumidero);
              $dic[1] = $dic[1]+count($resultVivienda);
              $dic[2] = $dic[2]+count($resultCDH);
              break;
            default:
              $focos = ["No hay 1"];
          }
        }
        $focos = array($ene,$feb,$mar,$abr,$mayo,$jun,$jul,$ago,$sept,$oct,$nov,$dic);
        $this->response(json_encode($focos),200);
      }else{
        $focos = ["No hay 2"];
        $this->response(json_encode($focos),200);
      }
      
    }
  }

}

$api = new webApi();
$api->processApi();
?>