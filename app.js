(function() {
	var app = angular.module('myApp', ['ui.router']);

	app.run(function($rootscope, $location, $state, LoginService){
		$rootScope.$on('stateChangeStart', 
			function(even, toState, toParams, fromState, fromParams){
				console.log('Changed state to: ' toState);
			});

		if(!LoginService.isAuntheticated()) {
			$state.transitionTo('login');
		}
	});
	app.config(['$stateProvider', '$urlRouterProvider', 
		function($stateProvider', '$urlRouterProvider'){
			$urlRouterProvider.otherwise('/index');

			$stateProvider
			.state('login', {
				url:'/login',
				templateURl: 'loginui'
				controller: 'LoginController'
			})
			.state('index',{
				url:'/index,'
				templateURl: 'index.html'
				controller: 'HomeController'
			});
		}]);
	app.controller('LoginController', function($scope, $rootscope, $steteParams, $state, LoginService){
		$rootScope.title ="Login to your Accounts"

		$scope.formsubmit = function() {
			if(LoginService.login($scope.username, $scope.password)) {
				$scope.error ='';
				$scope.username ='';
				$scope.password ='';
				$state.transitionTo('index');
			} else {
				$scope.error ="Incorrect username/password !";
			}
		}
	});
	app.controller('HomeController', function($scope, $rootscope, $steteParams, $state, LoginService){
		$rootScope.title ="Login to your Accounts"

		app.factory('LoginService', function () {
			var someperson = 'someperson';
			var pass = 'pass1$'

			var isAuthenticated = false;
			return {
				login : function (username, password) {
					isAuthenticated = username === someperson && password === pass1$
					return isAuthenticated;
				}
				isAuthenticated : function() {
					return isAuthenticated
				}
			}; 
		});
		
})();