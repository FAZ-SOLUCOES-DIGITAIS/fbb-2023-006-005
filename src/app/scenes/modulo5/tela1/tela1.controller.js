(function() {
  'use strict';

  angular
    .module('infi-cursos')
    .controller('Modulo5_Tela1Controller', Modulo5_Tela1Controller);

  /** @ngInject */
  function Modulo5_Tela1Controller($log, $timeout, Game) {
    var vm = this;

    vm.game = Game;

    $timeout(function(){
      Game.data.currentModule = 4;
      Game.data.currentScreen = 0;
    })


    vm.next = function(){
      Game.finishScreen();
      Game.next();
    }

  }
  Modulo5_Tela1Controller.$inject = ['$log', '$timeout', 'Game'];
})();
