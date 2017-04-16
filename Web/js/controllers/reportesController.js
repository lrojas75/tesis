angular.module('app').controller('reportesController', function($scope, $http, $cookies, auth, sharedVariables){
	$scope.usuario = JSON.parse($cookies.userInfo);
	$scope.paginaActual = 0;
	$scope.tamanoPagina = 5;
	$scope.selectedMonth = '';
	$scope.meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
	
	$scope.selectedMonth = function (mes) {
        $scope.selectedMonth = mes;
        console.log("Mes:"+$scope.selectedMonth);
    }

	$scope.logout = function(){
		auth.logout();
	};
	$scope.changeView= function(view){
		auth.changeLocation(view);
	};
	$scope.numeroPaginas=function(){
		return Math.ceil($scope.filtrarFocos().length/$scope.tamanoPagina);
	};

	$scope.getInfoReporte = function(){
		$http.get(ip + '/webApi.php?val=focosReporte', {
			params:{
				month: $scope.selectedMonth
			}
		}).success(function (data) {
			//Pos 1 vivienda, pos 2 simdero, pos 3 cdh			
			// $scope.focosPorMesVivienda=data[0];
			// $scope.focosPorMesSumidero=data[1];
			// $scope.focosPorMesCDH=data[2];
			console.log(data);
		}).error(function (data) {
			$scope.modalMessage = "Error al consultar los datos.";
			$("#focosErrorModal").modal();
			setTimeout(function () {
				$("#focosErrorModal").modal("hide");
			}, 3000);			
		});
	}
});