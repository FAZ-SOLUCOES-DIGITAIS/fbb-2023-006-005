(function() {
  'use strict';

  angular
    .module('infi-cursos', ['infi-cursos.external']);

   angular.module('infi-cursos.external',
    [
        'ngAnimate',
        'ngCookies',
        'ngTouch',
        'ngSanitize',
        'ngMessages',
        'ngAria',
        //'ngAudio',
        //'ngRoute',
        'ui.router',
        'ui.bootstrap',
        'toastr',
        //'sn.skrollr',
        'angularModalService',
        'LZW',
        'ngScrollbars',
        'swipe'
    ])

})();
