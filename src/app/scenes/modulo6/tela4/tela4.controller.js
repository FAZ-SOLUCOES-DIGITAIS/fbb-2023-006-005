(function() {
  'use strict';

  angular
    .module('infi-cursos')
    .controller('Modulo6_Tela4Controller', Modulo6_Tela4Controller);

  /** @ngInject */
  function Modulo6_Tela4Controller($log, $timeout, Game) {
    var vm = this;

    vm.game = Game;

    $timeout(function(){
      Game.showMenu();
    },10)

    if(!Game.data.outros.modulo6.tela4){
      Game.data.outros.modulo6.tela4 = {
        video1: false
      }
    }


    $timeout(function(){
      Game.finishScreen();
    }, 1000)

    Game.bfFunction = function(){

    }

  }
  Modulo6_Tela4Controller.$inject = ['$log', '$timeout', 'Game'];
})();
