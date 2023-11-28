(function() {
  'use strict';

  angular
    .module('infi-cursos')
    .controller('Modulo3_Tela1Controller', Modulo3_Tela1Controller);

  /** @ngInject */
  function Modulo3_Tela1Controller($log, $timeout, Game) {
    var vm = this;

    vm.game = Game;

    $timeout(function(){
      Game.showMenu();
    },10)

    if(!Game.data.outros.modulo3.tela1){
      Game.data.outros.modulo3.tela1 = {
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
  Modulo3_Tela1Controller.$inject = ['$log', '$timeout', 'Game'];
})();
