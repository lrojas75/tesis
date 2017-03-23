angular.module('app').controller('perfilController', function($scope, $http, $filter, auth, $cookies){
    $scope.modalMessage='';
    $scope.mostrarContrasena=false;
    $scope.confirmarContrasena='';
    $scope.usuario = JSON.parse($cookies.userInfo);
    $scope.usuarioCopia=JSON.parse($cookies.userInfo);
    $scope.contrasenaActual=$scope.usuario.password;

    $scope.cargoPerfil = function(){
        if($scope.usuario.rolUsuario == true){
            return "Supervisor";
        }else{
            return "Trabajador";
        }
    };

    $scope.logout = function(){
        auth.logout();
    };

    $scope.changeView= function(view){
        auth.changeLocation(view);
    };

    $scope.checkChange=function(){
        if (JSON.stringify($scope.usuario)==JSON.stringify($scope.usuarioCopia)) {
            return true;
        }else {
            return false;
        }
    };

    $scope.editarInformacion=function(){
        if ($scope.usuario.password==$scope.confirmarContrasena) {
            $http.post(ip + '/webApi.php?val=editarInformacion', {
                email:$scope.usuario.correo,
                contrasena:$scope.usuario.password,
                cedula:$scope.usuario.cedula
            }).success(function (data) {
                $scope.modalMessage = "Datos actualizados correctamente.";
                $("#perfilSuccessModal").modal();
                setTimeout(function () {
                    $("#perfilSuccessModal").modal("hide");
                }, 3000);
            }).error(function (data) {
                $scope.modalMessage = "No se pudo actualizar los datos. Intente más tarde.";
                $("#perfilErrorModal").modal();
                setTimeout(function () {
                    $("#perfilErrorModal").modal("hide");
                }, 3000);
            });
        }
        
    };

    $('#passwordUser').on('blur', function () {
        if ($scope.contrasenaActual!=$scope.usuario.password) {
            //Apply para que los datos del modelo se actualicen correctamente, hay que hacerlo porque esta dentro de un event y angular no sabe que hubo una variable modificada
            $scope.$apply(function() {
                    $scope.mostrarContrasena=true;
                });
        }
    });
    
});
