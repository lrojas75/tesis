angular.module('app').controller('focosController', function($scope, $http, $filter, auth, $cookies){
	
	var map, heatmap;
	//Informacion del usuario
	$scope.usuario = JSON.parse($cookies.userInfo);

	//Mensaje de error desplegado en el modal
	$scope.modalMessage = "";

	//Variable que almacena los focos
	$scope.Focos = [];

	//Pagina actual
	$scope.paginaActual = 0;
	//Filtro de la info
	$scope.filterText='';
	//Filtro de focos para el heat map
	$scope.filtroMap='';
	//Tamano paginacion
	$scope.tamanoPagina=5;

	$scope.logout = function(){
		auth.logout();
	};

	$scope.changeView= function(view){
		auth.changeLocation(view);
	};

	$scope.filtrarFocos=function() {
		return $filter('filter')($scope.Focos, $scope.filterText);
	};

	$scope.numeroPaginas=function(){
		return Math.ceil($scope.filtrarFocos().length/$scope.tamanoPagina);
	};

	$scope.focosRegistrados=function(){
		$scope.filterText=$scope.usuario.cedula;
	};

	$scope.getAllFocos=function(){
		$http.get(ip + '/webApi.php?val=allFocos', {
			params:{
				usuario:parseInt($scope.usuario.cedula)
			}
		}).success(function (data) {
			$scope.Focos = data;
		}).error(function (data) {
			$scope.modalMessage = "Error al consultar los datos.";
			$("#focosErrorModal").modal();
			setTimeout(function () {
				$("#focosErrorModal").modal("hide");
			}, 3000);
		});
	};

	$scope.initMap=function() {
		function initialize(){
			map = new google.maps.Map(document.getElementById('heatmap'), {
				zoom: 12,
				center: {lat: 3.43, lng: -76.52},
				mapTypeId: google.maps.MapTypeId.HYBRID
			});

			heatmap = new google.maps.visualization.HeatmapLayer({
				data: $scope.obtenerUbicaciones(null),
				map: map
			});
			heatmap.set('radius', 20);
			heatmap.set('opacity', null);
		}
		google.maps.event.addDomListener(window, 'load', initialize);
	};

	$scope.mostrarFiltro=function(){		
		heatmap.setData($scope.obtenerUbicaciones($filter('filter')($scope.Focos, $scope.filtroMap)));
	};

	$scope.fixedUbicacion=function(foco){
		var split = foco.Ubicacion.split(",");
        return parseInt(split[0]).toFixed(2) + "," + parseInt(split[1]).toFixed(2);
	};
	//Devueve un array que contiene las coordenadas de cada foco
	$scope.obtenerUbicaciones=function(arrayPuntos){
		var posiciones = [];
		if(arrayPuntos){
			arrayPuntos.forEach( function(foco) {
				var latLong=foco.Ubicacion.split(",");
				posiciones.push(new google.maps.LatLng(parseFloat(latLong[0]), parseFloat(latLong[1])));
			});
		}else {
			$scope.filtrarFocos().forEach( function(foco) {
				var latLong=foco.Ubicacion.split(",");
				posiciones.push(new google.maps.LatLng(parseFloat(latLong[0]), parseFloat(latLong[1])));
			});
		}
		return posiciones;
	};

	jQuery(document).ready(function() {
	  checkContainer();
	});
	//Funcion que revisa si el contenedor del mapa de calor es visible
	function checkContainer () {
	  if($('#mapaCalor').is(':visible')){ //Si el container es visible
	    google.maps.event.trigger(map, 'resize');
		map.setCenter({lat: 3.43, lng: -76.52});
	  } else {
	    setTimeout(checkContainer, 50); //espera 50ms y vuelve a intentar
	  }
	};
	
	$scope.getAllFocos();
});