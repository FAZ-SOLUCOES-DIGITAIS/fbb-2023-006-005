(function() {
  'use strict';

  angular
    .module('infi-cursos')
    .controller('Modulo1_Tela2Controller', Modulo1_Tela2Controller);

  /** @ngInject */
  function Modulo1_Tela2Controller($log, $timeout, Game) {
    var vm = this;

    vm.game = Game;

    $timeout(function(){
      Game.showMenu();
    },10)

    if(!Game.data.outros.modulo1.tela2){
      Game.data.outros.modulo1.tela2 = {
        video1: false
      }
    }


    $timeout(function(){
      Game.finishScreen();
    }, 1000)

    Game.bfFunction = function(){

    }

  }
  Modulo1_Tela2Controller.$inject = ['$log', '$timeout', 'Game'];
})();
