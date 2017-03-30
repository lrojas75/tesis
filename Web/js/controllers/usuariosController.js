angular.module('app').controller('usersController', function($scope, $http, $filter, auth, sharedVariables, $cookies){
	$scope.Usuarios = [];

	$scope.modalMessage='';

	$scope.usuario = JSON.parse($cookies.userInfo);
	//Pagina actual
	$scope.paginaActual = 0;
	//Filtro de la info
	$scope.filterText='';
	//Tamano paginacion
	$scope.tamanoPagina=10;
	
	$scope.iniciarController = function(){
		$scope.filterText=sharedVariables.getProperty();
		console.log($scope.filterText);
		sharedVariables.setProperty('');
	};


	//logout de la factoria auth
	$scope.getAllUsers=function(){
		$http.get(ip + '/webApi.php?val=allUsers', {
			params:{
				usuario:$scope.usuario.cedula
			}
		}).success(function (data) {
			$scope.Usuarios = data;
			$scope.cambioDeDatos();
			//Eliminar al usuario activo del array
			var index = $scope.Usuarios.findIndex(x => x.cedula==parseInt($scope.usuario.cedula));
			$scope.Usuarios.splice(index, 1);
		}).error(function (data) {			
			$scope.modalMessage = "Error al consultar los usuarios.";
			$("#usuariosErrorModal").modal();
			setTimeout(function () {
				$("#usuariosErrorModal").modal("hide");
			}, 3000);
		});
	};
	//Funcion para cambiar los valores y que se filtren correctamente
	$scope.cambioDeDatos=function(){
		$scope.Usuarios.forEach(function (user) {
			if(user.rolUsuario == 'true'){
				user.rolUsuario="Supervisor"
			}else{
				user.rolUsuario="Trabajador"
			}

			if(user.IDSupervisor=='0'){
				user.IDSupervisor="No tiene";
			}
		});
	};

	//Filtra los datos de acuerdo al input
	$scope.filtrarDatos=function() {
		return $filter('filter')($scope.Usuarios, $scope.filterText);
	};

	$scope.numeroPaginas=function(){
		return Math.ceil($scope.filtrarDatos().length/$scope.tamanoPagina);
	};

	$scope.cambiarSupervisor=function(usuario){
		var jsonData = {
			//Si lo esta supervisando lo deja de supervisar
			IDSupervisor: usuario.IDSupervisor!=parseInt($scope.usuario.cedula) ? parseInt($scope.usuario.cedula):0,
			cedula: usuario.cedula
		};        
		$http.post(ip+'webApi.php?val=cambiarSupervisor',jsonData).success(function(data){
			usuario.IDSupervisor=usuario.IDSupervisor!=parseInt($scope.usuario.cedula) ? parseInt($scope.usuario.cedula):'No tiene supervisor';
		  }).error(function(data) {
			$scope.modalMessage = "No se pudo actualizar el supervisor.";
			$("#usuariosErrorModal").modal();
			setTimeout(function () {
				$("#usuariosErrorModal").modal("hide");
			}, 3000);
		  });
	};

	$scope.cambiarRol=function(usuario){
		$http.post(ip+'webApi.php?val=cambiarRol',{
			nuevoRol:usuario.rolUsuario=='Supervisor' ? 'false':'true',
			cedula: usuario.cedula
		}).success(function(data){
			usuario.rolUsuario= usuario.rolUsuario=='Supervisor' ? 'Trabajador' : 'Supervisor';
		  }).error(function(data) {
			$scope.modalMessage = "No se pudo actualizar el rol del usuario.";
			$("#usuariosErrorModal").modal();
			setTimeout(function () {
				$("#usuariosErrorModal").modal("hide");
			}, 3000);            
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
