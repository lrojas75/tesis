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
        login : function(username, password, rol)
        {
            //creamos la cookie con el nombre que nos han pasado
            $cookies.username = username,
            $cookies.password = password;
            $cookies.role =JSON.stringify(rol);
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
    $scope.coordinador=false;
    $scope.showLogin=true;
    $scope.loginForm={
        usuario:'',
        contrasena:'',
        coordinador:false
    };
    $scope.registroForm={
        nombres:'',
        apellidos:'',
        cedula:'',
        contrasena:'',
        coordinador:false
    };
//<--------------------------FUNCION PARA INICIO DE SESION ------------------------------------->
  $scope.login = function(){
    $http.post(ip+'webApi.php?val=loginUsuario',{
      username: $scope.loginForm.usuario,
      password: $scope.loginForm.contrasena,
    }).success(function(data) {
       auth.login($scope.loginForm.usuario, $scope.loginForm.contrasena,$scope.loginForm.coordinador);
    }).error(function(data) {
      console.log('Error: ' + data);      
      $scope.loginError = "Usuario y/o Contraseña invalidos.";
    });
  };

  $scope.register = function(){    
      $http.post(ip+'/webApi.php?val=registroUsuario',{
        cedula: $scope.registroForm.cedula,
        nombres: $scope.registroForm.nombres,
        apellidos: $scope.registroForm.apellidos,
        password: $scope.registroForm.contrasena,
        rol: JSON.stringify($scope.coordinador)
      }).success(function(data) {
        console.log(data);
        alert("Usuario registrado con exito!");
        auth.login($scope.registroForm.usuario, $scope.registroForm.contrasena,$scope.registroForm.coordinador);
      }).error(function(data) {
        console.log('Error: ' + data);
        if (data=="repetido") {
            $scope.registerError ="Ya hay un usuario registrado con la cedula No: "+$scope.cedula;            
        }else{
            $scope.registerError = "No se pudo registrar al usuario.";
        }
        
      });
  };  



  $scope.changePage=function(){
    $scope.showLogin=!$scope.showLogin;
  };
});

app.controller('homeController', function($scope, $http, auth, $cookies){ 
    //devolvemos a la vista el nombre del usuario
    $scope.usuario = $cookies.username;
    $scope.contrasena = $cookies.password;
    $scope.rolUsuario = JSON.parse($cookies.role);    
    //la función logout que llamamos en la vista llama a la función
    //logout de la factoria auth
    $scope.logout = function()
    {
        auth.logout();
    };

    $scope.esCoordinador=function()
    {        
        return $scope.rolUsuario;
    };
    $scope.changeView= function(view){
        auth.changeLocation(view);
    };
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
});