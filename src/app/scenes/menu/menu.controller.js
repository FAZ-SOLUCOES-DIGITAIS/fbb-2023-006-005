(function() {
    'use strict';

    angular
        .module('infi-cursos')
        .controller('MenuController', MenuController);

    /** @ngInject */
    function MenuController($log, $timeout, $window, Game, $rootScope, Sprites, Util) {
        var vm = this;

        vm.game = Game;

        $timeout(function(){
          Game.hideMenu();
        },10)
        //Game.resizeWindow();
        //Game.showMenu(true);
        //Game.lockAvancar();
        //Game.lockVoltar();

        vm.trilhas = Game.data.trilhas;
        vm.trilhaSelected = -1;
        //vm.finalScreen = false//Game.data.trilhas.trilha7.completed;
        //vm.preFinalScreen = Game.data.trilhas.trilha7.completed && !Game.data.preFinal;

        vm.order = [1,2,3,4,5,6]

        /*$timeout(function(){
          var scale = (0.24 * angular.element(window).width()) / 477;
          angular.element('.menu-item').css("transform", 'scale(' + scale + ')');
        })*/

        vm.goto = function(id, evt){
          /*if(evt){
            if(evt.shiftKey && evt.altKey){
              //Game.gotoTela(0,(id - 1));
              vm.trilhaSelected = (id - 1);
              return;
            }
          }

          var ind = vm.order.indexOf(id);

          if(ind > 0){
            var pre = ind - 1;
            if(!Game.data.trilhas['trilha' + vm.order[pre]].completed) return;
          }*/

          vm.trilhaSelected = (id - 1);
          //Game.gotoTela(0,(id - 1));
        }



        vm.iniciar = function(){
          if(vm.trilhaSelected != -1 && vm.trilhaSelected <= 5){
            Game.gotoTela(0,vm.trilhaSelected);
          }else{
            $timeout(function(){
              vm.trilhaSelected = -1;
            })
          }
          /*$timeout(function(){
            Game.data.iniciated = true;
            Game.save();
          })*/
        }

        $timeout(function(){
          if(Game.data.completed){
            vm.finalScreen = true;
          }
        })


    }
    MenuController.$inject = ['$log', '$timeout', '$window', 'Game', '$rootScope', 'Sprites', 'Util'];
})();
