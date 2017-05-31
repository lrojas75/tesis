angular.module('app').controller('homeController', function($scope, $http, $cookies, auth, sharedVariables){
	//devolvemos a la vista el nombre del usuario
	$scope.usuario = JSON.parse($cookies.userInfo);
	var focosPorMesVivienda = [];
	var focosPorMesSumidero = [];
	var focosPorMesCDH = [];
	//Variables para mostrar en el dashboard
	$scope.dashboardVariables={
		usuarios:0,
		focos:0,
		listaFocosPorMes:0
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
	$scope.getFocosGrafico = function(){
		$http.get(ip + '/webApi.php?val=focosGrafico', {
			params:{
				year:new Date().getFullYear()
			}
		}).success(function (data) {
			//Pos 1 vivienda, pos 2 sumidero, pos 3 cdh			
			$scope.focosPorMesVivienda=data[0];
			$scope.focosPorMesSumidero=data[1];
			$scope.focosPorMesCDH=data[2];
		}).error(function (data) {
			$scope.modalMessage = "Error al consultar los datos.";
			$("#focosErrorModal").modal();
			setTimeout(function () {
				$("#focosErrorModal").modal("hide");
			}, 3000);			
		});
	}


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
			case "captura":
				auth.changeLocation('/capturaDeDatos');
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
		$scope.getFocosGrafico();
		
	};

/*-------------------------- Funciones del grafico de barras de Google --------------------*/
	// Load the Visualization API and the corechart package.
    google.charts.load('current', {'packages':['bar']});

    // Set a callback to run when the Google Visualization API is loaded.
    google.charts.setOnLoadCallback(drawChart);

    // Callback that creates and populates a data table,
    // instantiates the pie chart, passes in the data and
    // draws it.
 	function drawChart($) {
 		//Los datos llegan asincronos, debemos verificar que ya esten listos
 		if($scope.focosPorMesVivienda!= undefined && $scope.focosPorMesSumidero!=undefined && $scope.focosPorMesCDH!=undefined){
	        var data = google.visualization.arrayToDataTable([
	          ['Meses', 'Viviendas', 'Sumideros', 'CDHs'],
	          ['Ene', $scope.focosPorMesVivienda[0], $scope.focosPorMesSumidero[0], $scope.focosPorMesCDH[0]],
	          ['Feb', $scope.focosPorMesVivienda[1], $scope.focosPorMesSumidero[1], $scope.focosPorMesCDH[1]],
	          ['Mar', $scope.focosPorMesVivienda[2], $scope.focosPorMesSumidero[2], $scope.focosPorMesCDH[2]],
	          ['Abr', $scope.focosPorMesVivienda[3], $scope.focosPorMesSumidero[3], $scope.focosPorMesCDH[3]],
	          ['May', $scope.focosPorMesVivienda[4], $scope.focosPorMesSumidero[4], $scope.focosPorMesCDH[4]],
	          ['Jun', $scope.focosPorMesVivienda[5], $scope.focosPorMesSumidero[5], $scope.focosPorMesCDH[5]],
	          ['Jul', $scope.focosPorMesVivienda[6], $scope.focosPorMesSumidero[6], $scope.focosPorMesCDH[6]],
	          ['Ago', $scope.focosPorMesVivienda[7], $scope.focosPorMesSumidero[7], $scope.focosPorMesCDH[7]],
	          ['Sep', $scope.focosPorMesVivienda[8], $scope.focosPorMesSumidero[8], $scope.focosPorMesCDH[8]],
	          ['Oct', $scope.focosPorMesVivienda[9], $scope.focosPorMesSumidero[9], $scope.focosPorMesCDH[9]],
	          ['Nov', $scope.focosPorMesVivienda[10], $scope.focosPorMesSumidero[10], $scope.focosPorMesCDH[10]],
	          ['Dic', $scope.focosPorMesVivienda[11], $scope.focosPorMesSumidero[11], $scope.focosPorMesCDH[11]]
	        ]);
	        var options = {
	          chart: {
	            title: 'Focos de infección por mes',
	            subtitle: '',
	          }
	        };

	        var chart = new google.charts.Bar(document.getElementById('columnchart_material'));

	        chart.draw(data, options);
        }else {
	    	setTimeout(drawChart, 5); //espera 5ms y vuelve a intentar
	  	}
    }

});