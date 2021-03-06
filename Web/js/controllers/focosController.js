angular.module('app').controller('focosController', function($scope, $http, $filter, auth, sharedVariables, $cookies){
	
	var map, heatmap, polylineMap;
	var polymap;
	$scope.markers = [];
	//Informacion del usuario
	$scope.usuario = JSON.parse($cookies.userInfo);

	//Mensaje de error desplegado en el modal
	$scope.modalMessage = "";

	//Variable que almacena los focos
	$scope.Focos = [];
	//Variable que almacena insecticidas
	$scope.arrayInsecticidas = [];
	$scope.nombreInsecticida='';
	//Pagina actual
	$scope.paginaActual = 0;
	$scope.paginaActualInsecticida = 0;
	//Filtro de la info
	$scope.filterText='';
	$scope.filterTextInsecticida='';
	//Filtro de focos para el heat map
	$scope.filtroMap='';
	//Tamano paginacion
	$scope.tamanoPagina=5;
	$scope.tamanoPaginaInsecticida=5;

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
	$scope.mesusuario = '';

	$scope.logout = function(){
		auth.logout();
	};

	$scope.changeView= function(view){
		auth.changeLocation(view);
	};
	//Tabla focos
	$scope.filtrarFocos=function() {
		return $filter('filter')($scope.Focos, $scope.filterText);
	};

	$scope.numeroPaginas=function(){
		return Math.ceil($scope.filtrarFocos().length/$scope.tamanoPagina);
	};

	$scope.focosRegistrados=function(){
		$scope.filterText=$scope.usuario.cedula;
	};
	//Tabla insecticidas
	$scope.filtrarInsecticidas=function() {
		return $filter('filter')($scope.arrayInsecticidas, $scope.filterTextInsecticida);
	};

	$scope.numeroPaginasInsecticida=function(){
		return Math.ceil($scope.filtrarInsecticidas().length/$scope.tamanoPaginaInsecticida);
	};

	$scope.insecticidasRegistrados=function(){
		$scope.filterTextInsecticida=$scope.usuario.cedula;
	};

	$scope.insecticidasRegistrados=function(){
		$scope.filterTextInsecticida=$scope.usuario.cedula;
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

	//Funcion que inicializa el controlodar de acuerdo a las variables del dashboard
	$scope.iniciarController=function(){
		if(sharedVariables.getProperty()=="MapaActive"){
			$('.nav-tabs a[href="#mapaCalor"]').tab('show');
		}
		sharedVariables.setProperty('');
	};
	//Funcion para inicializar el mapa de calor
	$scope.initMap=function() {
		map = new google.maps.Map(document.getElementById('heatmap'), {
				zoom: 12,
				center: {lat: 3.43, lng: -76.52},
				mapTypeId: google.maps.MapTypeId.ROADMAP
			});
		polylineMap = new google.maps.Map(document.getElementById('polymap'), {
				zoom: 12,
				center: {lat: 3.43, lng: -76.52},
				mapTypeId: google.maps.MapTypeId.ROADMAP	
			});
		function initialize(){
			heatmap = new google.maps.visualization.HeatmapLayer({
				data: $scope.obtenerUbicaciones(null),
				map: map
			});
			heatmap.set('radius', 20);
			heatmap.set('opacity', null);
			
			var lineSymbol = {
	          path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
	        };
			polymap = new google.maps.Polyline({
	        	path: [],
	        	icons: [{
		            icon: lineSymbol,
		            offset: '100%'
		        }],
	        	geodesic: true,
	        	strokeColor: '#3d3d29',
	        	strokeOpacity: 1.0,
	        	strokeWeight: 4
	        });
	        polymap.setMap(polylineMap);
		}
		google.maps.event.addDomListener(window, 'load', initialize);
	};
	//Filtra focos para mapa de ruta
	$scope.filtrarFocosPoly=function() {
		$scope.borrarMarcadores();
		$scope.filtroCedula = $filter('filter')($scope.Focos, $scope.filterPoly);
		console.log("filtro cc: "+$scope.filtroCedula);
		console.log("mes: "+$scope.mesusuario.valor);
		console.log("filtro fecha: "+$filter('filter')($scope.filtroCedula, $scope.mesusuario.valor));
		polymap.setPath($scope.focosRuta($filter('filter')($scope.filtroCedula, $scope.mesusuario.valor)));
	};
	$scope.focosRuta=function(arrayPuntos){
		var posiciones = [];
		if(arrayPuntos){
			arrayPuntos.forEach( function(foco) {
				var latLong=foco.Ubicacion.split(",");
				posiciones.push(new google.maps.LatLng(parseFloat(latLong[0]), parseFloat(latLong[1])));
				var marker = new google.maps.Marker({
		          position: new google.maps.LatLng(parseFloat(latLong[0]), parseFloat(latLong[1])),
		          map: polylineMap
		        });
		        $scope.markers.push(marker);
			});
		}
		return posiciones;
	};
	$scope.borrarMarcadores=function(){
            for (var i = 0; i < $scope.markers.length; i++) {
                console.log("marcador: "+$scope.markers[i]);
                $scope.markers[i].setMap(null);
            }
            $scope.markers.length = 0;
	}
	
	//Filtra focos del heatmap
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

	$scope.getInsecticidas=function(){
		$http.get(ip + '/webApi.php?val=obtenerInsecticidas').success(function (data) {
			$scope.arrayInsecticidas=data;
		}).error(function (data) {
			$scope.modalMessage = "No hay insecticidas registrados.";
			$("#focosErrorModal").modal();
			setTimeout(function () {
				$("#focosErrorModal").modal("hide");
			}, 3000);
		});
	};

	$scope.insertarInsecticida=function(){
		if ($scope.nombreInsecticida.trim()!='') {
			var jsonData = {
				usuario:parseInt($scope.usuario.cedula),
				nombre:$scope.nombreInsecticida
			};
			$http.post(ip + '/webApi.php?val=insertinsecticida', jsonData).success(function (data) {
				$scope.getInsecticidas();
				$scope.nombreInsecticida='';
				$scope.modalMessage = "Datos Guardados.";				
				$("#focosSuccessModal").modal();
				setTimeout(function () {
					$("#focosSuccessModal").modal("hide");
				}, 3000);
			}).error(function (data) {
				$scope.modalMessage = "No hay conexión.";
				$("#focosErrorModal").modal();
				setTimeout(function () {
					$("#focosErrorModal").modal("hide");
				}, 3000);
			});
		}else {
			$scope.modalMessage = "Debe ingresar un nombre.";
			$("#focosErrorModal").modal();
			setTimeout(function () {
				$("#focosErrorModal").modal("hide");
			}, 3000);
		}
		
	};

	$scope.deleteInsecticida=function(insecticida){
		var jsonData = {
			idInsecticida:insecticida.ID
		};
		$http.post(ip + '/webApi.php?val=deleteinsecticida', jsonData).success(function (data) {
			$scope.modalMessage = "Cambios Guardados.";
			//Borrar del array
			var index = $scope.arrayInsecticidas.findIndex(x => x.ID==parseInt(insecticida.ID));
			$scope.arrayInsecticidas.splice(index, 1);
			$("#focosSuccessModal").modal();
			setTimeout(function () {
				$("#focosSuccessModal").modal("hide");
			}, 3000);
		}).error(function (data) {
			$scope.modalMessage = "No hay conexión.";
			$("#focosErrorModal").modal();
			setTimeout(function () {
				$("#focosErrorModal").modal("hide");
			}, 3000);			
		});
	};

	//Solucion al problema de renderizado del mapa causado por el cambio de pantallas
	jQuery(document).ready(function() {
	  checkContainer();
	  checkContainerPoly();
	});
	//Funcion que revisa si el contenedor del mapa de calor es visible
	function checkContainer() {
	  if($('#mapaCalor').is(':visible')){ //Si el container es visible
	    google.maps.event.trigger(map, 'resize');
		map.setCenter({lat: 3.43, lng: -76.52});
	  } else {
	    setTimeout(checkContainer, 50); //espera 50ms y vuelve a intentar
	  }
	};
	function checkContainerPoly() {
	  if($('#recorridoUsuario').is(':visible')){ //Si el container es visible
	    google.maps.event.trigger(polylineMap, 'resize');
		map.setCenter({lat: 3.43, lng: -76.52});
	  } else {
	    setTimeout(checkContainerPoly, 50); //espera 50ms y vuelve a intentar
	  }
	};

	
	$scope.getAllFocos();
	$scope.getInsecticidas();
});