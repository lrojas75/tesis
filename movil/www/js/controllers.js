var app = angular.module("movilapp", ['ngMaterial']);
var ip = window.localStorage.getItem("ipServer");

//<<---------------------------------------------------------------------------------------------------------------------------------------->>
//<<-------------------------------------------- Controlador para ventana de Informacion General-------------------------------------------->>
//<<---------------------------------------------------------------------------------------------------------------------------------------->>


app.controller("infoController", ['$scope', '$filter', '$http', '$sce', function ($scope, $filter, $http, $sce) {
    $scope.modalMessage = '';
    $scope.infoFormData = {
        municipio: '',
        barrio: '',
        comuna: '',
        actividad: '',
        fecha: $filter('date')(Date.now(), 'dd-MM-yyyy')
    };
    $scope.changeView = function(nextPage,currentPage){
        window.localStorage.setItem("previousPage", currentPage);
        window.location.replace(nextPage);
    };

//<<--------------------- Funciones para ventana INFORMACION GENERAL ----------------------------------------->>
    $scope.opciones = [
    { municipio: "Cali", comunaNum: ["1", "2", "3", "4", "5", "6","7", "8", "9","10", "11","13", "17","19", "20", "21", "22"]},
    { municipio: "Palmira", comunaNum: ["1", "2", "3", "4", "5", "6","7", "8", "9","10", "11","13", "14", "15", "16"]},
    { municipio: "Cartago", comunaNum: ["1", "2", "3", "4", "5", "6","7"]},
    { municipio: "Yumbo", comunaNum: ["1", "2", "3", "4"]}];

    
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
        $http.post(ip + '/webApi.php?val=addInfoGeneral', jsonData).success(function (data) {
            //Si se agregan se inicializan variables de flujo
            window.localStorage.setItem("previousPage", "infoGeneral.html");
            window.localStorage.setItem("municipio", $scope.infoFormData.municipio);
            window.localStorage.setItem("numSumidero",0);
            window.localStorage.setItem("numVivienda",0);
            window.localStorage.setItem("numCDH", 0);
            window.localStorage.setItem("recentList", JSON.stringify(new Array()));
            window.localStorage.setItem("syncData", JSON.stringify(new Array()));
            window.location.replace("menuTipos.html");
        }).error(function(data) {
            $scope.modalMessage = $sce.trustAsHtml("<p class='large-text'> Error al enviar los datos. Intente más tarde. </p>");
            $("#infoGeneralModal").modal();
            setTimeout(function () {
                $("#infoGeneralModal").modal("hide");
            }, 3000);            
        });
    };

    $scope.logout = function () {
        window.localStorage.clear();
        window.location.replace("index.html")
    };

    $scope.initInfo = function(){
        var user = window.localStorage.getItem("usuario"); 
        $http.get(ip + '/webApi.php?val=checkInfoGeneral', {
            params: {
                usuario: user,
                fecha: $scope.infoFormData.fecha
            }
        }).success(function (data) {
            if (data != null) {
                window.localStorage.setItem("infoID", data.id);
                window.localStorage.setItem("municipio", data.municipio);                
                window.location.replace("menuTipos.html");
                $http.get(ip + '/webApi.php?val=obtenerInsecticidas', {
                    params: {
                        usuario: user,
                        fecha: $scope.infoFormData.fecha
                    }
                }).success(function (data) {
                    window.localStorage.setItem("insecticidas", JSON.stringify(data));

                }).error(function (data) {
                    $scope.modalMessage = "Error al consultar los datos.";
                    $("#infoGeneralModal").modal();
                    setTimeout(function () {
                        $("#infoGeneralModal").modal("hide");
                    }, 3000);
                });
            }            
        }).error(function (data) {
            $scope.modalMessage = "Error al consultar los datos.";
            $("#infoGeneralModal").modal();
            setTimeout(function () {
                $("#infoGeneralModal").modal("hide");
            }, 3000);
        });

        
    };

}]);

//<<---------------------------------------------------------------------------------------------------------------------------------------->>
//<<-------------------------------------------- Controlador para ventana del Menu principal-------------------------------------------->>
//<<---------------------------------------------------------------------------------------------------------------------------------------->>
app.controller("menuController", ['$scope', '$filter', '$http', '$sce', function ($scope, $filter, $http, $sce) {
    //-----------------------Cambio de IP ---------------------------------
    window.localStorage.setItem("ipServer", ip);
    $scope.cambioIP = function () {
        if ($scope.ipServer.trim() != '') {
            ip = "http://"+$scope.ipServer;
            window.localStorage.setItem("ipServer", ip);
            alert("Se cambió la IP del servidor a: " + ip);
        } else {
            alert("El campo esta vacio");
        }
    };
    //--------------------- FIN cambio IP -----------------------------------
    $scope.modalMessage = '';
    $scope.hayConexion = false;
    $scope.recientes = JSON.parse(localStorage.getItem("recentList"));
    $scope.ipActual = ip;
    $scope.backNavigation = function() {
        var previousPage = window.localStorage.getItem("previousPage");    
        window.location.replace(previousPage);    
    }
    $scope.fecha = $filter('date')(Date.now(), 'dd-MM-yyyy');

    $scope.init = function(){
        var user = window.localStorage.getItem("usuario"); 
        $http.get(ip + '/webApi.php?val=checkInfoGeneral', {
            params: {
                usuario: user,
                fecha: $scope.fecha
            }
        }).success(function (data) {
            $scope.hayConexion = true;
            if (data != null) {
                window.localStorage.setItem("infoID", data.id);
                window.localStorage.setItem("municipio", data.municipio);
                $http.get(ip + '/webApi.php?val=obtenerInsecticidas', {
                    params: {
                        usuario: user,
                        fecha: $scope.fecha
                    }
                }).success(function (data) {
                    window.localStorage.setItem("insecticidas", JSON.stringify(data));

                }).error(function (data) {
                    $scope.modalMessage = "Error al consultar los datos.";
                    $("#infoGeneralModal").modal();
                    setTimeout(function () {
                        $("#infoGeneralModal").modal("hide");
                    }, 3000);
                });

            } else {                
                //Si no hay info en data es porque no hay info general o es de otro dia
                window.location.replace("infoGeneral.html");
            }
        }).error(function (data) {
            //Si no hay conexion pero ya consulto la info general debe dejar continuar
            var idInfo = window.localStorage.getItem("infoID");
            var idMunicipio = window.localStorage.getItem("municipio");
            if (idInfo != null && idMunicipio != null) {
                $scope.hayConexion = true;
            } else {
                $scope.modalMessage = $sce.trustAsHtml("<p> Error en la conexión. </p>");
                $("#menuErrorModal").modal();
                setTimeout(function () {
                    $("#menuErrorModal").modal("hide");
                }, 3000);
            }            
        });
    };

    $scope.logout = function () {
        window.localStorage.clear();
        window.location.replace("index.html")
    };
    //Variables del grafico
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
        if (dataToSend) {
            dataToSend.forEach(function (jsonData) {
                if (!jsonData.enviado) {
                    switch (jsonData.servicio) {
                        case 'modInfoGeneral':
                            $http.post(ip + '/webApi.php?val=modInfoGeneral', jsonData).success(function (data) {
                                jsonData.enviado = true;
                            }).error(function (data) {
                                allSent = false;
                                $scope.modalMessage = $sce.trustAsHtml("<p class='large-text'> No se pudo sincronizar los datos. Intente más tarde. </p>");
                                $("#menuErrorModal").modal();
                                setTimeout(function () {
                                    $("#menuErrorModal").modal("hide");
                                }, 3000);
                            });
                            break;

                        case 'addSumidero':
                            var sumideros = Number(window.localStorage.getItem("numSumidero"));
                            $http.post(ip + '/webApi.php?val=addSumidero', jsonData).success(function (data) {
                                window.localStorage.setItem("numSumidero", sumideros + 1);
                                jsonData.enviado = true;
                            }).error(function (data) {
                                allSent = false;
                                $scope.modalMessage = $sce.trustAsHtml("<p class='large-text'> No se pudo sincronizar los datos. Intente más tarde. </p>");
                                $("#menuErrorModal").modal();
                                setTimeout(function () {
                                    $("#menuErrorModal").modal("hide");
                                }, 3000);
                            });

                            break;

                        case 'addVivienda':
                            var viviendas = Number(window.localStorage.getItem("numVivienda"));
                            $http.post(ip + '/webApi.php?val=addVivienda', jsonData).success(function (data) {
                                window.localStorage.setItem("previousPage", "menuTipos.html");
                                window.localStorage.setItem("numVivienda", viviendas + 1);
                                jsonData.enviado = true;
                            }).error(function (data) {
                                allSent = false;
                                $scope.modalMessage = $sce.trustAsHtml("<p class='large-text'> No se pudo sincronizar los datos. Intente más tarde. </p>");
                                $("#menuErrorModal").modal();
                                setTimeout(function () {
                                    $("#menuErrorModal").modal("hide");
                                }, 3000);
                            });
                            break;

                        case 'addCDH':
                            var cdhs = Number(window.localStorage.getItem("numCDH"));
                            $http.post(ip + '/webApi.php?val=addCDH', jsonData).success(function (data) {
                                window.localStorage.setItem("previousPage", "menuTipos.html");
                                window.localStorage.setItem("numCDH", cdhs + 1);
                                jsonData.enviado = true;
                            }).error(function (data) {
                                allSent = false;
                                $scope.modalMessage = $sce.trustAsHtml("<p class='large-text'> No se pudo sincronizar los datos. Intente más tarde. </p>");
                                $("#menuErrorModal").modal();
                                setTimeout(function () {
                                    $("#menuErrorModal").modal("hide");
                                }, 3000);
                            });
                            break;
                    }
                }
            });
            window.localStorage.setItem("syncData", JSON.stringify(dataToSend));
        } else {
            $scope.modalMessage = $sce.trustAsHtml("<p class='large-text'> No hay datos para sincronizar. </p>");
            $("#menuSuccessModal").modal();
            setTimeout(function () {
               $("#menuSuccessModal").modal("hide");
            }, 3000);
        }
    };
    //Habilita el boton de sincronizar cuando haya algo para sincronizar
    $scope.activeSync = function () {
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

}]);

//<<---------------------------------------------------------------------------------------------------------------------------------------->>
//<<-------------------------------------------- Controlador para ventana de Focos de infeccion-------------------------------------------->>
//<<---------------------------------------------------------------------------------------------------------------------------------------->>
app.controller("focoController", ['$scope', '$http', '$sce', function ($scope, $http, $sce) {
    //Ubicacion de la persona
    $scope.ubicacionActual = '0,0';
    $scope.modalMessage = '';
    $scope.ipActual = ip;
    $scope.showMap = false;//Mostrar mapa
    $scope.municipios = [
        { municipio: "Cali", comunaNum: ["1", "2", "3", "4", "5", "6","7", "8", "9","10", "11","13", "17","19", "20", "21", "22"]},
        { municipio: "Palmira", comunaNum: ["1", "2", "3", "4", "5", "6","7", "8", "9","10", "11","13", "14", "15", "16"]},
        { municipio: "Cartago", comunaNum: ["1", "2", "3", "4", "5", "6","7"]}
        { municipio: "Yumbo", comunaNum: ["1", "2", "3", "4"]}];
    //Valores del formulario de modificar info
    $scope.editarInfo = {
        municipio: window.localStorage.getItem("municipio"),
        barrio: '',
        comuna: '',
        comunas: [],
        actividad: '',

    };
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

    $scope.logout = function () {
        window.localStorage.clear();
        window.location.replace("index.html")
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
                $scope.modalMessage = $sce.trustAsHtml("<p> Datos Guardados. </p>");
                $("#focoSuccessModal").modal();
                setTimeout(function () {
                    $("#focoSuccessModal").modal("hide");
                }, 3000);
                jsonData.enviado = true;
                window.location.reload("focosView.html");
                
            }).error(function(data) {
                $scope.modalMessage = $sce.trustAsHtml("<p> Error en la conexión. </p>");
                $("#focoErrorModal").modal();
                setTimeout(function () {
                    $("#focoErrorModal").modal("hide");
                }, 3000);
                console.log('Error: ' + data);
            });
        }
    };


    //Valores para el formulario de sumideros
    $scope.sumideroForm = {
        estadoSumidero: '',
        larvasSumidero: '',
        pupasSumidero: '',
        tratadoSumidero: '',
        insecticidaSumidero: '',
        cantInsecticidaSumidero: '',
        arrayInsecticidas: JSON.parse(window.localStorage.getItem("insecticidas"))        
    };

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
                idInfoGeneral: idInfo,
                ubicacion: $scope.ubicacionActual,
                hora: fechaHoras.getHours() + 'h' + fechaHoras.getMinutes() + 'm'
            };
            $scope.tipo = '';
            $scope.ubicacionActual = '0,0';
            $scope.sumideroForm = {
                estadoSumidero: '',
                larvasSumidero: '',
                pupasSumidero: '',
                tratadoSumidero: '',
                insecticidaSumidero: '',
                cantInsecticidaSumidero: '',
                arrayInsecticidas: JSON.parse(window.localStorage.getItem("insecticidas")),                
            };
            $http.post(ip+'/webApi.php?val=addSumidero',jsonData).success(function(data) {
                window.localStorage.setItem("previousPage", "menuTipos.html");
                window.localStorage.setItem("numSumidero", sumideros+1);
                $scope.modalMessage = $sce.trustAsHtml("<p> Datos Guardados. </p>");
                $("#focoSuccessModal").modal();
                setTimeout(function () {
                    $("#focoSuccessModal").modal("hide");
                }, 3000);
            }).error(function(data) {
                $scope.modalMessage = $sce.trustAsHtml("<p class='large-text'> No hay conexión. Puede reenviar los datos en la opción sincronizar.</p>");
                $("#focoErrorModal").modal();
                setTimeout(function () {
                    $("#focoErrorModal").modal("hide");
                }, 5000);
                               
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
                
                window.localStorage.setItem("recentList", JSON.stringify(recentList));
            } else {
                
                window.localStorage.setItem("recentList", JSON.stringify([jsonData]));
            }

        } else {
            $scope.modalMessage = $sce.trustAsHtml("<p> No pueden haber campos vacíos. </p>");
            $("#focoErrorModal").modal();
            setTimeout(function () {
                $("#focoErrorModal").modal("hide");
            }, 3000);
        }    
    };
    $scope.viviendaForm = {
        nombre: '',
        apellido: '',
        cedula: '',
        habitantesCasa:0,
        clave:'',
        depositos:[]        
    };

    $scope.viviendaNoRenuente = function () {
        return $scope.viviendaForm.clave != '' && $scope.viviendaForm.clave != 'Renuente' && $scope.viviendaForm.clave != 'Cerrada';
    };

    $scope.agregarDeposito = function () {
        var newIndex = $scope.viviendaForm.depositos.length;
        var row = {
            index: newIndex,
            deposito: '',
            tieneAgua: '',
            P: '',
            L: '',            
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

    $scope.agregarVivienda = function () {
        //Fecha usada para obtener la hora
        var fechaHoras = new Date();
        //Numero de viviendas registradas en el dia
        var viviendas = Number(window.localStorage.getItem("numVivienda"));
        //Id de informacion general
        var idInfo = window.localStorage.getItem("infoID");
        //Lista de formularios recientes
        var recentList = JSON.parse(window.localStorage.getItem("recentList"));        
        
        if ($scope.ubicacionActual != '0,0' && $scope.viviendaForm.clave!='' ) {
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
                idInfoGeneral: idInfo,
                ubicacion: $scope.ubicacionActual,
                hora: fechaHoras.getHours() + 'h' + fechaHoras.getMinutes()+'m'
            };
            $scope.tipo = '';
            $scope.ubicacionActual = '0,0';
            $scope.viviendaForm = {
                nombre: '',
                apellido: '',
                cedula: '',
                habitantesCasa: 0,
                clave: '',
                depositos: []                
            };            
            $http.post(ip + '/webApi.php?val=addVivienda', jsonData).success(function (data) {                
                window.localStorage.setItem("previousPage", "menuTipos.html");
                window.localStorage.setItem("numVivienda", viviendas + 1);
                $scope.modalMessage = $sce.trustAsHtml("<p> Datos Guardados. </p>");
                $("#focoSuccessModal").modal();
                setTimeout(function () {
                    $("#focoSuccessModal").modal("hide");
                }, 3000);
            }).error(function (data) {
                $scope.modalMessage = $sce.trustAsHtml("<p class='large-text'> No hay conexión. Puede reenviar los datos en la opción sincronizar.</p>");
                $("#focoErrorModal").modal();
                setTimeout(function () {
                    $("#focoErrorModal").modal("hide");
                }, 5000);
                
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
            $scope.modalMessage = $sce.trustAsHtml("<p class='large-text'> Revisa que ingresaste la clave y tu ubicación.</p>");            
            $("#focoErrorModal").modal();
            setTimeout(function () {
                $("#focoErrorModal").modal("hide");
            }, 3000);            
        }
    };
    //Informacion CDH
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
                    plazo: $scope.CDHform.plazo,
                    hora: fechaHoras.getHours() + 'h' + fechaHoras.getMinutes() + 'm'
                };
                $scope.tipo = '';
                $scope.ubicacionActual = '0,0';
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
                    window.localStorage.setItem("previousPage", "menuTipos.html");
                    window.localStorage.setItem("numCDH", numCDH + 1);                    
                    $scope.modalMessage = $sce.trustAsHtml("<p> Datos Guardados. </p>");
                    $("#focoSuccessModal").modal();
                    setTimeout(function () {
                        $("#focoSuccessModal").modal("hide");
                    }, 3000);
                }).error(function (data) {
                    $scope.modalMessage = $sce.trustAsHtml("<p class='large-text'> No hay conexión. Puede reenviar los datos en la opción sincronizar.</p>");
                    $("#focoErrorModal").modal();
                    setTimeout(function () {
                        $("#focoErrorModal").modal("hide");
                    }, 5000);                    
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
                $scope.modalMessage = $sce.trustAsHtml("<p> No pueden haber campos vacíos. </p>");
                $("#focoErrorModal").modal();
                setTimeout(function () {
                    $("#focoErrorModal").modal("hide");
                }, 3000);
            }
        } else {
            $scope.modalMessage = $sce.trustAsHtml("<p> No pueden haber campos vacíos. </p>");
            $("#focoErrorModal").modal();
            setTimeout(function () {
                $("#focoErrorModal").modal("hide");
            }, 3000);
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
            $scope.ubicacionActual = lat + ',' + lon;            
        }
        /*Esta funcion es llamada si existe un error en la geolocation*/
        function onError(error){
            alert("Message: "+error.message);
        }
    };

    //Funcion para mostrar el valor de la ubicacion en el input
    $scope.showUbicacion = function () {
        var split = $scope.ubicacionActual.split(",");
        return parseInt(split[0]).toFixed(2) + "-" + parseInt(split[1]).toFixed(2);
    };



    $scope.MapaGoogle = function () {
        var rendererOptions = {
            draggable: true
        };

        var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);

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
            marker.setAnimation(google.maps.Animation.BOUNCE);
            marker.setMap(map);
            // Create a renderer for directions and bind it to the map.
            directionsDisplay.setMap(map);

            // Instantiate an info window to hold step text.
            stepDisplay = new google.maps.InfoWindow();

            //Evento de arrastrar el marcador
            google.maps.event.addListener(marker, 'dragend', function (evt) {
                $scope.ubicacionActual=evt.latLng.lat() + "," + evt.latLng.lng();
            });            
        }
        google.maps.event.addDomListener(window, 'load', initialize);

    };
    
    //Funcion que envia los datos que no pudieron enviarse
    $scope.sincronizar = function () {        
        var dataToSend = JSON.parse(window.localStorage.getItem("syncData"));
        if (dataToSend) {
            dataToSend.forEach(function (jsonData) {
                if (!jsonData.enviado) {
                    switch (jsonData.servicio) {
                        case 'modInfoGeneral':
                            $http.post(ip + '/webApi.php?val=modInfoGeneral', jsonData).success(function (data) {
                                jsonData.enviado = true;
                            }).error(function (data) {                                
                                $scope.modalMessage = $sce.trustAsHtml("<p class='large-text'> No se pudo sincronizar los datos. Intente más tarde. </p>");
                                $("#focoErrorModal").modal();
                                setTimeout(function () {
                                    $("#focoErrorModal").modal("hide");
                                }, 3000);
                            });
                            break;

                        case 'addSumidero':
                            var sumideros = Number(window.localStorage.getItem("numSumidero"));
                            $http.post(ip + '/webApi.php?val=addSumidero', jsonData).success(function (data) {
                                window.localStorage.setItem("numSumidero", sumideros + 1);
                                jsonData.enviado = true;
                            }).error(function (data) {                                
                                $scope.modalMessage = $sce.trustAsHtml("<p class='large-text'> No se pudo sincronizar los datos. Intente más tarde. </p>");
                                $("#focoErrorModal").modal();
                                setTimeout(function () {
                                    $("#focoErrorModal").modal("hide");
                                }, 3000);
                            });

                            break;

                        case 'addVivienda':
                            var viviendas = Number(window.localStorage.getItem("numVivienda"));
                            $http.post(ip + '/webApi.php?val=addVivienda', jsonData).success(function (data) {
                                window.localStorage.setItem("previousPage", "menuTipos.html");
                                window.localStorage.setItem("numVivienda", viviendas + 1);
                                jsonData.enviado = true;
                            }).error(function (data) {                                
                                $scope.modalMessage = $sce.trustAsHtml("<p class='large-text'> No se pudo sincronizar los datos. Intente más tarde. </p>");
                                $("#focoErrorModal").modal();
                                setTimeout(function () {
                                    $("#focoErrorModal").modal("hide");
                                }, 3000);
                            });
                            break;

                        case 'addCDH':
                            var cdhs = Number(window.localStorage.getItem("numCDH"));
                            $http.post(ip + '/webApi.php?val=addCDH', jsonData).success(function (data) {
                                window.localStorage.setItem("previousPage", "menuTipos.html");
                                window.localStorage.setItem("numCDH", cdhs + 1);
                                jsonData.enviado = true;
                            }).error(function (data) {                                
                                $scope.modalMessage = $sce.trustAsHtml("<p class='large-text'> No se pudo sincronizar los datos. Intente más tarde. </p>");
                                $("#focoErrorModal").modal();
                                setTimeout(function () {
                                    $("#focoErrorModal").modal("hide");
                                }, 3000);
                            });
                            break;
                    }
                }
            });
            
            window.localStorage.setItem("syncData", JSON.stringify(dataToSend));
        } else {
            $scope.modalMessage = $sce.trustAsHtml("<p> No hay datos para sincronizar. </p>");
            $("#focoSuccessModal").modal();
            setTimeout(function () {
                $("#focoSuccessModal").modal("hide");
            }, 3000);
        }
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

}]);