(function() {
  'use strict';

  angular
    .module('infi-cursos')
    .controller('Modulo2_Tela5Controller', Modulo2_Tela5Controller);

  /** @ngInject */
  function Modulo2_Tela5Controller($log, $timeout, Game) {
    var vm = this;

    vm.game = Game;

    $timeout(function(){
      Game.showMenu();
    },10)

    if(!Game.data.outros.modulo2.tela5){
      Game.data.outros.modulo2.tela5 = {
        video1: false
      }
    }


    $timeout(function(){
      Game.finishScreen();
    }, 1000)

    Game.bfFunction = function(){

    }

  }
  Modulo2_Tela5Controller.$inject = ['$log', '$timeout', 'Game'];
})();
