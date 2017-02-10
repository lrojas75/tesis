var app = angular.module("movilapp", ['ngMaterial']);
var ip = "http://192.168.0.15:80";

//<<---------------------------------------------------------------------------------------------------------------------------------------->>
//<<-------------------------------------------- Controlador para ventana de Informacion General-------------------------------------------->>
//<<---------------------------------------------------------------------------------------------------------------------------------------->>
app.controller("infoController", ['$scope', '$filter', '$http', function($scope, $filter, $http){
    $scope.infoExiste=false;
    $scope.infoFormData={
        municipio:'',
        barrio:'',
        comuna:'',
        actividad:'',
        fecha: $filter('date')(Date.now(), 'dd-MM-yyyy')
    };
    $scope.changeView = function(nextPage,currentPage){
        window.localStorage.setItem("previousPage", currentPage);
        window.location.replace(nextPage);
    };

    $scope.backNavigation = function() {
        var previousPage = window.localStorage.getItem("previousPage");    
        window.location.replace(previousPage);    
    };
//<<--------------------- Funciones para ventana INFORMACION GENERAL ----------------------------------------->>
    $scope.opciones = [
    { municipio: "Cali", comunaNum: ["1", "2", "3", "4", "5", "6","7", "8", "9","10", "11","13", "17","19", "20", "21", "22"]},
    { municipio: "Palmira", comunaNum: ["1", "2", "3", "4", "5", "6","7", "8", "9","10", "11","13", "14", "15", "16"]},
    { municipio: "Cartago", comunaNum: ["1", "2", "3", "4", "5", "6","7"]}];

    
    //<------------------------------------FUNCION PARA AGREGAR LA INFORMACION GENERAL DEL RECORRIDO ------------------------->
    $scope.agregarInfoGeneral = function(){
        if ($scope.infoFormData.municipio.municipio.trim()!='' && $scope.infoFormData.barrio.trim()!='' && $scope.infoFormData.comuna.trim()!='' && $scope.infoFormData.actividad.trim()!='') {}
        var user = window.localStorage.getItem("usuario"); 
        var jsonData = {
            id:user,
            municipio: $scope.infoFormData.municipio.municipio,
            barrio: $scope.infoFormData.barrio,
            comuna: $scope.infoFormData.comuna,
            actividad: $scope.infoFormData.actividad,
            fecha: $scope.infoFormData.fecha        
        };
        $http.post(ip+'/webApi.php?val=addInfoGeneral',jsonData).success(function(data) {
            window.localStorage.setItem("previousPage", "infoGeneral.html");
            window.localStorage.setItem("municipio", $scope.infoFormData.municipio);
            window.localStorage.setItem("numSumidero",0);
            window.localStorage.setItem("numVivienda",0);
            window.localStorage.setItem("numCDH", 0);
            window.localStorage.setItem("recentList", JSON.stringify(new Array()));
            window.localStorage.setItem("syncData", JSON.stringify(new Array()));
            window.location.replace("menuTipos.html");
        }).error(function(data) {
            alert("Error al ingresar los datos");
            console.log('Error: ' + data);
        });
    };

    $scope.initInfo = function(){
        var user = window.localStorage.getItem("usuario"); 
        $http.get(ip+'/webApi.php?val=checkInfoGeneral',{
            params:{
                usuario:user,
                fecha:$scope.infoFormData.fecha
            }
        }).success(function(data){
            if (data!=null) {
                window.localStorage.setItem("infoID",data.id);
                window.localStorage.setItem("municipio",data.municipio);                
                window.localStorage.setItem("previousPage", "index.html");
                window.location.replace("menuTipos.html");
                console.log("no hay nada"+data);
            }else{
                $scope.infoExiste=true;
                console.log("init");
            }
        }).error(function(data){
            alert("Error al consultar los datos");
        })
    };

}]);

//<<---------------------------------------------------------------------------------------------------------------------------------------->>
//<<-------------------------------------------- Controlador para ventana del Menu principal-------------------------------------------->>
//<<---------------------------------------------------------------------------------------------------------------------------------------->>
app.controller("menuController", ['$scope','$filter', '$http', function($scope, $filter,$http){

    $scope.backNavigation = function() {
        var previousPage = window.localStorage.getItem("previousPage");    
        window.location.replace(previousPage);    
    }
    $scope.fecha = $filter('date')(Date.now(), 'dd-MM-yyyy');

    $scope.init = function(){
        var user = window.localStorage.getItem("usuario"); 
        $http.get(ip+'/webApi.php?val=checkInfoGeneral',{
            params:{
                usuario:user,
                fecha:$scope.fecha
            }
        }).success(function(data){
            if (data!=null) {
                window.localStorage.setItem("infoID",data.id);
                window.localStorage.setItem("municipio",data.municipio);
            }else{
                alert("Error en la conexión");
            }
        }).error(function(data){
            alert("Error al consultar los datos");
        })
    };

    //<<-----------------------Funciones para ventana MENU PRINCIPAL ---------------------------------------->>
    
    var sumideros = Number(window.localStorage.getItem("numSumidero"));
    var viviendas = Number(window.localStorage.getItem("numVivienda"));
    var cdh = Number(window.localStorage.getItem("numCDH"));
    var campo = document.getElementById("grafico");

    Morris.Donut({
      element: campo,
      data: [
      {label: "Sumidero", value: sumideros},
      {label: "Vivienda", value: viviendas},
      {label: "CDH", value: cdh},
      ],
      colors: ['#ffcd28', '#5d6865', '#f93e04']
    }); //Cierra codigo de Donut.

    $scope.changeView = function(nextPage,currentPage){
        window.localStorage.setItem("previousPage", currentPage);
        window.location.replace(nextPage);
    };

    //Funcion que envia los datos que no pudieron enviarse
    $scope.sincronizar = function () {
        var dataToSend = JSON.parse(window.localStorage.getItem("syncData"));
        dataToSend.forEach(function (jsonData) {
            if (!jsonData.enviado) {
                switch (jsonData.servicio) {
                    case 'modInfoGeneral':
                        $http.post(ip + '/webApi.php?val=modInfoGeneral', jsonData).success(function (data) {
                            jsonData.enviado = true;
                        }).error(function (data) {
                            alert("No se pudo sincronizar los datos, intente más tarde.");
                        });
                        break;

                    case 'addSumidero':
                        var sumideros = Number(window.localStorage.getItem("numSumidero"));
                        $http.post(ip + '/webApi.php?val=addSumidero', jsonData).success(function (data) {
                            window.localStorage.setItem("numSumidero", sumideros + 1);
                            jsonData.enviado = true;
                        }).error(function (data) {
                            alert("No se pudo sincronizar los datos, intente más tarde.");
                        });

                        break;

                    case 'addVivienda':
                        var viviendas = Number(window.localStorage.getItem("numVivienda"));
                        $http.post(ip + '/webApi.php?val=addVivienda', jsonData).success(function (data) {
                            window.localStorage.setItem("previousPage", "menuTipos.html");
                            window.localStorage.setItem("numVivienda", viviendas + 1);
                            jsonData.enviado = true;
                        }).error(function (data) {
                            alert("No se pudo sincronizar los datos, intente más tarde.");
                        });
                        break;

                    case 'addCDH':
                        var cdhs = Number(window.localStorage.getItem("numCDH"));
                        $http.post(ip + '/webApi.php?val=addCDH', jsonData).success(function (data) {
                            window.localStorage.setItem("previousPage", "menuTipos.html");
                            window.localStorage.setItem("numCDH", cdhs + 1);
                            jsonData.enviado = true;
                        }).error(function (data) {
                            alert("No se pudo sincronizar los datos, intente más tarde.");
                        });
                        break;
                }
            }
        });
        console.log(dataToSend);
        window.localStorage.setItem("syncData", JSON.stringify(dataToSend));
    };
    //Habilita el boton de sincronizar cuando haya algo para sincronizar
    $scope.activeSync = function () {
        dataToSync = window.localStorage.getItem("syncData");
        if (dataToSync) {
            if (dataToSync.length > 0) {
                return false;
            } else {
                return true
            }
        } else {
            return true;
        }
    };

}]);

//<<---------------------------------------------------------------------------------------------------------------------------------------->>
//<<-------------------------------------------- Controlador para ventana de Focos de infeccion-------------------------------------------->>
//<<---------------------------------------------------------------------------------------------------------------------------------------->>
app.controller("focoController", ['$scope', '$http', function ($scope, $http) {
    $scope.showMap = false;//Mostrar mapa
    $scope.recientes = JSON.parse(localStorage.getItem("recentList"));
    $scope.municipios = [
        { municipio: "Cali", comunaNum: ["1", "2", "3", "4", "5", "6","7", "8", "9","10", "11","13", "17","19", "20", "21", "22"]},
        { municipio: "Palmira", comunaNum: ["1", "2", "3", "4", "5", "6","7", "8", "9","10", "11","13", "14", "15", "16"]},
        { municipio: "Cartago", comunaNum: ["1", "2", "3", "4", "5", "6","7"]}];
    //Valores del formulario de modificar info
    $scope.editarInfo ={
        municipio: window.localStorage.getItem("municipio"),
        barrio:'',
        comuna:'',
        comunas:[],
        actividad: '',
        
    }
    //Tipo de sitio que visita
    $scope.tipo='';
    //Comunas de acuerdo al municipio que escogió
    $scope.editarInfo.comunas=$scope.municipios.filter(function( obj ) {
          return obj.municipio == $scope.editarInfo.municipio;
        })[0].comunaNum;

    $scope.backNavigation = function() {
        var previousPage = window.localStorage.getItem("previousPage");    
        window.location.replace(previousPage);    
    };
    //Funcion para activar el formulario que se va a mostrar
    $scope.mostrar = function(tipoEscogido){
        return $scope.tipo===tipoEscogido;
    };

    $scope.toggleMap = function () {
        $scope.showMap = !$scope.showMap;
    }

    $scope.changeView = function(nextPage,currentPage){
        window.localStorage.setItem("previousPage", currentPage);
        window.location.replace(nextPage);
    };


    $scope.modificarInfoGeneral = function () {        
        if ($scope.editarInfo.municipio!='' && $scope.editarInfo.barrio!='' && $scope.editarInfo.comuna!='' && $scope.editarInfo.actividad!='') {
            var user = window.localStorage.getItem("usuario"); 
            var jsonData = {
                servicio:'modInfoGeneral',                
                id: user,
                barrio: $scope.editarInfo.barrio,
                comuna: $scope.editarInfo.comuna,
                actividad: $scope.editarInfo.actividad                
            };
            $http.post(ip + '/webApi.php?val=modInfoGeneral', jsonData).success(function (data) {
                jsonData.enviado = true;
                window.location.reload("focosView.html");
            }).error(function(data) {
                alert("Error al actualizar los datos");                
                console.log('Error: ' + data);
            });
        }
    };


    //Valores para el formulario de sumideros
    $scope.sumideroForm={
        estadoSumidero:'',
        larvasSumidero:'',
        pupasSumidero:'',
        tratadoSumidero:'',
        insecticidaSumidero:'',
        cantInsecticidaSumidero:'',
        ubicacionSumidero:''
    }

    $scope.agregarSumidero = function () {
        //Fecha para obtener la hora
        var fechaHoras = new Date();
        //Id de la informacion general
        var idInfo = window.localStorage.getItem("infoID");
        //Numero de sumideros que ha hecho en el día
        var sumideros = Number(window.localStorage.getItem("numSumidero"));
        //Contiene todos los formularios que han sido enviados exitosamente y los que no
        //Se utiliza en el metodo de sincronizar y es la lista de recientes
        var recentList = JSON.parse(window.localStorage.getItem("recentList"));

        if ($scope.sumideroForm.estadoSumidero!='' && $scope.sumideroForm.tratadoSumidero!='' && $scope.sumideroForm.insecticidaSumidero!='' && $scope.sumideroForm.cantInsecticidaSumidero!='' && $scope.sumideroForm.ubicacionSumidero!='') {
            var jsonData = {
                servicio:'addSumidero',                
                tipo: $scope.tipo,
                enviado:false,//si se envia no se agrega a la lista de sincronizar
                estado: $scope.sumideroForm.estadoSumidero,
                larvas: $scope.sumideroForm.larvasSumidero,
                pupas: $scope.sumideroForm.pupasSumidero,
                tratado: $scope.sumideroForm.tratadoSumidero,
                insecticida: $scope.sumideroForm.insecticidaSumidero,
                cantidadInsecticida: $scope.sumideroForm.cantInsecticidaSumidero,
                idInfoGeneral: idInfo,
                ubicacion: $scope.sumideroForm.ubicacionSumidero,
                hora: fechaHoras.getHours() + 'h' + fechaHoras.getMinutes() + 'm'
            };
            $http.post(ip+'/webApi.php?val=addSumidero',jsonData).success(function(data) {
                window.localStorage.setItem("previousPage", "menuTipos.html");
                window.localStorage.setItem("numSumidero", sumideros+1);
                window.location.reload("focosView.html");
                
            }).error(function(data) {
                alert("Error al ingresar los datos");
                console.log('Error: ' + data);
                var dataSync = JSON.parse(window.localStorage.getItem("syncData"));

                if (dataSync) {
                    dataSync.push(jsonData);
                    window.localStorage.setItem("syncData", JSON.stringify(dataSync));
                } else {
                    window.localStorage.setItem("syncData", JSON.stringify([jsonData]));
                }
            });
            
            if (recentList) {
                recentList.push(jsonData);
                $scope.recientes = recentList;
                console.log("Existia");
                window.localStorage.setItem("recentList", JSON.stringify(recentList));
            } else {
                console.log("No Existia");
                window.localStorage.setItem("recentList", JSON.stringify([jsonData]));
            }

        } else {
            alert("No pueden haber campos vacios.");
        }    
    };
    $scope.viviendaForm={
        habitantesCasa:0,
        clave:'',
        depositos:'',
        tieneAgua:false,
        P:0,
        L:0,
        medidaTanque:0,
        eliminados:0,
        tratados:0,
        larvicida:0,
        ubicacionVivienda:''
    };

    $scope.viviendaNoRenuente = function(){
        return $scope.viviendaForm.clave!='' && $scope.viviendaForm.clave!='Renuente';
    }

    $scope.medidaTanque = function(){
        return $scope.viviendaForm.depositos == "Tanques bajos";
    }

    $scope.agregarVivienda = function () {
        //Fecha usada para obtener la hora
        var fechaHoras = new Date();
        //Numero de viviendas registradas en el dia
        var viviendas = Number(window.localStorage.getItem("numVivienda"));
        //Id de informacion general
        var idInfo = window.localStorage.getItem("infoID");
        //Lista de formularios recientes
        var recentList = JSON.parse(window.localStorage.getItem("recentList"));        
        
        if ($scope.viviendaForm.ubicacionVivienda!='' && $scope.viviendaForm.clave!='' ) {
            var jsonData = {
                servicio:'addVivienda',
                tipo: $scope.tipo,
                enviado: false,//si se envia no se agrega a la lista de sincronizar                
                clave:$scope.viviendaForm.clave,
                habitantes:$scope.viviendaForm.habitantesCasa,
                deposito:$scope.viviendaForm.depositos,
                medidaTanque:$scope.viviendaForm.medidaTanque,
                tieneAgua:$scope.viviendaForm.tieneAgua,
                P:$scope.viviendaForm.P,
                L:$scope.viviendaForm.L,
                eliminados:$scope.viviendaForm.eliminados,
                tratados:$scope.viviendaForm.tratados,
                larvicida:$scope.viviendaForm.larvicida,
                idInfoGeneral: idInfo,                
                ubicacion: $scope.viviendaForm.ubicacionVivienda,
                hora: fechaHoras.getHours() + 'h' + fechaHoras.getMinutes()+'m'
            };
            $http.post(ip + '/webApi.php?val=addVivienda', jsonData).success(function (data) {                
                window.localStorage.setItem("previousPage", "menuTipos.html");
                window.localStorage.setItem("numVivienda", viviendas+1);
                window.location.reload("focosView.html");                
            }).error(function (data) {
                alert("Error al ingresar los datos");
                console.log('Error: ' + data);
                var dataSync = JSON.parse(window.localStorage.getItem("syncData"));
                if (dataSync) {
                    dataSync.push(jsonData);
                    window.localStorage.setItem("syncData", JSON.stringify(dataSync));
                } else {
                    window.localStorage.setItem("syncData", JSON.stringify([jsonData]));
                }
            });
            //Lista de recientes así se haya enviado o no
            if (recentList) {
                recentList.push(jsonData);
                $scope.recientes = recentList;                
                window.localStorage.setItem("recentList", JSON.stringify(recentList));
            } else {
                window.localStorage.setItem("recentList", JSON.stringify([jsonData]));
            }
            
        }else{
            alert("Revisa que ingresaste la clave y tu ubicación");
        }
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
        ubicacionCDH:'',
        tipoCDH:''
        
    }

    $scope.agregarCDH = function(){
        //Fecha usada para obtener la hora
        var fechaHoras = new Date();
        //Numero de cdh registrados
        var numCDH = Number(window.localStorage.getItem("numCDH"));
        //Id de informacion general
        var idInfo = window.localStorage.getItem("infoID");
        //Lista de formularios recientes
        var recentList = JSON.parse(window.localStorage.getItem("recentList"));
        //Validacion de campos obligatorios
        if ($scope.CDHform.nombre != '' && $scope.CDHform.apellido != '' && $scope.CDHform.cedula != '' && $scope.CDHform.rs != '' && $scope.CDHform.ubicacion != '') {
            //Si hay algun foco la observacion es opcional, si no hay focos debe haber observacion
            if (($scope.CDHform.tipo != '' && ($scope.CDHform.focosEncontrados.length > 0 || $scope.CDHform.focosPotenciales.length > 0 || $scope.CDHform.toldillos.length > 0)) || $scope.CDHform.observaciones != '') {
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
                    ubicacion: $scope.CDHform.ubicacionCDH,
                    infoID: idInfo,
                    hora: fechaHoras.getHours() + 'h' + fechaHoras.getMinutes() + 'm'
                };
                console.log(JSON.stringify(jsonData.encontrados));
                console.log(JSON.stringify(jsonData.potenciales));
                console.log(JSON.stringify(jsonData.toldillos));
                $http.post(ip + '/webApi.php?val=addCDH', jsonData).success(function (data) {
                    window.localStorage.setItem("previousPage", "menuTipos.html");
                    window.localStorage.setItem("numCDH", numCDH + 1);
                    window.location.reload("focosView.html");
                }).error(function (data) {
                    alert("Error al ingresar los datos");
                    console.log('Error: ' + data);
                    var dataSync = JSON.parse(window.localStorage.getItem("syncData"));
                    if (dataSync) {
                        dataSync.push(jsonData);
                        window.localStorage.setItem("syncData", JSON.stringify(dataSync));
                    } else {
                        window.localStorage.setItem("syncData", JSON.stringify([jsonData]));
                    }
                });

                //Lista de recientes así se haya enviado o no
                if (recentList) {
                    recentList.push(jsonData);
                    $scope.recientes = recentList;
                    window.localStorage.setItem("recentList", JSON.stringify(recentList));
                } else {
                    window.localStorage.setItem("recentList", JSON.stringify([jsonData]));
                }

            } else {
                alert("No pueden haber campos vacíos");                
            }
        } else {
            alert("No pueden haber campos vacíos");
        }
    };

    //<------------------------------------------FUNCION PARA GEOLOCALIZACION (API GEOLOCATION)--------------------------------->
    $scope.geolocation=function() {
        var options = { enableHighAccuracy: true };
        watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

        /*Esta funcion es llamada si recibimos datos de parte de geolocation*/
        function onSuccess(position){
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            $scope.sumideroForm.ubicacionSumidero = lat.toFixed(2)+" - "+lon.toFixed(2);
            $scope.viviendaForm.ubicacionVivienda = lat.toFixed(2) + " - " + lon.toFixed(2);
            $scope.CDHform.ubicacionCDH= lat.toFixed(2) + " - " + lon.toFixed(2);
        }
        /*Esta funcion es llamada si existe un error en la geolocation*/
        function onError(error){
            alert("Message: "+error.message);
        }
    };

    $scope.MapaGoogle = function () {
        var rendererOptions = {
            draggable: true
        };

        var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);;

        var directionsService = new google.maps.DirectionsService();

        var map;

        var stepDisplay;

        var markerArray = [];

        var myLatlng = { lat: 3.42, lng: -76.52 };

        function initialize() {

            var mapOptions = {
                center: myLatlng,
                zoom:14
            };

            var marker = new google.maps.Marker({
                position: myLatlng,
                draggable: true,
                title: "Tú posición"
            });

            map = new google.maps.Map(document.getElementById('map-canvas'),
			    mapOptions);

            marker.setMap(map);
            // Create a renderer for directions and bind it to the map.
            directionsDisplay.setMap(map);

            // Instantiate an info window to hold step text.
            stepDisplay = new google.maps.InfoWindow();

            //Evento de arrastrar el marcador
            google.maps.event.addListener(marker, 'dragend', function (evt) {
                $scope.sumideroForm.ubicacionSumidero = evt.latLng.lat().toFixed(2) + " - " + evt.latLng.lng().toFixed(2);
                $scope.viviendaForm.ubicacionVivienda = evt.latLng.lat().toFixed(2) + " - " + evt.latLng.lng().toFixed(2);
                $scope.CDHform.ubicacionCDH= evt.latLng.lat().toFixed(2) + " - " + evt.latLng.lng().toFixed(2);
                
            });            
        }
        google.maps.event.addDomListener(window, 'load', initialize);

    };
    
    //Funcion que envia los datos que no pudieron enviarse
    $scope.sincronizar = function () {
        var dataToSend = JSON.parse(window.localStorage.getItem("syncData"));
        dataToSend.forEach(function (jsonData) {
            if (!jsonData.enviado) {
                switch (jsonData.servicio) {
                    case 'modInfoGeneral':
                        $http.post(ip + '/webApi.php?val=modInfoGeneral', jsonData).success(function (data) {
                            jsonData.enviado = true;
                        }).error(function (data) {
                            alert("No se pudo sincronizar los datos, intente más tarde.");
                        });
                        break;

                    case 'addSumidero':
                        var sumideros = Number(window.localStorage.getItem("numSumidero"));
                        $http.post(ip + '/webApi.php?val=addSumidero', jsonData).success(function (data) {
                            window.localStorage.setItem("numSumidero", sumideros + 1);
                            jsonData.enviado = true;
                        }).error(function (data) {
                            alert("No se pudo sincronizar los datos, intente más tarde.");
                        });

                        break;

                    case 'addVivienda':
                        var viviendas = Number(window.localStorage.getItem("numVivienda"));
                        $http.post(ip + '/webApi.php?val=addVivienda', jsonData).success(function (data) {
                            window.localStorage.setItem("previousPage", "menuTipos.html");
                            window.localStorage.setItem("numVivienda", viviendas + 1);
                            jsonData.enviado = true;
                        }).error(function (data) {
                            alert("No se pudo sincronizar los datos, intente más tarde.");
                        });
                        break;

                    case 'addCDH':
                        var cdhs = Number(window.localStorage.getItem("numCDH"));
                        $http.post(ip + '/webApi.php?val=addCDH', jsonData).success(function (data) {
                            window.localStorage.setItem("previousPage", "menuTipos.html");
                            window.localStorage.setItem("numCDH", cdhs + 1);
                            jsonData.enviado = true;
                        }).error(function (data) {
                            alert("No se pudo sincronizar los datos, intente más tarde.");
                        });
                        break;
                }
            }
        });
        console.log(dataToSend);
        window.localStorage.setItem("syncData", JSON.stringify(dataToSend));
    };
    //Agregar fila encontrado
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
            tipo: 'General',
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
            tipo: 'Hospital/Batallon',
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
    //Habilita el boton de sincronizar cuando haya algo para sincronizar
    $scope.activeSync=function(){
        dataToSync=window.localStorage.getItem("syncData");
        if (dataToSync) {
            if(dataToSync.length>0){
                return false;
            }else{
                return true
            }
        }else{
            return true;
        }
    };

}]);