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
            window.localStorage.setItem("numCDH",0);
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

    $scope.sincronizar=function(){
        var dataToSend=JSON.parse(window.localStorage.getItem("syncData"));
        dataToSend.forEach(function(data){
            switch(data.servicio){
                case 'modInfoGeneral':
                     $http.post(ip+'/webApi.php?val=modInfoGeneral',data).success(function(data) {
                        data.enviado=true;
                        }).error(function(data) {
                            alert("No se pudo sincronizar los datos, intente más tarde.");
                        });
                    break;
                
                case 'addSumidero':
                    var sumideros=Number(window.localStorage.getItem("numSumidero"));
                    $http.post(ip+'/webApi.php?val=addSumidero',data).success(function(data) {
                        window.localStorage.setItem("numSumidero", sumideros+1);
                        data.enviado=true;
                    }).error(function(data) {
                        alert("No se pudo sincronizar los datos, intente más tarde.");
                    });

                    break;

                case 'addVivienda':
                    var viviendas=Number(window.localStorage.getItem("numVivienda"));
                    $http.post(ip+'/webApi.php?val=addVivienda',data).success(function(data) {
                        window.localStorage.setItem("previousPage", "menuTipos.html");
                        window.localStorage.setItem("numVivienda", viviendas+1);
                        data.enviado=true;
                    }).error(function(data) {
                        alert("No se pudo sincronizar los datos, intente más tarde.");
                    });
                    break;

                case 'addCDH':
                    break;

            }
        });
        console.log(dataToSend);
        var index=0;
        var newData=[]
        while(dataToSend.length>0 && index<dataToSend.length){
            if(dataToSend[index].enviado==false){
                newData.push(dataToSend[index]);
                index+=1;
            }else{
                index+=1;
            }
        }
        console.log(newData);
        window.localStorage.setItem("syncData",JSON.stringify(newData));
    };

    $scope.activeSync=function(){
        dataToSync=window.localStorage.getItem("syncData");
        if (dataToSync.length>0) {
            return false;
        }else{            
            return true;
        }
    };


}]);

//<<---------------------------------------------------------------------------------------------------------------------------------------->>
//<<-------------------------------------------- Controlador para ventana de Focos de infeccion-------------------------------------------->>
//<<---------------------------------------------------------------------------------------------------------------------------------------->>
app.controller("focoController", ['$scope', '$http', function($scope, $http){
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
        actividad:''
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

    $scope.changeView = function(nextPage,currentPage){
        window.localStorage.setItem("previousPage", currentPage);
        window.location.replace(nextPage);
    };


    $scope.modificarInfoGeneral = function(){
        if ($scope.editarInfo.municipio!='' && $scope.editarInfo.barrio!='' && $scope.editarInfo.comuna!='' && $scope.editarInfo.actividad!='') {
            var user = window.localStorage.getItem("usuario"); 
            var jsonData = {
                servicio:'modInfoGeneral',
                enviado:false,//Siempre es falso aunque se envie, ya que no entra a sync data
                id: user,
                barrio: $scope.editarInfo.barrio,
                comuna: $scope.editarInfo.comuna,
                actividad: $scope.editarInfo.actividad
            };
            $http.post(ip+'/webApi.php?val=modInfoGeneral',jsonData).success(function(data) {
                window.location.reload("focosView.html");
            }).error(function(data) {
                alert("Error al ingresar los datos");
                var dataSync=JSON.parse(window.localStorage.getItem("syncData"));
                if (dataSync) {
                    dataSync.push(jsonData);
                    window.localStorage.setItem("syncData",JSON.stringify(dataSync));
                }else{
                    window.localStorage.setItem("syncData",JSON.stringify([jsonData]));
                }
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

    $scope.agregarSumidero = function(){
        var idInfo=window.localStorage.getItem("infoID");
        var sumideros=Number(window.localStorage.getItem("numSumidero"));
        if ($scope.sumideroForm.estadoSumidero!='' && $scope.sumideroForm.tratadoSumidero!='' && $scope.sumideroForm.insecticidaSumidero!='' && $scope.sumideroForm.cantInsecticidaSumidero!='' && $scope.sumideroForm.ubicacionSumidero!='') {
            var jsonData = {
                servicio:'addSumidero',
                enviado:false,//Siempre es falso aunque se envie, ya que no entra a sync data
                tipo:$scope.tipo,
                estado: $scope.sumideroForm.estadoSumidero,
                larvas: $scope.sumideroForm.larvasSumidero,
                pupas: $scope.sumideroForm.pupasSumidero,
                tratado: $scope.sumideroForm.tratadoSumidero,
                insecticida: $scope.sumideroForm.insecticidaSumidero,
                cantidadInsecticida: $scope.sumideroForm.cantInsecticidaSumidero,
                idInfoGeneral: idInfo,
                ubicacion: $scope.sumideroForm.ubicacionSumidero
            };
            $http.post(ip+'/webApi.php?val=addSumidero',jsonData).success(function(data) {
                window.localStorage.setItem("previousPage", "menuTipos.html");
                window.localStorage.setItem("numSumidero", sumideros+1);
                window.location.reload("focosView.html");
            }).error(function(data) {
                var dataSync=JSON.parse(window.localStorage.getItem("syncData"));
                if (dataSync) {
                    dataSync.push(jsonData);
                    window.localStorage.setItem("syncData",JSON.stringify(dataSync));
                }else{
                    window.localStorage.setItem("syncData",JSON.stringify([jsonData]));
                }
                alert("Error al ingresar los datos");
                console.log('Error: ' + data);
            });
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

    $scope.agregarVivienda = function(){
        var viviendas=Number(window.localStorage.getItem("numVivienda"));
        var idInfo=window.localStorage.getItem("infoID");
        if ($scope.viviendaForm.ubicacionVivienda!='' && $scope.viviendaForm.clave!='' ) {
            var jsonData = {
                servicio:'addVivienda',
                enviado:false,//Siempre es falso aunque se envie, ya que no entra a sync data
                tipo:$scope.tipo,
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
                ubicacion:$scope.viviendaForm.ubicacionVivienda
            };
            $http.post(ip+'/webApi.php?val=addVivienda',jsonData).success(function(data) {
                window.localStorage.setItem("previousPage", "menuTipos.html");
                window.localStorage.setItem("numVivienda", viviendas+1);
                window.location.reload("focosView.html");
            }).error(function(data) {
                var dataSync=JSON.parse(window.localStorage.getItem("syncData"));
                if (dataSync) {
                    dataSync.push(jsonData);
                    window.localStorage.setItem("syncData",JSON.stringify(dataSync));
                }else{
                    window.localStorage.setItem("syncData",JSON.stringify([jsonData]));
                }
                alert("Error al ingresar los datos");
                console.log('Error: ' + data);
            });
        }else{
            alert("Revisa que ingresaste la clave y tu ubicación");
        }
    };

    $scope.agregarCDH = function(){

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
            $scope.viviendaForm.ubicacionVivienda = lat.toFixed(2)+" - "+lon.toFixed(2);
        }
        /*Esta funcion es llamada si existe un error en la geolocation*/
        function onError(error){
            alert("Message: "+error.message);
        }
    };


    $scope.sincronizar=function(){
        var dataToSend=JSON.parse(window.localStorage.getItem("syncData"));
        var successSend=[];
        dataToSend.forEach(function(data,index){
            switch(data.servicio){
                case 'modInfoGeneral':
                     $http.post(ip+'/webApi.php?val=modInfoGeneral',data).success(function(data) {
                        }).error(function(data) {
                            alert("No se pudo sincronizar los datos, intente más tarde.");
                        });
                    break;

                case 'addSumidero':
                    var sumideros=Number(window.localStorage.getItem("numSumidero"));
                    $http.post(ip+'/webApi.php?val=addSumidero',data).success(function(data) {
                        window.localStorage.setItem("numSumidero", sumideros+1);
                    }).error(function(data) {
                        alert("No se pudo sincronizar los datos, intente más tarde.");
                    });

                    break;

                case 'addVivienda':
                    var viviendas=Number(window.localStorage.getItem("numVivienda"));
                    $http.post(ip+'/webApi.php?val=addVivienda',data).success(function(data) {
                        window.localStorage.setItem("previousPage", "menuTipos.html");
                        window.localStorage.setItem("numVivienda", viviendas+1);
                    }).error(function(data) {
                        alert("No se pudo sincronizar los datos, intente más tarde.");
                    });
                    break;

                case 'addCDH':
                    break;

            }
        });
        
        window.localStorage.setItem("syncData",JSON.stringify([]));
    };

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