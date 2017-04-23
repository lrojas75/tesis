angular.module('app').controller('reportesController', function($scope, $http, $cookies, auth, sharedVariables){
	$scope.usuario = JSON.parse($cookies.userInfo);
	$scope.paginaActual = 0;
	$scope.tamanoPagina = 5;
	$scope.mesusuario = '';
	var hoy = new Date();
	$scope.yearusuario = hoy.getFullYear();
	$scope.todos = [];
	$scope.meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
	$scope.focosReporteSumidero = [{"Municipio":"Cali","cantidad":0,"positivos":0,"tratados":0,"insecticida":"-","totalinsecticida":0},
		{"Municipio":"Palmira","cantidad":0,"positivos":0,"tratados":0,"insecticida":"-","totalinsecticida":0},
		{"Municipio":"Yumbo","cantidad":0,"positivos":0,"tratados":0,"insecticida":"-","totalinsecticida":0}];
	$scope.focosReporteVivienda = [{"Municipio":"Cali","cantidad":0,"depositos":0,"tratados":0,"eliminados":0,"larvas":0,"insecticida":0},
		{"Municipio":"Palmira","cantidad":0,"depositos":0,"tratados":0,"eliminados":0,"larvas":0,"insecticida":0},
		{"Municipio":"Yumbo","cantidad":0,"depositos":0,"tratados":0,"eliminados":0,"larvas":0,"insecticida":0}];
	$scope.focosReporteCDH = [{"Municipio":"Cali","cantidad":0,"depositos":0,"tratados":0,"eliminados":0,"larvas":0,"insecticida":0},
		{"Municipio":"Palmira","cantidad":0,"depositos":0,"tratados":0,"eliminados":0,"larvas":0,"insecticida":0},
		{"Municipio":"Yumbo","cantidad":0,"depositos":0,"tratados":0,"eliminados":0,"larvas":0,"insecticida":0}];


	$scope.logout = function(){
		auth.logout();
	};
	$scope.changeView= function(view){
		auth.changeLocation(view);
	};
	$scope.numeroPaginas=function(){
		return Math.ceil($scope.filtrarFocos().length/$scope.tamanoPagina);
	};

	$scope.selectedMonth = function (mes) {
        var index = $scope.meses.indexOf(mes)+1;
        $scope.mesusuario = index;
        console.log("Funcion cambio de mes: "+$scope.mesusuario);
    }

	$scope.filtrarPorMes = function(){
		if($scope.todos.length > 0){
			//Sumideros
			var temp = [];
			for (i = 0; i < $scope.todos[0].length; i++) {
				var split = $scope.todos[0][i].fecha.split("-");
				console.log(split);
				var fechaFoco = new Date(split[2], split[1], split[0]);
				$scope.mesFoco = fechaFoco.getMonth();
				if($scope.mesFoco == $scope.mesusuario){
					temp.push($scope.todos[0][i]);
				}
			}
			$scope.focosReporteSumidero = temp;
			//Viviendas
			var temp = [];
			for (i = 0; i < $scope.todos[1].length; i++) {
				var split = $scope.todos[1][i].fecha.split("-");
				var fechaFoco = new Date(split[2], split[1], split[0]);
				$scope.mesFoco = fechaFoco.getMonth();
				if($scope.mesFoco == $scope.mesusuario){
					temp.push($scope.todos[1][i]);
				}
			}
			$scope.focosReporteVivienda = temp;
			//CDH
			var temp = [];
			for (i = 0; i < $scope.todos[2].length; i++) {
				var split = $scope.todos[2][i].fecha.split("-");
				var fechaFoco = new Date(split[2], split[1], split[0]);
				$scope.mesFoco = fechaFoco.getMonth();
				if($scope.mesFoco == $scope.mesusuario){
					temp.push($scope.todos[2][i]);
				}
			}
			$scope.focosReporteCDH = temp;
		}else{
			$scope.focosReporteSumidero = [{"Municipio":"Cali","cantidad":0,"positivos":0,"tratados":0,"insecticida":"-","totalinsecticida":0},
				{"Municipio":"Palmira","cantidad":0,"positivos":0,"tratados":0,"insecticida":"-","totalinsecticida":0},
				{"Municipio":"Yumbo","cantidad":0,"positivos":0,"tratados":0,"insecticida":"-","totalinsecticida":0}];
			$scope.focosReporteVivienda = [{"Municipio":"Cali","cantidad":0,"depositos":0,"tratados":0,"eliminados":0,"larvas":0,"insecticida":0},
				{"Municipio":"Palmira","cantidad":0,"depositos":0,"tratados":0,"eliminados":0,"larvas":0,"insecticida":0},
				{"Municipio":"Yumbo","cantidad":0,"depositos":0,"tratados":0,"eliminados":0,"larvas":0,"insecticida":0}];
			$scope.focosReporteCDH = [{"Municipio":"Cali","cantidad":0,"depositos":0,"tratados":0,"eliminados":0,"larvas":0,"insecticida":0},
				{"Municipio":"Palmira","cantidad":0,"depositos":0,"tratados":0,"eliminados":0,"larvas":0,"insecticida":0},
				{"Municipio":"Yumbo","cantidad":0,"depositos":0,"tratados":0,"eliminados":0,"larvas":0,"insecticida":0}];
		}
		
	};

	$scope.getInfoReporte = function(){
		$http.get(ip + '/webApi.php?val=focosReporte', {
			params:{
				year: $scope.yearusuario
			}
		}).success(function (data) {
			///Posicion 0 = Sumideros, posicion 1 =  Viviendas, posicion 2 = cdhs
			if(data.length > 0){
				if($scope.mesusuario == ''){
					var date = new Date();
					$scope.mesusuario = date.getMonth()+1; //obtiene el mes actual
				}
				$scope.todos = data;
				
				// $scope.dataFiltrada = $scope.filtrarPorMes(data[0]);
				// console.log($scope.dataFiltrada);
				// if($scope.dataFiltrada.length > 0){
				// 	$scope.focosReporteSumidero=$scope.dataFiltrada;
				// }
				// $scope.dataFiltrada = $scope.filtrarPorMes(data[1]);
				// if($scope.dataFiltrada.length > 0){
				// 	$scope.focosReporteVivienda=$scope.dataFiltrada;
				// }
				// $scope.dataFiltrada = $scope.filtrarPorMes(data[2]);
				// if($scope.dataFiltrada.length > 0){
				// 	$scope.focosReporteCDH=$scope.dataFiltrada;
				// }
			}else{
				$scope.todos = [];
				console.log("Vacio");
			}
			
		}).error(function (data) {
			$scope.modalMessage = "Error al consultar los datos.";
			$("#focosErrorModal").modal();
			setTimeout(function () {
				$("#focosErrorModal").modal("hide");
			}, 3000);			
		});
	};
	$scope.getInfoReporte();
	$scope.filtrarPorMes();
});