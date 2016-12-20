var app = angular.module('movilapp', ['ngMaterial']);
var ip = "http://192.168.0.15:80";

//<<---------------------------------------------------------------------------------------------------------------------------------------->>
//<<-------------------------------------------- Controlador para ventana de Informacion General-------------------------------------------->>
//<<---------------------------------------------------------------------------------------------------------------------------------------->>
app.controller("infoController", ['$scope', '$filter', '$http', function($scope, $filter, $http){

$scope.changeView = function(nextPage,currentPage){
    window.localStorage.setItem("previousPage", currentPage);
    window.location.replace(nextPage);
}

$scope.backNavigation = function() {
    var previousPage = window.localStorage.getItem("previousPage");    
    window.location.replace(previousPage);    
}
//<<--------------------- Funciones para ventana INFORMACION GENERAL ----------------------------------------->>
$scope.opciones = [
    { municipio: "Cali", comunaNum: ["1", "2", "3", "4", "5", "6","7", "8", "9","10", "11","13", "17","19", "20", "21", "22"]},
    { municipio: "Palmira", comunaNum: ["1", "2", "3", "4", "5", "6","7", "8", "9","10", "11","13", "14", "15", "16"]},
    { municipio: "Cartago", comunaNum: ["1", "2", "3", "4", "5", "6","7"]}];

$scope.fecha = $filter('date')(Date.now(), 'dd-MM-yyyy');

//<------------------------------------FUNCION PARA AGREGAR LA INFORMACION GENERAL DEL RECORRIDO ------------------------->
$scope.agregarInfoGeneral = function(){
    if ($scope.municipio!=undefined && $scope.barrio!=undefined && $scope.comuna!=undefined && $scope.actividad!=undefined) {
        $http.post(ip+'/webApi.php?val=addInfoGeneral',{
            municipio: $scope.municipio.municipio,
            barrio: $scope.barrio,
            comuna: $scope.comuna,
            actividad: $scope.actividad,
            fecha: $scope.fecha        
        }).success(function(data) {
            window.localStorage.setItem("previousPage", "infoGeneral.html");
            window.location.replace("menuTipos.html");
        }).error(function(data) {
            alert("Error al ingresar los datos");
            console.log('Error: ' + data);
        });
    }
};

}]);

//<<---------------------------------------------------------------------------------------------------------------------------------------->>
//<<-------------------------------------------- Controlador para ventana del Menu principal-------------------------------------------->>
//<<---------------------------------------------------------------------------------------------------------------------------------------->>
app.controller("menuController", ['$scope', '$http', function($scope, $http){

    $scope.backNavigation = function() {
        var previousPage = window.localStorage.getItem("previousPage");    
        window.location.replace(previousPage);    
    }

//<<----------------------------- Local Storage ---------------------------------------------->>
/*$("button").click(function() {//Metodo para obtener el boton al cual le dieron 'click'.
    //Se usa localStorage para guardar el tipo de foco de infeccion seleccionado en la ventana de menu principal.
    window.localStorage.setItem("tipoFoco", $(this).attr('id'));
});*/

//<<-------------------------------BD local-------------------------------------------->>
/*function llenarBD(tx) {
     tx.executeSql('CREATE TABLE IF NOT EXISTS focosInfeccion (ID unique, idTipo, Estado, Larvas, Pupas, Habitantes, Clave, tipoDeposito, Tiene_Agua, L, P, Medida_Tanque, Destruido_Eliminado, Tratado, Tratado_Sin_Insoeccionar, Larvicida, Cantidad, Usuario, idInfoGeneral, Ubicacion, Comuna, Barrrio)');
     tx.executeSql('CREATE TABLE IF NOT EXISTS infoGeneral (ID unique, Municipio, Actividad, Fecha)');
 }

function errorCB(err) {
    alert("Error processing SQL: "+err.code);
}

function successCB() {
    alert("success!");
}

var db = window.openDatabase("movilBD", "1.0", "BD movil local", 200000);
db.transaction(llenarBD, errorCB, successCB);*/


//<<-----------------------Funciones para ventana MENU PRINCIPAL ---------------------------------------->>
function obtenerTotales(){ //Funcion que permite obtener el total de focos de infeccion agregados por cada tipo para mostrar el grafico

}

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
}
}]);

//<<---------------------------------------------------------------------------------------------------------------------------------------->>
//<<-------------------------------------------- Controlador para ventana de Focos de infeccion-------------------------------------------->>
//<<---------------------------------------------------------------------------------------------------------------------------------------->>
app.controller("focoController", ['$scope', '$http', function($scope, $http){
    $scope.backNavigation = function() {
        var previousPage = window.localStorage.getItem("previousPage");    
        window.location.replace(previousPage);    
    }

//Funcion para activar el formulario que se va a mostrar
$scope.mostrar = function(tipoEscogido){
    return $scope.tipo===tipoEscogido;
}

$scope.changeView = function(nextPage,currentPage){
    window.localStorage.setItem("previousPage", currentPage);
    window.location.replace(nextPage);
}
$scope.agregarSumidero = function(){
    $http.post(ip+'/webApi.php?val=addSumidero',{
        estado: $scope.estadoSumidero,
        larvas: $scope.larvasSumidero,
        pupas: $scope.pupasSumidero,
        tratado: $scope.tratadoSumidero,
        insecticida: $scope.insecticidaSumidero,
        cantidadInsecticida: $scope.cantInsecticidaSumidero,
        ubicacion: $scope.ubicacionSumidero

    }).success(function(data) {
        window.localStorage.setItem("previousPage", "menuTipos.html");
        window.location.reload("focosView.html");
    }).error(function(data) {
        alert("Error al ingresar los datos");
        console.log('Error: ' + data);
    });

}
$scope.agregarVivienda = function(){

}
$scope.agregarCDH = function(){

}

//<------------------------------------------FUNCION PARA GEOLOCALIZACION (API GEOLOCATION)--------------------------------->
function geolocation() {
            var options = { enableHighAccuracy: true };
            watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
        
            /*Esta funcion es llamada si recibimos datos de parte de geolocation*/
            function onSuccess(position){
                var lat = position.coords.latitude;
                var lon = position.coords.longitude;

                localStorage.setItem("latitude", lat);
                localStorage.setItem("longitude", lon);

                document.getElementById("campoUbic").value = lat+" - "+lon;
            }
            /*Esta funcion es llamada si existe un error en la geolocation*/
            function onError(error){
                alert("Message: "+error.message);
            }
};
}]);