(function() {
  'use strict';

  angular
    .module('infi-cursos')
    .controller('Modulo1_Tela6Controller', Modulo1_Tela6Controller);

  /** @ngInject */
  function Modulo1_Tela6Controller($log, $timeout, Game) {
    var vm = this;

    vm.game = Game;

    $timeout(function(){
      Game.showMenu();
    },10)

    if(!Game.data.outros.modulo1.tela6){
      Game.data.outros.modulo1.tela6 = {
        video1: false
      }
    }


    $timeout(function(){
      Game.finishScreen();
    }, 1000)

    Game.bfFunction = function(){

    }

  }
  Modulo1_Tela6Controller.$inject = ['$log', '$timeout', 'Game'];
})();
