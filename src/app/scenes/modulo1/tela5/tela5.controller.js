(function() {
  'use strict';

  angular
    .module('infi-cursos')
    .controller('Modulo1_Tela5Controller', Modulo1_Tela5Controller);

  /** @ngInject */
  function Modulo1_Tela5Controller($log, $timeout, Game) {
    var vm = this;

    vm.game = Game;

    $timeout(function(){
      Game.showMenu();
    },10)

    if(!Game.data.outros.modulo1.tela5){
      Game.data.outros.modulo1.tela5 = {
        video1: false
      }
    }


    $timeout(function(){
      Game.finishScreen();
    }, 1000)

    Game.bfFunction = function(){

    }

  }
  Modulo1_Tela5Controller.$inject = ['$log', '$timeout', 'Game'];
})();
