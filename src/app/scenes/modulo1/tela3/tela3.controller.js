(function() {
  'use strict';

  angular
    .module('infi-cursos')
    .controller('Modulo1_Tela3Controller', Modulo1_Tela3Controller);

  /** @ngInject */
  function Modulo1_Tela3Controller($log, $timeout, Game) {
    var vm = this;

    vm.game = Game;

    $timeout(function(){
      Game.showMenu();
    },10)

    if(!Game.data.outros.modulo1.tela3){
      Game.data.outros.modulo1.tela3 = {
        video1: false
      }
    }


    $timeout(function(){
      Game.finishScreen();
    }, 1000)

    Game.bfFunction = function(){

    }

  }
  Modulo1_Tela3Controller.$inject = ['$log', '$timeout', 'Game'];
})();
