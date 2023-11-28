(function() {
  'use strict';

  angular
    .module('infi-cursos')
    .controller('Modulo1_Tela1Controller', Modulo1_Tela1Controller);

  /** @ngInject */
  function Modulo1_Tela1Controller($log, $timeout, Game) {
    var vm = this;

    vm.game = Game;

    $timeout(function(){
      Game.data.currentModule = 0;
      Game.data.currentScreen = 0;
      Game.showMenu();
    },10)

    if(!Game.data.outros.modulo1.tela1){
      Game.data.outros.modulo1.tela1 = {
        video1: false
      }
    }


    $timeout(function(){
      Game.finishScreen();
    }, 1000)

    Game.bfFunction = function(){

    }

  }
  Modulo1_Tela1Controller.$inject = ['$log', '$timeout', 'Game'];
})();
