(function() {
  'use strict';

  angular
    .module('infi-cursos')
    .directive('defaultrow', defaultrow);

  /** @ngInject */
  function defaultrow() {
    var directive = {
      restrict: 'E',
      //transclude: true,
      replace: true,
      templateUrl: 'app/components/defaultrow/defaultrow.html',
      scope: {

      },
      controller: defaultrowController,
      controllerAs: "vm",
      transclude: true,
      bindToController: true
    };

    return directive;

    function defaultrowController(){
      var vm = this;


    }
  }

  defaultrow.$inject = [];

})();
