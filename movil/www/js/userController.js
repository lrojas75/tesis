var app = angular.module('movilapp', []);
//Ip publica
//var ip = "http://181.53.57.112:3000/server";
var ip = "http://192.168.0.7:3000/server";

app.controller("inicioController", ['$scope', '$http', function($scope, $http){
    $scope.existe = "";
    $scope.sesion = "";
    $scope.userLogin = "";
    $scope.passLogin = "";

    $scope.changeView = function(view){
        window.location.replace(view);            
    };
    //-----------------------Cambio de IP ---------------------------------
    window.localStorage.setItem("ipServer", ip);
    $scope.cambioIP = function () {
        if ($scope.ipServer.trim() != '') {
            ip = $scope.ipServer;
            window.localStorage.setItem("ipServer", ip);
            alert("Se cambió la IP del servidor a: " + ip);
        } else {
            alert("El campo esta vacio");
        }
    };
    //--------------------- FIN cambio IP -----------------------------------

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
            password: $scope.passRegistro,
            rol: JSON.stringify(false)
        }).success(function(data) {
            alert("Usuario registrado con exito!");
            $scope.cedula = "";
            $scope.nombres = "";
            $scope.apellidos = "";
            $scope.passRegistro = "";
        }).error(function (data) {            
            if (data == "repetido") {
                $scope.registerError = "Ya hay un usuario registrado con la cédula: " + $scope.cedula;
            } else {
                $scope.registerError = "No se pudo registrar al usuario.";
            }            
        });
    };

    $scope.checkSession = function () {
        var idInfoGeneral = window.localStorage.getItem("infoID");
        var usuario = window.localStorage.getItem("usuario");
        if (idInfoGeneral !== null && usuario !== null) {
            window.location.replace("menuTipos.html");
        }
    };
}]);