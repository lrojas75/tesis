<?php
require 'Modelo/usuarios.php';
 
class usuariosTest extends PHPUnit_Framework_TestCase
{
    private $usuario;
 
    protected function setUp()
    {
        $this->usuario = new usuarios();
    }
 
    protected function tearDown()
    {
        $this->usuario = NULL;
    }
	 
    public function testLogin(){
        //Usuario existe
        $result = $this->usuario->login('1144031675', 'joker');
        //Se compara contra 7 dado que la funcion de login trae todas las filas de la tabla cuando encuentra el usuario. De lo contrario retorna false.
        $this->assertCount(7, $result);
        //Usuario no existe
        $result = $this->usuario->login('123', 'joker');
        $this->assertFalse($result);
        //Contraseña invalida
        $result = $this->usuario->login('1144031675', '123');
        $this->assertFalse($result);
    }
    
    public function testBuscarUsuario(){
        //Usuario existe
        $result = $this->usuario->buscarUsuario('1144031675', 'joker');
        $this->assertNotEmpty($result);
        //Usuario no existe
        $result = $this->usuario->buscarUsuario('123', 'joker');
        $this->assertFalse($result);
    }
    
    public function testAgregarUsuario(){
        $oldUser = ['cedula'=>1144031675, 'correo'=>'feliperojas12@hotmail.com'];
        $user = ['cedula'=>123, 'password'=>'prueba'];
        //Usuario existe
        $result = $this->usuario->agregarUsuario($oldUser);
        $this->assertEquals("repetido",$result);
        
        // //Usuario no existe (No funciona)
        // $result = $this->usuario->agregarUsuario($user);
        // $this->assertNotEmpty($result);
    }

    public function testUpdateSupervisor(){
    	$data = array('IDSupervisor'=>1144031675, 'cedula'=>12345678);
    	$data2 = array('IDSupervisor'=>0, 'cedula'=>12345678);

        //Actualiza el supervisor del usuario
        $result = $this->usuario->updateSupervisor($data);
        $this->assertNotEmpty($result);
        //Deja al trabajador sin supervisor
        $result = $this->usuario->updateSupervisor($data2);
        $this->assertNotEmpty($result);
    }

    public function testUpdateRol(){
    	$data = array('nuevoRol'=>'true', 'cedula'=>12345678);
    	$data2 = array('nuevoRol'=>'false', 'cedula'=>12345678);
        //Se cambia el rol del usuario a supervisor
        $result = $this->usuario->updateRol($data);
        $this->assertNotEmpty($result);
        //Se cambia el rol del usuario a trabajador
        $result = $this->usuario->updateRol($data2);
        $this->assertNotEmpty($result);
    }
 
}
?>