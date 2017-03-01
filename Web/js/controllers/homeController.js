angular.module('app').controller('homeController', function($scope, $http, auth, $cookies){ 
    //devolvemos a la vista el nombre del usuario
    $scope.usuario = JSON.parse($cookies.userInfo);

    //la función logout que llamamos en la vista llama a la función
    //logout de la factoria auth
    $scope.logout = function(){
        auth.logout();
    };

    $scope.changeView= function(view){
        auth.changeLocation(view);
    };
});