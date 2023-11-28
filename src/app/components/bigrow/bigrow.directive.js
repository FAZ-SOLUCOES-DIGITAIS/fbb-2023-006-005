(function() {
  'use strict';

  angular
    .module('infi-cursos')
    .directive('bigrow', bigrow);

  /** @ngInject */
  function bigrow() {
    var directive = {
      restrict: 'E',
      //transclude: true,
      replace: true,
      templateUrl: 'app/components/bigrow/bigrow.html',
      scope: {

      },
      controller: bigrowController,
      controllerAs: "vm",
      transclude: true,
      bindToController: true
    };

    return directive;

    function bigrowController(){
      var vm = this;


    }
  }

  bigrow.$inject = [];

})();
