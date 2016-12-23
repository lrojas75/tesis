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
        console.log($scope.infoFormData.municipio.municipio);
        console.log($scope.infoFormData.barrio);
        console.log($scope.infoFormData.comuna);
        console.log($scope.infoFormData.actividad);
        if ($scope.infoFormData.municipio.municipio.trim()!='' && $scope.infoFormData.barrio.trim()!='' && $scope.infoFormData.comuna.trim()!='' && $scope.infoFormData.actividad.trim()!='') {}
        var user = window.localStorage.getItem("usuario"); 
        $http.post(ip+'/webApi.php?val=addInfoGeneral',{
            id:user,
            municipio: $scope.infoFormData.municipio.municipio,
            barrio: $scope.infoFormData.barrio,
            comuna: $scope.infoFormData.comuna,
            actividad: $scope.infoFormData.actividad,
            fecha: $scope.infoFormData.fecha        
        }).success(function(data) {
            window.localStorage.setItem("previousPage", "infoGeneral.html");
            window.localStorage.setItem("municipio", $scope.infoFormData.municipio);
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
            }else{
                alert("Error en la conexión");
            }
        }).error(function(data){
            alert("Error al consultar los datos");
        })
    };

    //<<-----------------------Funciones para ventana MENU PRINCIPAL ---------------------------------------->>
    
    var sumideros = 25;
    var viviendas = 10;
    var cdh = 34;
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
            console.log($scope.editarInfo);
            var user = window.localStorage.getItem("usuario"); 
            $http.post(ip+'/webApi.php?val=modInfoGeneral',{
                id: user,
                barrio: $scope.editarInfo.barrio,
                comuna: $scope.editarInfo.comuna,
                actividad: $scope.editarInfo.actividad,
            }).success(function(data) {
                window.location.reload("infoGeneral.html");
            }).error(function(data) {
                alert("Error al ingresar los datos");
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
        console.log($scope.sumideroForm.estadoSumidero);
        console.log($scope.sumideroForm.tratadoSumidero);
        console.log($scope.sumideroForm.insecticidaSumidero);
        console.log($scope.sumideroForm.cantInsecticidaSumidero);
        console.log($scope.sumideroForm.ubicacionSumidero);

        // if ($scope.sumideroForm.estadoSumidero!='' && $scope.sumideroForm.tratadoSumidero!='' && $scope.sumideroForm.insecticidaSumidero!='' && $scope.sumideroForm.cantInsecticidaSumidero!='' && $scope.sumideroForm.ubicacionSumidero!='') {
        //     $http.post(ip+'/webApi.php?val=addSumidero',{
        //         tipo:$scope.tipo,
        //         estado: $scope.estadoSumidero,
        //         larvas: $scope.larvasSumidero,
        //         pupas: $scope.pupasSumidero,
        //         tratado: $scope.tratadoSumidero,
        //         insecticida: $scope.insecticidaSumidero,
        //         cantidadInsecticida: $scope.cantInsecticidaSumidero,
        //         idInfoGeneral: idInfo,
        //         ubicacion: $scope.ubicacionSumidero
        //     }).success(function(data) {
        //         window.localStorage.setItem("previousPage", "menuTipos.html");
        //         window.location.reload("focosView.html");
        //     }).error(function(data) {
        //         alert("Error al ingresar los datos");
        //         console.log('Error: ' + data);
        //     });
        // } else {
        //     alert("No pueden haber campos vacios");
        // }    
    };

    $scope.viviendaForm={
        habitantesCasa:0,
        clave:'',
        depositos:'',
        tieneAgua:false,
        P:0,
        L:0,
        eliminados:0,
        tratados:0,
        larvicida:0,
        ubicacionVivienda:''
    };

    $scope.viviendaNoRenuente = function(){
        return $scope.viviendaForm.clave!='' && $scope.viviendaForm.clave!='Renuente';
    }

    $scope.agregarVivienda = function(){

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
            $scope.sumideroForm.ubicacionSumidero = lat+" - "+lon;
            $scope.viviendaForm.ubicacionVivienda = lat+" - "+lon;
        }
        /*Esta funcion es llamada si existe un error en la geolocation*/
        function onError(error){
            alert("Message: "+error.message);
        }
    };
}]);