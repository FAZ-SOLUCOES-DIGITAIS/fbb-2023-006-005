(function() {
  'use strict';

  angular
    .module('infi-cursos')
    .controller('Modulo1_Tela7Controller', Modulo1_Tela7Controller);

  /** @ngInject */
  function Modulo1_Tela7Controller($log, $timeout, Game) {
    var vm = this;

    vm.game = Game;

    $timeout(function(){
      Game.showMenu();
    },10)

    if(!Game.data.outros.modulo1.tela7){
      Game.data.outros.modulo1.tela7 = {
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
  Modulo1_Tela7Controller.$inject = ['$log', '$timeout', 'Game'];
})();
