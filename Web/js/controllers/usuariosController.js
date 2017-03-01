angular.module('app').controller('usersController', function($scope, $http, $filter, auth, $cookies){
    $scope.Usuarios = [];    
    $scope.usuario = JSON.parse($cookies.userInfo);
    //Pagina actual
    $scope.paginaActual = 0;
    //Filtro de la info
    $scope.filterText='';
    //Tamano paginacion
    $scope.tamanoPagina=10;
    //la función logout que llamamos en la vista llama a la función
    //logout de la factoria auth
    $scope.getAllUsers=function(){
        $http.get(ip + '/webApi.php?val=allUsers', {
            params:{
                usuario:$scope.usuario.cedula
            }
        }).success(function (data) {
            $scope.Usuarios = data;
            //Eliminar al usuario activo del array
            var index = $scope.Usuarios.findIndex(x => x.cedula==parseInt($scope.usuario.cedula));
            $scope.Usuarios.splice(index, 1);
        }).error(function (data) {
            alert("Error al consultar los usuarios");
        });
    };
    //Filtra los datos de acuerdo al input
    $scope.getData=function() {
        return $filter('filter')($scope.Usuarios, $scope.filterText);
    };

    $scope.numeroPaginas=function(){
        return Math.ceil($scope.getData().length/$scope.tamanoPagina);
    };

    $scope.cambiarSupervisor=function(usuario){
        var jsonData = {
            //Si lo esta supervisando lo deja de supervisar
            IDSupervisor: usuario.IDSupervisor!=parseInt($scope.usuario.cedula) ? parseInt($scope.usuario.cedula):0,
            cedula: usuario.cedula
        };        
        $http.post(ip+'webApi.php?val=cambiarSupervisor',jsonData).success(function(data){
            usuario.IDSupervisor=usuario.IDSupervisor!=parseInt($scope.usuario.cedula) ? parseInt($scope.usuario.cedula):0;
          }).error(function(data) {
            alert('No se pudo actualizar el supervisor');
          });
    };

    $scope.cambiarRol=function(usuario){
        $http.post(ip+'webApi.php?val=cambiarRol',{
            nuevoRol:JSON.stringify(!JSON.parse(usuario.rolUsuario)),
            cedula: usuario.cedula
        }).success(function(data){
            usuario.rolUsuario=JSON.stringify(!JSON.parse(usuario.rolUsuario));
          }).error(function(data) {
            alert('No se pudo actualizar el rol del usuario');
          });
    };

    $scope.usuariosSupervisados=function(){
        $scope.filterText=$scope.usuario.cedula;
    };
    $scope.logout = function(){
        auth.logout();
    };

    $scope.changeView= function(view){
        auth.changeLocation(view);
    };
    $scope.getAllUsers();
});
