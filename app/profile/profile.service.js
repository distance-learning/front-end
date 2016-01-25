(function () {
  'use strict';

  angular
      .module('distanceLearning.profile')
      .factory('ProfileUtils', ProfileUtils);

  ProfileUtils.$inject = [
    '$q', '$http', '$auth',
    'server_host'
  ];

  function ProfileUtils($q, $http, $auth,
                        server_host) {
    var service = {
      getUserInfo: getUserInfo
    };

    function getUserInfo() {
      var defer = $q.defer();

      $http.get(server_host + 'api/auth/user')
          .success(function (ok, status, headers, config) {
            console.log('getUserInforefreshToken', $auth.getToken());

            var refreshToken = headers('authorization');
            refreshToken = refreshToken.replace('Bearer ', '');
            console.log('getUserInforefreshToken', refreshToken);

            $auth.setToken(refreshToken);
            console.log('getUserInforefreshToken', $auth.getToken());

            //debugger;
            defer.resolve(ok);
          })
          .error(function (err, status, headers, config) {
            //debugger;
            defer.reject(err);
          });

      return defer.promise;
    }

    return service;
  }
})();


