angular.module('app').controller("loginController", function($scope, $http, auth){
    $scope.showLogin=true;
    $scope.loginForm={
        usuario:'',
        contrasena:'',
        coordinador:false
    };
    $scope.registroForm={
        nombres:'',
        apellidos:'',
        cedula:'',
        contrasena:'',
        coordinador:false
    };
//<--------------------------FUNCION PARA INICIO DE SESION ------------------------------------->
  $scope.login = function(){

    $http.post(ip+'webApi.php?val=loginUsuario',{
      username: $scope.loginForm.usuario,
      password: $scope.loginForm.contrasena
    }).success(function(data) {        
        auth.login(data);        
    }).error(function(data) {
      console.log('Error: ' + data);
      $scope.loginError = "Usuario, Rol y/o Contraseña invalidos.";
    });
  };

  $scope.register = function(){    
    $http.post(ip+'webApi.php?val=registroUsuario',{
        cedula: $scope.registroForm.cedula,
        nombres: $scope.registroForm.nombres,
        apellidos: $scope.registroForm.apellidos,
        password: $scope.registroForm.contrasena,
        rol: JSON.stringify($scope.registroForm.coordinador)        
      }).success(function(data){        
        alert("Usuario registrado con exito!");
        auth.login($scope.registroForm.usuario, $scope.registroForm.contrasena,$scope.registroForm.coordinador);
      }).error(function(data) {        
        if (data=="repetido") {
            $scope.registerError ="Ya hay un usuario registrado con la cédula: "+$scope.registroForm.cedula;            
        }else{
            $scope.registerError = "No se pudo registrar al usuario.";
        }        
      });
  };  

  //Intercambia entre login y registro
  $scope.changePage=function(){
    $scope.showLogin=!$scope.showLogin;
  };
});
