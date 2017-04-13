angular.module('app').controller("loginController", function($scope, $http, auth){
	$scope.cedulaValidacion='';
	$scope.activePage='login';
	$scope.modalMessage='';
	$scope.loginForm={
			usuario:'',
			contrasena:'',
			coordinador:false
	};
	$scope.registroForm={
			nombres:'',
			apellidos:'',
			correo:'',
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
			$scope.loginError = "Usuario y/o Contraseña inválidos.";
		});
	};

	$scope.register = function(){    
		$http.post(ip+'webApi.php?val=registroUsuario',{
				cedula: $scope.registroForm.cedula,
				nombres: $scope.registroForm.nombres,
				apellidos: $scope.registroForm.apellidos,
				correo:$scope.registroForm.correo,
				password: $scope.registroForm.contrasena,
				rol: JSON.stringify($scope.registroForm.coordinador)
			}).success(function(data){        
				$scope.modalMessage = "Usuario Registrado con éxito.";
				$("#loginSuccessModal").modal();
				setTimeout(function () {
					$("#loginSuccessModal").modal("hide");
				}, 3000);
				$scope.registroForm={
					nombres:'',
					apellidos:'',
					correo:'',
					cedula:'',
					contrasena:'',
					coordinador:false
				};
				$scope.showLogin=true;

			}).error(function(data) {
				if (data=="repetido") {
						$scope.modalMessage ="Ya hay un usuario registrado con la misma cédula o el mismo correo.";
						$("#loginErrorModal").modal();
						setTimeout(function () {
							$("#loginErrorModal").modal("hide");
						}, 3000);
				}else{
						$scope.modalMessage = "No se pudo registrar al usuario.";
						$("#loginErrorModal").modal();
						setTimeout(function () {
							$("#loginErrorModal").modal("hide");
						}, 3000);
				}
			});
	};

	$scope.olvidoContrase=function(){
		$http.post(ip + '/webApi.php?val=buscarUsuario', {
			username:$scope.cedulaValidacion,
			password:'null'
		}).success(function(data){			
			$scope.cambioContrasena($scope.cedulaValidacion,data);
		}).error(function(data){
			$scope.modalMessage = "Usuario no encontrada.";
	            $("#loginErrorModal").modal();
	            setTimeout(function () {
	                $("#loginErrorModal").modal("hide");
	        }, 3000);
		});
	};



	$scope.cambioContrasena=function(cedula,email){
		var newContrasena = Math.random().toString(36).substring(7);
		$http.post(ip + '/webApi.php?val=editarInformacion', {
            contrasena:newContrasena,
            correo:email,
            cedula:cedula
        }).success(function (data) {
            $scope.modalMessage = "Se ha enviado la contraseña al correo de esta cuenta.";
            $("#loginSuccessModal").modal();
            setTimeout(function () {
                $("#loginSuccessModal").modal("hide");
            }, 3000);
            $scope.cedulaValidacion='';
            $scope.activePage='login';
        }).error(function (data) {
            $scope.modalMessage = "No se pudo reestablecer su contrasena. Intente más tarde.";
            $("#loginErrorModal").modal();
            setTimeout(function () {
                $("#loginErrorModal").modal("hide");
            }, 3000);
        });
	};

	//Intercambia entre login y registro
	$scope.changePage=function(page){
		$scope.activePage=page;
	};
});
