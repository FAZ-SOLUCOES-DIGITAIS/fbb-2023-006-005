(function() {
  'use strict';

  angular
    .module('infi-cursos')
    .controller('Modulo5_Tela6Controller', Modulo5_Tela6Controller);

  /** @ngInject */
  function Modulo5_Tela6Controller($log, $timeout, Game) {
    var vm = this;

    vm.game = Game;

    $timeout(function(){
      Game.data.currentModule = 4;
      Game.data.currentScreen = 5;
    })

    vm.next = function(){
      Game.finishScreen();
      Game.next();
    }

    vm.prev = function(id){
      $timeout(function(){
        vm.select(id, vm.currentItem[id] - 1)
      })
    }


    vm.finish = function(){
      Game.finishScreen();
      Game.gotoMenu();
    }

  }
  Modulo5_Tela6Controller.$inject = ['$log', '$timeout', 'Game'];
})();
