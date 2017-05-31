<?php

require('vendor/autoload.php');
use GuzzleHttp\Client;

class WebApiTest extends PHPUnit_Framework_TestCase
{
    protected $client;

    protected function setUp(){
        $this->client = new GuzzleHttp\Client([
            'base_uri' => 'http://192.168.43.149:80/server/'
        ]);
    }
    //Probar el login de usuario
    public function testLogin(){
        //Usuario y contraseña correctos
        $response = $this->client->post('webApi.php?val=loginUsuario', ['json'=>['username'=>'1144031675', 'password'=>'joker']]);

        $this->assertEquals(200, $response->getStatusCode());
    }
    //Registrar un usuario
    public function testRegistroUsuario(){
        $response = $this->client->post('webApi.php?val=registroUsuario', ['json'=>['cedula'=>'1234', 'nombres'=>'prueba', 'apellidos'=>'prueba', 'correo'=>'prueba', 'password'=>'prueba', 'rol'=>'false']]);

        $this->assertEquals(200, $response->getStatusCode());
    }
    
    //Buscar un usuario en la base de datos
    public function testBuscarUsuario(){
        $response = $this->client->post('webApi.php?val=buscarUsuario', ['json'=>['username'=>'1144031675', 'password'=>'null']]);

        $this->assertEquals(200, $response->getStatusCode());
    }
    //Revisar si el usuario tiene creada una informacion general para el dia actual.
    public function testCheckInfoGeneral(){
        //Existe información general
        $response = $this->client->get('webApi.php?val=checkInfoGeneral', ['usuario'=>'1144031675', 'fecha'=>'13-04-2017']);

        $this->assertEquals(200, $response->getStatusCode());

        //No existe información general
        $response = $this->client->get('webApi.php?val=checkInfoGeneral', ['usuario'=>'1144031675', 'fecha'=>'13-04-2016']);
        $data = json_decode($response->getBody(), true);
        $this->assertEquals(null, $data);
    }
    //Obtener los insecticidas guardados en la base de datos.
    public function testObtenerInsecticidas(){
        $response = $this->client->get('webApi.php?val=obtenerInsecticidas', []);

        $this->assertEquals(200, $response->getStatusCode());
    }
    //Agregar informacion general
    public function testAddInfoGeneral(){
        $response = $this->client->post('webApi.php?val=addInfoGeneral', ['json'=>['id'=>'1234', 'municipio'=>'prueba', 'barrio'=>'prueba', 'comuna'=>'prueba', 'actividad'=>'prueba', 'fecha'=>'18-05-2017']]);

        $this->assertEquals(200, $response->getStatusCode());
    }
    //Modificar datos de la informacion general de un usuario
    public function testModInfoGeneral(){
        $response = $this->client->post('webApi.php?val=modInfoGeneral', ['json'=>['id'=>'1234', 'barrio'=>'prueba2', 'comuna'=>'prueba2', 'actividad'=>'prueba2']]);

        $this->assertEquals(200, $response->getStatusCode());
    }
    //Agregar un sumidero a la base de datos
    public function testAddSumidero(){
        $response = $this->client->post('webApi.php?val=addSumidero', ['json'=>['servicio'=>'addSumidero', 'tipo'=>'Sumidero', 'enviado'=>'false', 'estado'=>'prueba', 'larvas'=>'0', 'pupas'=>'0', 'tratado'=>'prueba', 'insecticida'=>'prueba', 'cantidadInsecticida'=>'0', 'idInfoGeneral'=>'42', 'ubicacion'=>'0']]);

        $this->assertEquals(200, $response->getStatusCode());
    }
    //Agregar una vivienda a la base de datos
    public function testAddVivienda(){
        $response = $this->client->post('webApi.php?val=addVivienda', ['json'=>['servicio'=>'addVivienda', 'tipo'=>'Vivienda', 'enviado'=>'false', 'clave'=>'prueba', 'habitantes'=>'0', 'nombres'=>'prueba', 'apellidos'=>'prueba', 'cedula'=>'prueba', 'depositos'=>'0', 'idInfoGeneral'=>'42', 'ubicacion'=>'0']]);

        $this->assertEquals(200, $response->getStatusCode());
    }
    public function testAddCDH(){
        $response = $this->client->post('webApi.php?val=addCDH', ['json'=>['servicio'=>'addCDH', 'nombre'=>'prueba', 'apellido'=>'prueba', 'cedula'=>'prueba', 'razonsocial'=>'prueba', 'tipo'=>'CDH', 'tipocdh'=>'prueba', 'encontrados'=>'0', 'potenciales'=>'0', 'toldillos'=>'0', 'observacion'=>'prueba', 'ubicacion'=>'0', 'infoID'=>'1234', 'plazo'=>'0']]);

        $this->assertEquals(200, $response->getStatusCode());
    }
}
?>