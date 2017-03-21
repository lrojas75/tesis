angular.module('app').controller('perfilController', function($scope, $http, $filter, auth, $cookies){
    $scope.modalMessage='';
    $scope.usuario = JSON.parse($cookies.userInfo);
    $scope.editarPerfil = false;

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
});
