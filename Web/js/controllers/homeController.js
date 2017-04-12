angular.module('app').controller('homeController', function($scope, $http, $cookies, auth, sharedVariables){
	//devolvemos a la vista el nombre del usuario
	$scope.usuario = JSON.parse($cookies.userInfo);
	var focosPorMes = [];
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
	$scope.getFocosPorFecha = function(){
		$http.get(ip + '/webApi.php?val=infoGeneralByMonth', {
			params:{
				usuario:parseInt($scope.usuario.cedula)
			}
		}).success(function (data) {
			//focosPorMes = data;
			console.log(data);
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
	};

/*-------------------------- Funciones del grafico de barras de Google --------------------*/
	$scope.getFocosPorFecha();
	// Load the Visualization API and the corechart package.
    google.charts.load('current', {'packages':['bar']});

    // Set a callback to run when the Google Visualization API is loaded.
    google.charts.setOnLoadCallback(drawChart);

    // Callback that creates and populates a data table,
    // instantiates the pie chart, passes in the data and
    // draws it.
	function drawChart($) {
        var data = google.visualization.arrayToDataTable([
          ['Meses', 'Sumideros', 'Viviendas', 'CDHs'],
          ['Ene', 1000, 400, 200],
          ['Feb', 1170, 460, 250],
          //['Mar', 660, focosPorMes[2], 300],
          ['Mar', 660, 1000, 300],
          ['Abr', 1030, 540, 350],
          ['May', 1030, 540, 350],
          ['Jun', 1030, 540, 350],
          ['Jul', 1030, 540, 350],
          ['Ago', 1030, 540, 350],
          ['Sep', 1030, 540, 350],
          ['Oct', 1030, 540, 350],
          ['Nov', 1030, 540, 350],
          ['Dic', 1030, 540, 350]
        ]);
        console.log();
        var options = {
          chart: {
            title: 'Focos de infección por mes',
            subtitle: '',
          }
        };

        var chart = new google.charts.Bar(document.getElementById('columnchart_material'));

        chart.draw(data, options);
    }

});