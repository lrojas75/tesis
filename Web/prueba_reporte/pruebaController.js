angular.module('app', []).controller('pruebaController', function($scope){
	$scope.mesusuario = '';
	
	//Obtiene la fecha actual y el año
	var hoy = new Date();
	$scope.yearusuario = hoy.getFullYear();
	
	$scope.todos = [];
	$scope.meses = [
		{mes:'Enero', valor:'-01-'}, {mes:'Febrero', valor:'-02-'},
		{mes:'Marzo',valor:'-03-'}, {mes:'Abril',valor:'-04-'}, 
		{mes:'Mayo',valor:'-05-'}, {mes:'Junio',valor:'-06-'}, 
		{mes:'Julio',valor:'-07-'}, {mes:'Agosto',valor:'-08-'}, 
		{mes:'Septiembre',valor:'-09-'}, {mes:'Octubre',valor:'-10-'}, 
		{mes:'Noviembre',valor:'-11-'}, {mes:'Diciembre',valor:'-12-'}
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


    $scope.mesActual = function (mes) {
        if($scope.mesusuario == ''){
			var date = new Date();
			$scope.mesusuario = date.getMonth()+1; //obtiene el mes actual
		}
    }

	$scope.export = function(){
		var sumideros = alasql('SELECT * FROM HTML("#sumideros",{headers:true})');
        var viviendas = alasql('SELECT * FROM HTML("#viviendas",{headers:true})');
        var cdh = alasql('SELECT * FROM HTML("#cdh",{headers:true})');
		var opts = [{sheetid:'Reporte de sumideros',header:true},{sheetid:'Reporte de viviendas',header:false}, {sheetid:'Reporte de CDH',header:false}];
		alasql('SELECT * INTO XLSX("Reporte SAFI.xlsx",?) \ FROM ?', [opts,[sumideros,viviendas,cdh]]);
	}

	$scope.mesActual();
});
