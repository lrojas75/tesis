var app = angular.module('movilapp', []);
var ip = "http://190.1.219.110";

app.controller("inicioController", ['$scope', '$http', function($scope, $http){
    $scope.existe = "";
    $scope.sesion = "";
    $scope.userLogin = "";
    $scope.passLogin = "";
    $scope.changeView = function(view){
        window.location.replace(view);            
    };

//<-----------------------FUNCION PARA INICIAR SESION ------------------------->
    $scope.login = function () {
        if ($scope.userLogin.trim()!='' && $scope.passLogin.trim()!=''){
            $http.post(ip+'/webApi.php?val=loginUsuario',{
                username: $scope.userLogin,
                password: $scope.passLogin
            }).success(function(data) {
                window.localStorage.setItem("usuario", $scope.userLogin);
                window.localStorage.setItem("previousPage", "index.html");
                window.location.replace("infoGeneral.html");
            }).error(function(data) {
                console.log('Error: ' + data);
                $scope.username="";
                $scope.password="";
                $scope.loginError = "Usuario y/o Contraseña invalidos.";
            });
        }
        else {
            $scope.loginError = "No puede haber campos vacíos.";
        }
    };


    //<-----------------------FUNCION PARA REGISTRAR UN USUARIO NUEVO ------------------------->
    $scope.registro = function(){
        $http.post(ip+'/webApi.php?val=registroUsuario',{
            cedula: $scope.cedula,
            nombres: $scope.nombres,
            apellidos: $scope.apellidos,
            password: $scope.passRegistro

        }).success(function(data) {
            alert("Usuario registrado con exito!");
            $scope.cedula = "";
            $scope.nombres = "";
            $scope.apellidos = "";
            $scope.passRegistro = "";
        }).error(function(data) {
            console.log('Error: ' + data);
            $scope.registerError = "No se pudo registrar al usuario.";
        });
    };

}]);