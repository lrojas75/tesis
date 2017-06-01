var app = angular.module('movilapp', []);
//Ip publica
//var ip = "http://181.53.57.112:3000/server";
var ip = "http://192.168.0.123/server";

app.controller("inicioController", ['$scope', '$http', function($scope, $http){
    $scope.loginError = '';
    $scope.registerError = '';
    $scope.loginForm = {
        usuario: '',
        contrasena: '',
        coordinador: false
    };
    $scope.registroForm = {
        nombres: '',
        apellidos: '',
        correo: '',
        cedula: '',
        contrasena: '',
        coordinador: false
    };
    $scope.changeView = function(view){
        window.location.replace(view);            
    };
    //-----------------------Cambio de IP ---------------------------------
    window.localStorage.setItem("ipServer", ip);
    $scope.cambioIP = function () {
        if ($scope.ipServer.trim() != '') {
            ip = "http://"+$scope.ipServer;
            window.localStorage.setItem("ipServer", ip);
            alert("Se cambió la IP del servidor a: " + ip);
        } else {
            alert("El campo esta vacio");
        }
    };
    //--------------------- FIN cambio IP -----------------------------------

//<-----------------------FUNCION PARA INICIAR SESION ------------------------->
    $scope.login = function () {
        if ($scope.loginForm.usuario.toString().trim()!='' && $scope.loginForm.contrasena.trim()!=''){
            $http.post(ip+'/webApi.php?val=loginUsuario',{
                username: $scope.loginForm.usuario,
                password: $scope.loginForm.contrasena
            }).success(function(data) {
                window.localStorage.setItem("usuario", $scope.loginForm.usuario);                
                window.location.replace("infoGeneral.html");
            }).error(function(data) {
                $scope.loginForm.usuario = "";
                $scope.loginForm.contrasena = "";
                $scope.loginError = "Usuario y/o Contraseña invalidos.";
            });
        }
        else {
            $scope.loginError = "No puede haber campos vacíos.";
        }
    };


    //<-----------------------FUNCION PARA REGISTRAR UN USUARIO NUEVO ------------------------->
    $scope.registro = function () {
        if ($scope.registroForm.nombres.trim() != '' && $scope.registroForm.apellidos.trim() != '' && $scope.registroForm.cedula.toString().trim() != '' && $scope.registroForm.contrasena.trim() != '') {
            $http.post(ip + '/webApi.php?val=registroUsuario', {
                cedula: $scope.registroForm.cedula,
                nombres: $scope.registroForm.nombres,
                apellidos: $scope.registroForm.apellidos,
                correo: $scope.registroForm.correo,
                password: $scope.registroForm.contrasena,
                rol: JSON.stringify($scope.registroForm.coordinador)
            }).success(function (data) {
                console.log(data);
                $("#registerModal").modal();
                setTimeout(function () {
                    $("#registerModal").modal("hide");
                }, 3000);
                $scope.registroForm.cedula = "";
                $scope.registroForm.nombres = "";
                $scope.registroForm.apellidos = "";
                $scope.registroForm.contrasena = "";
                $scope.registroForm.correo = "";
                $scope.registerError = "";
            }).error(function (data) {
                console.log(typeof data);
                if (data == undefined) {
                    $scope.registerError = "Ya hay un usuario registrado con la misma cédula o el mismo correo.";
                } else {
                    $scope.registerError = "No se pudo registrar al usuario.";
                }
            });
        } else {
            $scope.registerError = "No pueden haber campos vacios.";
        }
        
    };

    $scope.checkSession = function () {        
        var idInfoGeneral = window.localStorage.getItem("infoID");
        var usuario = window.localStorage.getItem("usuario");

        if (idInfoGeneral !== null && usuario !== null) {
            window.location.replace("menuTipos.html");
        }
    };
}]);