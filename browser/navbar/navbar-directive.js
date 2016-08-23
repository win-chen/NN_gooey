'use strict';

app.directive('navbar', function ($state, $rootScope, AuthService, AUTH_EVENTS, UserFactory, $cookieStore) {
  return {
    restrict: 'E',
    templateUrl: '/navbar/navbar.html',
    link: function (scope, element, attrs) {
      angular.extend(scope, UserFactory);

      scope.user = null;

      scope.logout = function () {
        AuthService.logout().then(function () {
          scope.user = null;
          $cookieStore.put('view', undefined);
          $rootScope.inHomeState = true;
          $state.go('home');
        });
      };

      scope.onUserPage = function () {
        if ($state.current.name === 'user') {
          return true;
        } else {
          return false;
        }
      };

      var setUser = function () {
        AuthService.getLoggedInUser().then(function (user) {
          scope.user = user;
        });
      };

      var removeUser = function () {
        scope.user = null;
      };

      setUser();

      $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
      $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
      $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

    }
  };
});
