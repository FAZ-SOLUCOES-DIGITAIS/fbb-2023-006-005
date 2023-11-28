(function() {
  'use strict';

  angular
    .module('infi-cursos')
    .directive('menubtn', menubtn);

  /** @ngInject */
  function menubtn($timeout) {
    var directive = {
      restrict: 'E',
      //transclude: true,
      replace: true,
      templateUrl: 'app/components/menubtn/menubtn.html',
      scope: {
        img:'@',
        text: '@'
      },
      controller: menubtnController,
      controllerAs: "vm",
      transclude: true,
      bindToController: true
    };

    return directive;

    function menubtnController(){
      var vm = this;

    }
  }

  menubtn.$inject = ['$timeout'];

})();
