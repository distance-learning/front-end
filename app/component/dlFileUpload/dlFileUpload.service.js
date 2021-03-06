(function () {
  'use strict';

  angular
      .module('distanceLearning.component.dlFileUpload')
      .factory('dlFileUploadUtils', dlFileUploadUtils);

  dlFileUploadUtils.$inject = [
    '$q', '$http',
    '$auth',
    'server_host'
  ];

  function dlFileUploadUtils($q, $http,
                             $auth,
                             server_host) {
    var service = {
      getImages: getImages,
      getFiles: getFiles,
      getUploadURL: getUploadURL,
      getUploadImageProfileURL: getUploadImageProfileURL,
      getUploadImageFacultyURL: getUploadImageFacultyURL,
      getUploadHeader: getUploadHeader,
      removeFile: removeFile
    };

    function getImages() {
      var defer = $q.defer();

      $http.get(server_host + 'api/files/images')
          .success(defer.resolve)
          .error(defer.reject);

      return defer.promise;
    }

    function getFiles(params) {
      var defer = $q.defer();

      $http.get(server_host + 'api/files', { params: params })
          .success(defer.resolve)
          .error(defer.reject);

      return defer.promise;
    }

    function getUploadURL() {
      return server_host + 'api/files';
    }

    function getUploadImageProfileURL() {
      return server_host + 'api/account/image';
    }

    function getUploadImageFacultyURL(faculty) {
      return server_host + 'api/admin/faculties/' + faculty.slug + '/image';
    }

    function getUploadHeader() {
      return 'Bearer ' + $auth.getToken()
    }

    function removeFile(file) {
      var defer = $q.defer();

      $http.delete(server_host + 'api/files/' + file.id)
          .success(defer.resolve)
          .error(defer.reject);

      return defer.promise;
    }

    return service;
  }
})();