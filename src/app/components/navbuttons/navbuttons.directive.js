(function() {
  'use strict';

  angular
    .module('infi-cursos')
    .directive('navbuttons', navbuttons);

  /** @ngInject */
  function navbuttons($timeout) {
    var directive = {
      restrict: 'E',
      //transclude: true,
      replace: true,
      templateUrl: 'app/components/navbuttons/navbuttons.html',
      scope: {
        currentPage:'=',
        nextFunc:'=',
        prevFunc:'=',
        prevImage:'=',
        nextImage:'='
      },
      controller: navbuttonsController,
      controllerAs: "vm",
      transclude: true,
      bindToController: true
    };

    return directive;

    function navbuttonsController(){
      var vm = this;




    }
  }

  navbuttons.$inject = ['$timeout'];

})();
