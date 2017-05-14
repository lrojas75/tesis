angular.module('app').controller('reportesController', function($scope,$filter, $http, $cookies, auth, sharedVariables){
	$scope.usuario = JSON.parse($cookies.userInfo);
	$scope.mesusuario = '';
	var hoy = new Date();
	$scope.yearusuario = hoy.getFullYear();
	$scope.todos = [];
	$scope.meses = [
	{mes:'Enero', valor:'-01-'}, 
	{mes:'Febrero', valor:'-02-'},
	{mes:'Marzo',valor:'-03-'}, 
	{mes:'Abril',valor:'-04-'}, 
	{mes:'Mayo',valor:'-05-'}, 
	{mes:'Junio',valor:'-06-'}, 
	{mes:'Julio',valor:'-07-'}, 
	{mes:'Agosto',valor:'-08-'}, 
	{mes:'Septiembre',valor:'-09-'}, 
	{mes:'Octubre',valor:'-10-'}, 
	{mes:'Noviembre',valor:'-11-'}, 
	{mes:'Diciembre',valor:'-12-'}
	];
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

    $scope.mesActual = function (mes) {
        if($scope.mesusuario == ''){
			var date = new Date();
			$scope.mesusuario = date.getMonth()+1; //obtiene el mes actual
		}
    }

	$scope.filtrarPorMes = function(){		
		$scope.focosReporteSumidero = $scope.todos[0];
		$scope.focosReporteVivienda = $scope.todos[1];
		$scope.focosReporteCDH = $scope.todos[2];
		$scope.filtroSumidero = $filter('filter')($scope.focosReporteSumidero, $scope.mesusuario.valor);
		$scope.filtroVivienda = $filter('filter')($scope.focosReporteVivienda, $scope.mesusuario.valor);
		$scope.filtroCDH = $filter('filter')($scope.focosReporteCDH, $scope.mesusuario.valor);
		
		if($scope.filtroSumidero.length > 0){
			$scope.focosReporteSumidero = $scope.filtroSumidero;
		}else{
			$scope.focosReporteSumidero = [{"Municipio":"Cali","cantidad":0,"positivos":0,"tratados":0,"insecticida":"-","totalinsecticida":0},
			{"Municipio":"Palmira","cantidad":0,"positivos":0,"tratados":0,"insecticida":"-","totalinsecticida":0},
			{"Municipio":"Yumbo","cantidad":0,"positivos":0,"tratados":0,"insecticida":"-","totalinsecticida":0}];
		}
		if($scope.filtroVivienda.length > 0){
			$scope.focosReporteVivienda = $scope.filtroVivienda;
		}else{
			$scope.focosReporteVivienda = [{"Municipio":"Cali","cantidad":0,"depositos":0,"tratados":0,"eliminados":0,"larvas":0,"insecticida":0},
			{"Municipio":"Palmira","cantidad":0,"depositos":0,"tratados":0,"eliminados":0,"larvas":0,"insecticida":0},
			{"Municipio":"Yumbo","cantidad":0,"depositos":0,"tratados":0,"eliminados":0,"larvas":0,"insecticida":0}];
		}
		if($scope.filtroCDH.length > 0){
			$scope.focosReporteCDH = $scope.filtroCDH;
		}else{
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
			$scope.todos = data;
			/*$scope.focosReporteSumidero = $scope.todos[0];
			$scope.focosReporteVivienda = $scope.todos[1];
			$scope.focosReporteCDH = $scope.todos[2];*/
		}).error(function (data) {
			$scope.modalMessage = "Error al consultar los datos.";
			$("#focosErrorModal").modal();
			setTimeout(function () {
				$("#focosErrorModal").modal("hide");
			}, 3000);			
		});
	};
	$scope.mesActual();
	$scope.getInfoReporte();
});