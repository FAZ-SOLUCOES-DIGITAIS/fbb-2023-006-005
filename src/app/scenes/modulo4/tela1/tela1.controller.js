(function() {
  'use strict';

  angular
    .module('infi-cursos')
    .controller('Modulo4_Tela1Controller', Modulo4_Tela1Controller);

  /** @ngInject */
  function Modulo4_Tela1Controller($log, $timeout, Game) {
    var vm = this;

    vm.game = Game;

    $timeout(function(){
      Game.showMenu();
    },10)

    if(!Game.data.outros.modulo4.tela1){
      Game.data.outros.modulo4.tela1 = {
        video1: false
      }
    }


    $timeout(function(){
      Game.finishScreen();
    }, 1000)

    Game.bfFunction = function(){

    }

  }
  Modulo4_Tela1Controller.$inject = ['$log', '$timeout', 'Game'];
})();
