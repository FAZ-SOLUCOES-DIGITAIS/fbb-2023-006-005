(function() {
  'use strict';

  angular
    .module('infi-cursos')
    .directive('moldura', moldura);

  /** @ngInject */
  function moldura(Game, $timeout, $log, $rootScope, Sprites, Util) {
    var directive = {
      restrict: 'E',
      transclude: true,
      replace: true,
      templateUrl: 'app/components/moldura/moldura.html',
      scope: {},
      controller: MolduraController,
      controllerAs: "vm",
      bindToController: true
    };

    return directive;

    function MolduraController(){
      var vm = this;
      vm.showHelp = false;

      vm.showMenuBtn = true;
      vm.askingMap = false;

      vm.game = Game;
      vm.util = Util;


      vm.scrolling = false;

      vm.scrollHandler = function(evt){
        if(vm.scrolling) return;

        if(angular.element(evt.target).hasClass('scroll-content') || angular.element(evt.target).hasClass('scroll-content2')){
          return;
        }

        var direction = Util.getScrollDirection(evt);

        if(direction === 'down'){
          if(Game.screenFinished()){
            Game.next();
          }
        }else{
          if(Game.data.currentScreen > 0){
            Game.prev();
          }
        }

        vm.scrolling = true;
        $timeout(function(){
          vm.scrolling = false;
        },500)
      }

      vm.checkKey = function(evt) {
        if(vm.scrolling) return;
        evt = evt || window.event;

        if (evt.keyCode == '38') {
          // up arrow
          if(Game.data.currentScreen > 0){
            Game.prev();
          }
        }else if (evt.keyCode == '40') {
          // down arrow
          if(Game.screenFinished()){
            Game.next();
          }
        }else if (evt.keyCode == '37') {
          // left arrow
          if(Game.data.currentScreen > 0){
            Game.prev();
          }
        }else if (evt.keyCode == '39') {
          // right arrow
          if(Game.screenFinished()){
            Game.next();
          }
        }

        vm.scrolling = true;
        $timeout(function(){
          vm.scrolling = false;
        },500)

      }

      /*$timeout(function(){
        angular.element(window).on('DOMMouseScroll mousewheel onmousewheel', vm.scrollHandler);
        angular.element(window).on('onkeyup keyup', vm.checkKey)
      },100)*/


      vm.nextScreen = function(){
        if(Game.screenFinished()){
          Game.next();
        }
      }
      vm.prevScreen = function(){
        if(Game.data.currentScreen > 0){
          Game.prev();
        }
      }



      vm.askForMap = function(){
        $timeout(function(){
          vm.askingMap = true;
        })
      }

      vm.closeAskmap = function(){
        $timeout(function(){
          vm.askingMap = false;
        })
      }


      //$rootScope.openHelp = function(){
      vm.showHideHelp = function(){
        //vm.ajudaScreen = 1;
        $timeout(function(){
          if(vm.showMenu){
            vm.openMenu();
          }
          vm.showHelp = !vm.showHelp;
        });
      }

      vm.closeHelp = function(){
        //vm.ajudaScreen = 1;
        $timeout(function(){
          vm.showHelp = false;
        });
      }

      vm.voltaMenu = function(){
        $timeout(function(){
          vm.askingMap = false;
          Game.gotoMenu();
        })
      }

      vm.goNext = function(){
        if(!vm.locknext){
          //vm.stopAll();
          vm.removeAll();
          Game.next();
        }
      }

      vm.goPrev = function(){
        if(!vm.lockprev){
          //vm.stopAll();
          vm.removeAll();
          Game.prev();
        }
      }

      //-----------------------------------

      vm.locknext = true;
      vm.lockprev = true;
      vm.show = false;

      $rootScope.showMenu = function(visibility){
        $timeout(function(){
          vm.show = visibility;
        })
      }

      $rootScope.locknext = function(){
        $timeout(function(){
          vm.locknext = true;
        })
        //vm.sprnext.control.stop();
      }

      $rootScope.unlocknext = function(){
        $timeout(function(){
          vm.locknext = false;
        })
        //vm.sprnext.control.play();
      }

      $rootScope.lockprev = function(){
        $timeout(function(){
          vm.lockprev = true;
        })
        //vm.sprprev.control.stop();
      }

      $rootScope.unlockprev = function(){
        $timeout(function(){
          vm.lockprev = false;
        })
        //vm.sprprev.control.play();
      }


      $rootScope.showMenuBtn = function(visibility){
        vm.showMenuBtn = visibility;
      }


      //----------------- Audios --------------------

      /*$timeout(function(){
        angular.element("#sound-btn").on("click", vm.mute)
      })*/

      vm.audios = $rootScope.audios;
      vm.currentAudio = null;
      vm.volume = true;

      vm.mute = function(evt){
        $timeout(function(){
          vm.volume = !vm.volume;
          if(vm.volume){
            angular.element("#sound-btn").removeClass("off").addClass("on");
            vm.playAll();
          }else{
            angular.element("#sound-btn").removeClass("on").addClass("off");
            vm.stopAll();
          }
        })
      }

      vm.stopAll = function(){
        //if(vm.currentAudio) vm.currentAudio.paused(true);
        if(vm.currentloopname != "") createjs.Sound.stop();
      }

      vm.playAll = function(){
        //if(vm.currentAudio) vm.currentAudio.play();
        if(vm.currentloopname != "") createjs.Sound.play(vm.currentloopname, {loop:-1});
      }

      vm.removeAll = function(){
        //if(vm.currentAudio) vm.currentAudio.stop();
        if(vm.currentloopname) createjs.Sound.stop();
        //vm.currentAudio = null;
        vm.currentloop = null;
        vm.currentloopname = "";
      }

      vm.playAudio = function(name, callback){
        //vm.checkAudios();
        //console.log("play no audio: " + name + " - " + vm.volume);
        if(vm.volume){
          if(vm.currentAudio != null){
            vm.currentAudio.stop();
          }
          vm.currentAudio = createjs.Sound.play(name);
          if(callback){
            vm.currentAudio.on("complete", function(){
              callback();
            })
          }
        }
      }

      vm.currentloop = null;
      vm.currentloopname = "";
      vm.loopAudio = function(name){
        vm.currentloopname = name;
        if(vm.volume){
          if(vm.currentloop != null){
            createjs.Sound.stop();
          }

          vm.currentloop = createjs.Sound.play(name, {loop:-1});
        }
      }

      $rootScope.playAudio = function(name, callback){
        $timeout(function(){
          vm.playAudio(name, callback);
        }, 500)
      }

      $rootScope.loopAudio = function(name){
        vm.loopAudio(name);
      }

      $rootScope.playSound = function(name){
        if(vm.volume){
          createjs.Sound.play(name);
        }
      }

      $rootScope.stopAll = function(){
        vm.stopAll();
      }

      $rootScope.playAll = function(){
        vm.playAll();
      }

      $rootScope.removeAll = function(){
        vm.removeAll();
      }

      //------------------ end Audios ---------------------------

      vm.sair = function(){
        var r = confirm("Deseja realmente sair?");

        if (r == true) {
          window.top.close();
        }

      }

    }
  }
  moldura.$inject = ['Game', '$timeout', '$log', '$rootScope', 'Sprites', 'Util'];

})();
