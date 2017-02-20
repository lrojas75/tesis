var app = angular.module('app', ['ngCookies']);
var ip = "http://192.168.0.15/";

//Config de ruta y de headers
app.config(function ($httpProvider,$routeProvider) {
  //CORS ENABLED  
  $httpProvider.defaults.headers.common = {};
  $httpProvider.defaults.headers.post = {};
  $httpProvider.defaults.headers.put = {};
  $httpProvider.defaults.headers.patch = {};
  //Enrutamiento de template y controlador
  $routeProvider.when("/login", {
        controller : "loginController",
        templateUrl : "templates/login.html"
    })
    .when("/home", {
        controller : "homeController",
        templateUrl : "templates/home.html"
    })
    .when("/register",{
        controller : "registerController",
        templateUrl: "templates/register.html"
    })
    

});

//factory que controla la autentificación, devuelve un objeto
//$cookies para crear cookies
//$cookieStore para actualizar o eliminar
//$location para cargar otras rutas
//Mantiene la sesion persistente
app.factory("auth", function($cookies,$cookieStore,$location)
{
    return{
        login : function(username, password, role)
        {
            //creamos la cookie con el nombre que nos han pasado
            $cookies.username = username,
            $cookies.password = password;
            $cookies.role = role;
            //mandamos a la home
            $location.path("/home");
        },
        logout : function()
        {
            //al hacer logout eliminamos la cookie con $cookieStore.remove
            $cookieStore.remove("username"),
            $cookieStore.remove("password");
            $cookieStore.remove("role");
            //mandamos al login
            $location.path("/login");
        },
        changeLocation: function(view){
            $location.path(view);
        },
        checkStatus : function()
        {
            //creamos un array con las rutas que queremos controlar
            var rutasPrivadas = ["/home","/login"];
            if(this.in_array($location.path(),rutasPrivadas) && typeof($cookies.username) == "undefined")
            {
                $location.path("/login");
            }
            //en el caso de que intente acceder al login y ya haya iniciado sesión lo mandamos a la home
            if(this.in_array("/login",rutasPrivadas) && typeof($cookies.username) != "undefined")
            {
                $location.path("/home");
            }
        },
        //Funcion para buscar la ruta needle=lo que se busca, haystack=donde se busca
        in_array : function(needle, haystack)
        {
            var key = '';
            for(key in haystack)
            {
                if(haystack[key] == needle)
                {
                    return true;
                }
            }
            return false;
        }
    }
});



app.controller("loginController", function($scope, $http, auth){	

//<--------------------------FUNCION PARA INICIO DE SESION ------------------------------------->
  $scope.login = function(){ //Funcion para el inicio de sesion
    var funcion = "loginUsuario";
    if($scope.coordinador == true){
    	funcion = "loginCoordinador";
    }
    $http.post(ip+'webApi.php?val='+funcion,{
      username: $scope.usuario,
      password: $scope.contrasena,
    }).success(function(data) {
       auth.login($scope.usuario, $scope.contrasena,funcion);
    }).error(function(data) {
      console.log('Error: ' + data);
      $scope.username="";
      $scope.password="";
      $scope.loginError = "Usuario y/o Contraseña invalidos.";
    });
  };

  $scope.changeView= function(view){
    auth.changeLocation(view);
  };
//<-----------------------FUNCION PARA REGISTRAR UN USUARIO NUEVO ------------------------->


});


app.controller("registerController", function($scope, $http,auth){ 
    $scope.register = function(){
    var funcion = "registroUsuario";
      if($scope.coordinador == true){
        funcion = "registroCoordinador";
      }
      $http.post(ip+'/webApi.php?val='+funcion,{
        cedula: $scope.cedula,
        nombres: $scope.nombres,
        apellidos: $scope.apellidos,
        password: $scope.contrasena

      }).success(function(data) {
        alert("Usuario registrado con exito!");
        $scope.cedula = "";
        $scope.nombres = "";
        $scope.apellidos = "";
        $scope.contrasena = "";
        auth.login($scope.usuario, $scope.contrasena,funcion);
      }).error(function(data) {
        console.log('Error: ' + data);
        $scope.registerError = "No se pudo registrar al usuario.";
      });
  };  

});


app.controller('homeController', function($scope, $http, auth, $cookies){ 
    //devolvemos a la vista el nombre del usuario
    $scope.usuario = $cookies.username;
    $scope.contrasena = $cookies.password;
    //la función logout que llamamos en la vista llama a la función
    //logout de la factoria auth
    $scope.logout = function()
    {
        auth.logout();
    }
});

app.run(function($rootScope, auth)
{
    //al cambiar de rutas
    $rootScope.$on('$routeChangeStart', function()
    {
        //llamamos a checkStatus, el cual lo hemos definido en la factoria auth
        //la cuál hemos inyectado en la acción run de la aplicación
        auth.checkStatus();
    })
})

//-----------------------------Controlador ventana HOME--------------------
// app.controller("homeController", ['$scope', '$http', '$timeout', '$mdSidenav', '$log' ,function($scope, $http, $timeout, $mdSidenav, $log){
  
//   $scope.toggleLeft = buildDelayedToggler('left');
//   function buildDelayedToggler(navID) {
//       return debounce(function() {
//         // Component lookup should always be available since we are not using `ng-if`
//         $mdSidenav(navID)
//           .toggle()
//           .then(function () {
//             $log.debug("toggle " + navID + " is done");
//           });
//       }, 200);
//     }
//   function debounce(func, wait, context) {
//       var timer;

//       return function debounced() {
//         var context = $scope,
//             args = Array.prototype.slice.call(arguments);
//         $timeout.cancel(timer);
//         timer = $timeout(function() {
//           timer = undefined;
//           func.apply(context, args);
//         }, wait || 10);
//       };
//     }
//     $scope.close = function () {
//       // Component lookup should always be available since we are not using `ng-if`
//       $mdSidenav('left').close()
//         .then(function () {
//           $log.debug("close LEFT is done");
//         });

//     };


//   $scope.changeView = function(view){ //Funcion para el cambio de ventana
//       window.location.replace(view);            
//   }
  
// }]);

  