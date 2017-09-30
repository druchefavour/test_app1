.factory('LoginService', function ($http, Session) {
  var LoginService = {};
 
  LoginService.login = function (credentials) {
    return $http
      .post('/login', credentials)
      .then(function (res) {
        Session.create(res.data.id, res.data.username,
                       res.data.password);
        return res.data.user;
      });
  };
 
  LoginService.isAuthenticated = function () {
    return !!Session.username;
  };
 
  LoginService.isAuthorized = function (authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return (authService.isAuthenticated() &&
      authorizedRoles.indexOf(Session.userRole) !== -1);
  };
 
  return LoginService;
})