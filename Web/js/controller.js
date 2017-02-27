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



app.controller("loginController", function($scope, $http, auth){
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
      password: $scope.loginForm.contrasena
    }).success(function(data) {        
        auth.login(data);        
    }).error(function(data) {
      console.log('Error: ' + data);
      $scope.loginError = "Usuario, Rol y/o Contraseña invalidos.";
    });
  };

  $scope.register = function(){    
    $http.post(ip+'webApi.php?val=registroUsuario',{
        cedula: $scope.registroForm.cedula,
        nombres: $scope.registroForm.nombres,
        apellidos: $scope.registroForm.apellidos,
        password: $scope.registroForm.contrasena,
        rol: JSON.stringify($scope.registroForm.coordinador)        
      }).success(function(data){        
        alert("Usuario registrado con exito!");
        auth.login($scope.registroForm.usuario, $scope.registroForm.contrasena,$scope.registroForm.coordinador);
      }).error(function(data) {        
        if (data=="repetido") {
            $scope.registerError ="Ya hay un usuario registrado con la cédula: "+$scope.registroForm.cedula;            
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
    $scope.usuario = JSON.parse($cookies.userInfo);

    //la función logout que llamamos en la vista llama a la función
    //logout de la factoria auth
    $scope.logout = function(){
        auth.logout();
    };

    $scope.changeView= function(view){
        auth.changeLocation(view);
    };
});

app.controller('usersController', function($scope, $http, $filter, auth, $cookies){
    var self =this;
    $scope.Usuarios = [];    
    $scope.usuario = JSON.parse($cookies.userInfo);
    //Pagina actual
    $scope.paginaActual = 0;
    //Filtro de la info
    $scope.filterText='';
    //Tamano paginacion
    $scope.tamanoPagina=10;
    //la función logout que llamamos en la vista llama a la función
    //logout de la factoria auth
    $scope.getAllUsers=function(){
        $http.get(ip + '/webApi.php?val=allUsers', {}).success(function (data) {
            $scope.Usuarios = data;
            //Eliminar al usuario activo del array
            var index = $scope.Usuarios.findIndex(x => x.cedula==parseInt($scope.usuario));
            $scope.Usuarios.splice(index, 1);            
        }).error(function (data) {
            alert("Error al consultar los usuarios");
        });
    };
    //Filtra los datos de acuerdo al input
    $scope.getData=function() {
        return $filter('filter')($scope.Usuarios, $scope.filterText);
    };

    $scope.numeroPaginas=function(){
        return Math.ceil($scope.getData().length/$scope.tamanoPagina);
    };

    $scope.cambiarSupervisor=function(usuario){
        var jsonData = {
            //Si lo esta supervisando lo deja de supervisar
            IDSupervisor: usuario.IDSupervisor!=parseInt($scope.usuario) ? parseInt($scope.usuario):0,
            cedula: usuario.cedula
        };
        $http.post(ip+'webApi.php?val=cambiarSupervisor',jsonData).success(function(data){
            usuario.IDSupervisor=usuario.IDSupervisor!=parseInt($scope.usuario) ? parseInt($scope.usuario):0;
          }).error(function(data) {
            alert('No se pudo actualizar el supervisor');
          });
    };

    $scope.cambiarRol=function(usuario){
        $http.post(ip+'webApi.php?val=cambiarRol',{
            nuevoRol:JSON.stringify(!usuario.rol)
        }).success(function(data){
            console.log("Bien");
          }).error(function(data) {
            console.log("Mal");
          });
    };

    $scope.logout = function(){
        auth.logout();
    };

    $scope.changeView= function(view){
        auth.changeLocation(view);
    };
    $scope.getAllUsers();
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