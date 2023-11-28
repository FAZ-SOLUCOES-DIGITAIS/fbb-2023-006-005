(function() {
  'use strict';

  angular
    .module('infi-cursos')
    .controller('LogoController', LogoController);

  /** @ngInject */
  function LogoController($log, $timeout, $window, Game, $rootScope, Sprites, $state) {
    var vm = this;

    Game.resizeWindow();
    Game.hideMenu();

    vm.continue = function(){
      Game.gotoIntro();
      $rootScope.loopAudio("abertura");
      //Game.gotoMenu();
    }

    /*vm.sprlogo = {
      config:Sprites.logo,
      control:{
        type: "playonce",
        callback: function(){
          //vm.continue
          $timeout(function(){
            vm.showtext = true;
          }, 200)
          $timeout(function(){
            vm.continue();
          }, 4000)
        }
      }
    }*/

  }
  LogoController.$inject = ['$log', '$timeout', '$window', 'Game', '$rootScope', 'Sprites', '$state'];
})();
