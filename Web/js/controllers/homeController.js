angular.module('app').controller('homeController', function($scope, $http, $cookies, auth, sharedVariables){
	//devolvemos a la vista el nombre del usuario
	$scope.usuario = JSON.parse($cookies.userInfo);

	//Variables para mostrar en el dashboard
	$scope.dashboardVariables={
		usuarios:0,
		focos:0
	}
	//la función logout que llamamos en la vista llama a la función
	//logout de la factoria auth
	$scope.logout = function(){
		auth.logout();
	};

	$scope.changeView= function(view){
		auth.changeLocation(view);
	};

	$scope.getAllUsers=function(){
		$http.get(ip + '/webApi.php?val=allUsers', {
			params:{
				usuario:$scope.usuario.cedula
			}
		}).success(function (data) {
			$scope.Usuarios = data;
			//Eliminar al usuario activo del array
			var index = data.findIndex(x => x.cedula==parseInt($scope.usuario.cedula));
			data.splice(index, 1);

			data.forEach(function (user) {
				if(user.IDSupervisor==$scope.usuario.cedula){
					$scope.dashboardVariables.usuarios+=1;
				}
			});
		}).error(function (data) {
			alert("Error al consultar los usuarios");
		});
	};

	$scope.getAllFocos=function(){
		$http.get(ip + '/webApi.php?val=allFocos', {
			params:{
				usuario:parseInt($scope.usuario.cedula)
			}
		}).success(function (data) {
			$scope.dashboardVariables.focos = data.length;
		}).error(function (data) {
			$scope.modalMessage = "Error al consultar los datos.";
			$("#focosErrorModal").modal();
			setTimeout(function () {
				$("#focosErrorModal").modal("hide");
			}, 3000);
		});
	};


	//Funciones para el cambio de paginas con valores
	$scope.irController = function(pagina){
		switch (pagina) {
			case "usuarios":
				sharedVariables.setProperty($scope.usuario.cedula);
				auth.changeLocation('/usuarios');
				break;
			case "focos":
				auth.changeLocation('/focosDeInfeccion');
				break;
			case "mapa":
				sharedVariables.setProperty("MapaActive");
				auth.changeLocation('/focosDeInfeccion');
				break;

			default:
				// statements_def
				break;
		}
		
	};

	//Contiene todas las funciones que inicializan las variables del dashboard
	$scope.iniciarDashboard=function(){
		$scope.getAllUsers();
		$scope.getAllFocos();
	};

});