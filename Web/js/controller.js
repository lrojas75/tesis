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
    .when("/usuarios",{
        controller: "usersController",
        templateUrl: "templates/usuarios.html"
    })
    .when("/capturaDeDatos",{
        controller: "focosController",
        templateUrl: "templates/capturaDeDatos.html"
    }).otherwise({redirectTo:'/home'})
});

//factory que controla la autentificación, devuelve un objeto
//$cookies para crear cookies
//$cookieStore para actualizar o eliminar
//$location para cargar otras rutas
//Mantiene la sesion persistente
app.factory("auth", function($cookies,$cookieStore,$location)
{
    return{
        login : function(user)
        {
            //creamos la cookie con el nombre que nos han pasado
            $cookies.userInfo = JSON.stringify(user);
            //mandamos a la home
            $location.path("/home");
        },
        logout : function()
        {            
            //al hacer logout eliminamos la cookie con $cookieStore.remove
            $cookieStore.remove("userInfo"),            
            //mandamos al login
            $location.path("/login");
        },
        changeLocation: function(view){
            $location.path(view);
        },
        checkStatus : function()
        {
            //creamos un array con las rutas que queremos controlar
            var rutasPrivadas = ["/home","/login","/usuarios"];
            if(this.in_array($location.path(),rutasPrivadas) && typeof($cookies.userInfo) == "undefined")
            {
                $location.path("/login");
            }
            //en el caso de que intente acceder al login y ya haya iniciado sesión lo mandamos a la home
            if($location.path()=="/login" && typeof($cookies.userInfo) != "undefined")
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


//Paginacion inicio
app.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
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
});