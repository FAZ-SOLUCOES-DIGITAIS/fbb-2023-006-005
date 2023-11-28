(function() {
  'use strict';

  angular
    .module('infi-cursos')
    .controller('Modulo2_Tela6Controller', Modulo2_Tela6Controller);

  /** @ngInject */
  function Modulo2_Tela6Controller($log, $timeout, Game) {
    var vm = this;

    vm.game = Game;

    $timeout(function(){
      Game.showMenu();
    },10)

    if(!Game.data.outros.modulo2.tela6){
      Game.data.outros.modulo2.tela6 = {
        video1: false
      }
    }


    vm.openVideo = function(){
      $timeout(function(){
        vm.video = true;
        Game.finishScreen();
      })
    }

    /*$timeout(function(){
      Game.finishScreen();
    }, 1000)*/

    Game.bfFunction = function(){

    }

  }
  Modulo2_Tela6Controller.$inject = ['$log', '$timeout', 'Game'];
})();
