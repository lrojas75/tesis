angular.module('app').controller('capturaController', function($scope, $http, $filter, auth, $cookies){
	//Informacion del usuario
	$scope.usuario = JSON.parse($cookies.userInfo);

	//Variable para manipular el mapa
	var map;
	//Muestra el recorrido en caso de que no haya, si hay uno puede llenar algun formulario
	$scope.hayRecorrido=false;

	//Mensaje de los modales de error y exito
	$scope.modalMessage='';

	//Ubicacion variable general
	$scope.ubicacionActual='0,0';
	//Recorrido
	$scope.infoFormData = {
		id:0,
		municipio: '',
		barrio: '',
		comuna: '',
		actividad: '',
		fecha: $filter('date')(Date.now(), 'dd-MM-yyyy')
	};

	//Tipo formulario
	$scope.tipo='';
	//Valores para el formulario de sumideros
	$scope.sumideroForm={
		estadoSumidero:'',
		larvasSumidero:'',
		pupasSumidero:'',
		tratadoSumidero:'',
		insecticidaSumidero:'',
		cantInsecticidaSumidero: '',
		arrayInsecticidas:[]        
	};

	//Vivienda form
	$scope.viviendaForm = {
		nombre: '',
		apellido: '',
		cedula: '',
		habitantesCasa:0,
		clave:'',
		depositos:[]        
	};

	//Informacion CDH
	$scope.CDHform = {
		nombre: '',
		apellido: '',
		cedula: '',
		rs: '',
		focosEncontrados:[],
		focosPotenciales:[],
		//centros hospitalarios y batallon
		toldillos: [],
		observaciones: '',
		plazo: 0,        
		tipoCDH: ''
	};

	$scope.changeView= function(view){
		auth.changeLocation(view);
	};

	$scope.logout = function(){
		auth.logout();
	};


	//Opciones de municipio y comuna
	$scope.opciones = [
		{ municipio: "Cali", comunaNum: ["1", "2", "3", "4", "5", "6","7", "8", "9","10", "11","13", "17","19", "20", "21", "22"]},
		{ municipio: "Palmira", comunaNum: ["1", "2", "3", "4", "5", "6","7", "8", "9","10", "11","13", "14", "15", "16"]},
		{ municipio: "Cartago", comunaNum: ["1", "2", "3", "4", "5", "6","7"]}
		];
	//Inicializa el controlador, habilida el recorrido en caso que no haya, si existe recorrido habilita el ingreso de datos
	$scope.initRecorrido = function(){        
		$http.get(ip + '/webApi.php?val=checkInfoGeneral', {
			params: {
				usuario: $scope.usuario.cedula,
				fecha: $scope.infoFormData.fecha
			}
		}).success(function (data) {
			if (data != "null") {
				$scope.infoFormData.id=data.id;
				$scope.infoFormData.municipio=data.municipio;
				$scope.hayRecorrido=true;                
				$http.get(ip + '/webApi.php?val=obtenerInsecticidas', {
					params: {
						usuario: $scope.usuario.cedula,
						fecha: $scope.infoFormData.fecha
					}
				}).success(function (data) {
					$scope.sumideroForm.arrayInsecticidas=data;
				}).error(function (data) {
					$scope.modalMessage = "Error al consultar los insecticidas.";
					$("#capturaErrorModal").modal();
					setTimeout(function () {
						$("#capturaErrorModal").modal("hide");
					}, 3000);
				});
			}
		}).error(function (data) {
			$scope.modalMessage = "Error al consultar los datos.";
			$("#capturaErrorModal").modal();
			setTimeout(function () {
				$("#capturaErrorModal").modal("hide");
			}, 3000);
		});
	};


	$scope.viviendaNoRenuente = function () {
		return $scope.viviendaForm.clave != '' && $scope.viviendaForm.clave != 'Renuente' && $scope.viviendaForm.clave != 'Cerrada';
	};

	//Filas depositos para vivienda
	$scope.agregarDeposito = function () {
		var newIndex = $scope.viviendaForm.depositos.length;
		var row = {
			index: newIndex,
			deposito: '',
			tieneAgua: '',
			P: '',
			L: '',
			I:'',
			medidaTanque: '',
			eliminado: '',
			tratado: '',
			larvicida:'',
		};
		$scope.viviendaForm.depositos.push(row);
	};

	$scope.eliminarDeposito = function (index) {
		$scope.viviendaForm.depositos.splice(index, 1);
	};

	//Filas de focos par cdh
	$scope.filaFoco = function () {
		var newIndex = $scope.CDHform.focosEncontrados.length;

		var row = {
			index:newIndex,
			cantidad: '',
			tipo: '',
			lugar: ''
		};        
		$scope.CDHform.focosEncontrados.push(row);
	};
	//Eliminar fila encontrado
	$scope.deleteEncontrado = function (index) {
		$scope.CDHform.focosEncontrados.splice(index, 1);
	};
	//Agregar fila potencial
	$scope.filaPotencial = function () {
		var newIndex = $scope.CDHform.focosPotenciales.length;

		var row = {
			index: newIndex,
			cantidad: '',
			tipo: '',
			lugar: ''
		};
		$scope.CDHform.focosPotenciales.push(row);
	};
	//ELiminar fila potencial
	$scope.deletePotencial= function (index) {
		$scope.CDHform.focosPotenciales.splice(index, 1);
	};

	//Añadir fila toldillo
	$scope.filaToldillo = function () {
		var newIndex = $scope.CDHform.toldillos.length;

		var row = {
			index: newIndex,
			tipo: '',
			bueno: 0,
			regular: 0,
			malo: 0,
			total: 0,
			enuso: 0
		};

		$scope.CDHform.toldillos.push(row);
	};
	//Eliminar fila toldillo
	$scope.deleteToldillo = function (index) {
		$scope.CDHform.toldillos.splice(index, 1);
	};


	$scope.agregarInfoGeneral = function(){
		if ($scope.infoFormData.municipio.municipio.trim()!='' && $scope.infoFormData.barrio.trim()!='' && $scope.infoFormData.comuna.trim()!='' && $scope.infoFormData.actividad.trim()!='') {}
		var user = window.localStorage.getItem("usuario"); 
		var jsonData = {
			id:$scope.usuario.cedula,
			municipio: $scope.infoFormData.municipio.municipio,
			barrio: $scope.infoFormData.barrio,
			comuna: $scope.infoFormData.comuna,
			actividad: $scope.infoFormData.actividad,
			fecha: $scope.infoFormData.fecha        
		};
		$http.post(ip + '/webApi.php?val=addInfoGeneral', jsonData).success(function (data) {
			$cookies.syncData=JSON.stringify([]);
			$http.get(ip + '/webApi.php?val=checkInfoGeneral', {
				params: {
					usuario: $scope.usuario.cedula,
					fecha: $scope.infoFormData.fecha
				}
			}).success(function (data) {
				if (data != "null") {
					$scope.infoFormData.id=data.id;
					$scope.infoFormData.municipio=data.municipio;
					$scope.hayRecorrido=true;
					$scope.modalMessage = "Datos Guardados.";
					$("#capturaSuccessModal").modal();
					setTimeout(function () {
						$("#capturaSuccessModal").modal("hide");
					}, 3000);
				}
			}).error(function (data) {
				$scope.modalMessage = "Error al consultar los datos.";
				$("#capturaErrorModal").modal();
				setTimeout(function () {
					$("#capturaErrorModal").modal("hide");
				}, 3000);
			}); 
		}).error(function(data) {
			$scope.modalMessage = "Error al enviar los datos. Intente más tarde.";
			$("#capturaErrorModal").modal();
			setTimeout(function () {
				$("#capturaErrorModal").modal("hide");
			}, 3000);            
		});
	};


	//Agrega sumidero
	$scope.agregarSumidero = function () {
		//Revisa si hay campos vacios
		if ($scope.sumideroForm.estadoSumidero!='' && $scope.ubicacionActual != '0,0') {
			var jsonData = {
				servicio:'addSumidero',                
				tipo: $scope.tipo,
				enviado:false,//si se envia no se agrega a la lista de sincronizar
				estado: $scope.sumideroForm.estadoSumidero,
				larvas: $scope.sumideroForm.larvasSumidero,
				pupas: $scope.sumideroForm.pupasSumidero,
				tratado: $scope.sumideroForm.tratadoSumidero,
				insecticida: $scope.sumideroForm.insecticidaSumidero.Nombre,
				cantidadInsecticida: $scope.sumideroForm.cantInsecticidaSumidero,
				idInfoGeneral: $scope.infoFormData.id,
				ubicacion: $scope.ubicacionActual
			};
			$scope.tipo = '';
			$scope.ubicacionActual='0,0';
			var insecticidasTmp = $scope.sumideroForm.arrayInsecticidas;
			$scope.sumideroForm = {
				estadoSumidero: '',
				larvasSumidero: '',
				pupasSumidero: '',
				tratadoSumidero: '',
				insecticidaSumidero: '',
				cantInsecticidaSumidero: '',
				arrayInsecticidas: insecticidasTmp
			};
			$http.post(ip+'/webApi.php?val=addSumidero',jsonData).success(function(data) {
				$scope.modalMessage = "Datos Guardados.";
				$("#capturaSuccessModal").modal();
				// setTimeout(function () {
				//     $("#capturaSuccessModal").modal("hide");
				// }, 3000);
			}).error(function(data) {
				$scope.modalMessage = "No hay conexión. Puede reenviar los datos en la opción sincronizar.";
				$("#capturaErrorModal").modal();
				setTimeout(function () {
					$("#capturaErrorModal").modal("hide");
				}, 5000);
				var dataSync = JSON.parse($cookies.syncData);

				if (dataSync) {
					dataSync.push(jsonData);
					$cookies.syncData= JSON.stringify(dataSync);
				} else {
					$cookies.syncData= JSON.stringify([jsonData]);                    
				}
			});

		} else {
			$scope.modalMessage = "No pueden haber campos vacíos.";
			$("#capturaErrorModal").modal();
			setTimeout(function () {
				$("#capturaErrorModal").modal("hide");
			}, 3000);
		}    
	};

	$scope.agregarVivienda = function () {
		if ($scope.ubicacionActual!='0,0' && $scope.viviendaForm.clave!='' ) {
			var jsonData = {
				servicio:'addVivienda',
				tipo: $scope.tipo,
				enviado: false,//si se envia no se agrega a la lista de sincronizar                
				clave:$scope.viviendaForm.clave,
				habitantes: $scope.viviendaForm.habitantesCasa,
				nombres: $scope.viviendaForm.nombre,
				apellidos: $scope.viviendaForm.apellido,
				cedula: $scope.viviendaForm.cedula,
				depositos:$scope.viviendaForm.depositos,
				idInfoGeneral: $scope.infoFormData.id,
				ubicacion: $scope.ubicacionActual                
			};
			$scope.tipo = '';
			$scope.ubicacionActual='0,0';
			$scope.viviendaForm = {
				nombre: '',
				apellido: '',
				cedula: '',
				habitantesCasa: 0,
				clave: '',
				depositos: []                
			};
			$http.post(ip + '/webApi.php?val=addVivienda', jsonData).success(function (data) {
				$scope.modalMessage = "Datos Guardados.";
				$("#capturaSuccessModal").modal();
				setTimeout(function () {
					$("#capturaSuccessModal").modal("hide");
				}, 3000);
			}).error(function (data) {
				$scope.modalMessage = "No hay conexión. Puede reenviar los datos en la opción sincronizar.";
				$("#capturaErrorModal").modal();
				setTimeout(function () {
					$("#capturaErrorModal").modal("hide");
				}, 5000);
				var dataSync = JSON.parse($cookies.syncData);

				if (dataSync) {
					dataSync.push(jsonData);
					$cookies.syncData= JSON.stringify(dataSync);
				} else {
					$cookies.syncData= JSON.stringify([jsonData]);                    
				}
			});
		}else{
			$scope.modalMessage = "Revisa que ingresaste la clave y tu ubicación.";
			$("#capturaErrorModal").modal();
			setTimeout(function () {
				$("#capturaErrorModal").modal("hide");
			}, 3000);
		}
	};
	

	$scope.agregarCDH = function(){        
		//Validacion de campos obligatorios
		if ($scope.CDHform.nombre != '' && $scope.CDHform.apellido != '' && $scope.CDHform.cedula != '' && $scope.CDHform.rs != '' && $scope.ubicacionActual != '0,0') {
			//Si hay algun foco la observacion es opcional y debe haber un plazo, si no hay focos debe haber observacion
			if (($scope.CDHform.tipo != '' && $scope.CDHform.plazo>0 && ($scope.CDHform.focosEncontrados.length > 0 || $scope.CDHform.focosPotenciales.length > 0 || $scope.CDHform.toldillos.length > 0)) || $scope.CDHform.observaciones != '') {
				var jsonData = {
					servicio: 'addCDH',
					nombre: $scope.CDHform.nombre,
					apellido: $scope.CDHform.apellido,
					cedula: $scope.CDHform.cedula,
					razonsocial: $scope.CDHform.rs,
					tipo: $scope.tipo,
					tipocdh:$scope.CDHform.tipoCDH,
					encontrados: $scope.CDHform.focosEncontrados,
					potenciales: $scope.CDHform.focosPotenciales,
					toldillos: $scope.CDHform.toldillos,
					observacion: $scope.CDHform.observaciones,
					ubicacion: $scope.ubicacionActual,
					infoID: idInfo,
					plazo: $scope.CDHform.plazo
				};
				$scope.tipo = '';
				$scope.ubicacionActual='0,0';
				$scope.CDHform = {
					nombre: '',
					apellido: '',
					cedula: '',
					rs: '',
					focosEncontrados: [],
					focosPotenciales: [],
					//centros hospitalarios y batallon
					toldillos: [],
					observaciones: '',
					plazo: 0,                    
					tipoCDH: '',
					plazo: 0
				};
				$http.post(ip + '/webApi.php?val=addCDH', jsonData).success(function (data) {
					$scope.modalMessage = "Datos Guardados.";
					$("#capturaSuccessModal").modal();
					setTimeout(function () {
						$("#capturaSuccessModal").modal("hide");
					}, 3000);                     
				}).error(function (data) {
					$scope.modalMessage = "Revisa que ingresaste la clave y tu ubicación.";
					$("#capturaErrorModal").modal();
					setTimeout(function () {
						$("#capturaErrorModal").modal("hide");
					}, 3000);
					var dataSync = JSON.parse($cookies.syncData);

					if (dataSync) {
						dataSync.push(jsonData);
						$cookies.syncData= JSON.stringify(dataSync);
					} else {
						$cookies.syncData= JSON.stringify([jsonData]);
					}
				});
			} else {
				$scope.modalMessage = "No pueden haber campos vacíos.";
				$("#capturaErrorModal").modal();
				setTimeout(function () {
					$("#capturaErrorModal").modal("hide");
				}, 3000);
			}
		} else {
			$scope.modalMessage = "No pueden haber campos vacíos.";
			$("#capturaErrorModal").modal();
			setTimeout(function () {
				$("#capturaErrorModal").modal("hide");
			}, 3000);
		}
	};

	//<------------------------------------------FUNCION PARA GEOLOCALIZACION (API GEOLOCATION)--------------------------------->

	
	//Funcion que envia los datos que no pudieron enviarse
	$scope.sincronizar = function () {
		var dataToSend = JSON.parse($cookies.syncData);
		if (dataToSend) {
			dataToSend.forEach(function (jsonData) {
				if (!jsonData.enviado) {
					switch (jsonData.servicio) {
						case 'modInfoGeneral':
							$http.post(ip + '/webApi.php?val=modInfoGeneral', jsonData).success(function (data) {
								jsonData.enviado = true;
							}).error(function (data) {
								$scope.modalMessage = "No se pudo sincronizar los datos. Intente más tarde.";
								$("#capturaErrorModal").modal();
								setTimeout(function () {
									$("#capturaErrorModal").modal("hide");
								}, 3000);
							});
							break;

						case 'addSumidero':
							$http.post(ip + '/webApi.php?val=addSumidero', jsonData).success(function (data) {
								jsonData.enviado = true;
							}).error(function (data) {
								$scope.modalMessage = "No se pudo sincronizar los datos. Intente más tarde.";
								$("#capturaErrorModal").modal();
								setTimeout(function () {
									$("#capturaErrorModal").modal("hide");
								}, 3000);
							});

							break;

						case 'addVivienda':                            
							$http.post(ip + '/webApi.php?val=addVivienda', jsonData).success(function (data) {
								jsonData.enviado = true;
							}).error(function (data) {
								$scope.modalMessage = "No se pudo sincronizar los datos. Intente más tarde.";
								$("#capturaErrorModal").modal();
								setTimeout(function () {
									$("#capturaErrorModal").modal("hide");
								}, 3000);
							});
							break;

						case 'addCDH':
							$http.post(ip + '/webApi.php?val=addCDH', jsonData).success(function (data) {
								jsonData.enviado = true;
							}).error(function (data) {
								$scope.modalMessage = "No se pudo sincronizar los datos. Intente más tarde.";
								$("#capturaErrorModal").modal();
								setTimeout(function () {
									$("#capturaErrorModal").modal("hide");
								}, 3000);
							});
							break;
					}
				}
			});
			
		   $cookies.syncData = JSON.stringify(dataToSend);
		} else {
			$scope.modalMessage = "No hay datos para sincronizar.";
			$("#capturaSuccessModal").modal();
			setTimeout(function () {
				$("#capturaSuccessModal").modal("hide");
			}, 3000);
		}
	};    
	
	//Habilita el boton de sincronizar cuando haya algo para sincronizar
	$scope.activeSync=function(){
		var dataToSync = JSON.parse(window.localStorage.getItem("syncData"));
		//Si hay algun datoa que no se sincronizo el boton se activa
		//Enviado es cambiado a true cuando se sincroniza correctamente
		if (dataToSync) {
			var toSync = dataToSync.filter(function (obj) {
				return obj.enviado == false;
			});
			if (toSync) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	};

	//Funcion para mostrar el valor de la ubicacion en el input
	$scope.showUbicacion=function(){
		var split = $scope.ubicacionActual.split(",");
		return parseInt(split[0]).toFixed(2)+"-"+parseInt(split[1]).toFixed(2);
	};
	//Inicializa el mapa
	$scope.MapaGoogle = function () {
		var rendererOptions = {
			draggable: true
		};
		var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
		var directionsService = new google.maps.DirectionsService();        
		var stepDisplay;        
		var myLatlng = { lat: 3.42, lng: -76.52 };
		var mapOptions = {
				center: myLatlng,
				zoom:14
			};
		map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
		function initialize() {
			var infoWindow = new google.maps.InfoWindow({map: map});
			
			
			
			// Create a renderer for directions and bind it to the map.
			directionsDisplay.setMap(map);

			// Instantiate an info window to hold step text.
			stepDisplay = new google.maps.InfoWindow();
		}
		google.maps.event.addDomListener(window, 'load', initialize);
	};

	//Evento para que el mapa espere a que el modal salga para renderizarse
	$('#mapModal').on('shown.bs.modal', function () {
		google.maps.event.trigger(map, "resize");
		//HTML5 soporte de ubicacion para ubicar automaticamente
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
				var marker = new google.maps.Marker({
					position: pos,
					draggable: true,
					title: "Tú posición"
				});
				map.setCenter(pos);
				marker.setPosition(pos);
				marker.setMap(map);
				//Evento de arrastrar el marcador
				google.maps.event.addListener(marker, 'dragend', function (evt) {
					$scope.ubicacionActual=evt.latLng.lat() + "," + evt.latLng.lng();
				});
				//Apply para que los datos del modelo se renderizen correctamente, hay que hacerlo porque esta dentro de un event y angular no sabe que hubo una variable modificada
				$scope.$apply(function() {
					$scope.ubicacionActual=position.coords.latitude + "," + position.coords.longitude;					
				});
			});
		}

	});
	
});
