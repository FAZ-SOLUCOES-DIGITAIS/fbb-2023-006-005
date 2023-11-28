(function() {
  'use strict';

  angular
    .module('infi-cursos')
    .controller('LoadingController', LoadingController);

  /** @ngInject */
  function LoadingController($log, Game, $rootScope, $timeout, Sprites) {
    var vm = this;

    $timeout(function(){
      Game.resizeWindow();
      Game.hideMenu();
    },20)

    var progressSize;

    var orientation = (screen.orientation || {}).type || screen.mozOrientation || screen.msOrientation;

    if (orientation === "landscape-primary") {
      progressSize = window.innerHeight * 0.4;
    } else if (orientation === "landscape-secondary") {
      progressSize = window.innerHeight * 0.4;
    } else if (orientation === "portrait-secondary" || orientation === "portrait-primary") {
      progressSize = window.innerWidth * 0.48;
    } else if (orientation === undefined) {
      if(window.innerWidth > window.innerHeight){
        //landscape
        progressSize = window.innerHeight * 0.4;
      }else{
        //portrait
        progressSize = window.innerWidth * 0.48;
      }
    }

    vm.loaded = 0;
    /*vm.radialProgress = {
      cid:"ld_01",
      bkgSize: 10,
      progressSize: 10,
      size: progressSize,
      iniAngle: 0,
      endAngle: 360,
      currentAngle: 0,
      bkgColor: "#003e74",
      progressColor: "#ffcd04"
    }*/
    vm.showLoading = true;


    vm.progressStyle = {
      width: '0%'
    }

    vm.queue;

    //console.log(vm.sprloading);

    $timeout(function(){
      console.log("iniciando loading")

      vm.queue = new createjs.LoadQueue();
      vm.queue.loadManifest($rootScope.imageLocations);
      vm.queue.load();

      vm.updateLoader(0, 0);
      //vm.updateLoaderNumber();
    }, 200);

    vm.updateLoader = function(lastProgress, times){
      var progress = vm.queue.progress;
      var percent = Math.max(0, Math.round((progress * 100)));

      if(progress < 1){
        if(progress == lastProgress){
          if(times == 6){
            //Force loading
            vm.loaded = 100;
            vm.updateLoaderBar(vm.loaded);
            //vm.continue();
          }else{
            $timeout(function(){
              var tm = times + 1;
              vm.updateLoader(progress, tm);
            }, 500)
          }
        }else{
          vm.loaded = percent;
          vm.updateLoaderBar(vm.loaded);
          $timeout(function(){
            vm.updateLoader(progress, 0);
          }, 20)
        }
      }else{
        vm.loaded = 100;
        vm.updateLoaderBar(vm.loaded);
        //vm.continue();
      }
    }

    vm.updateLoaderBar = function(percent){
      $timeout(function(){
        vm.progressStyle.width = percent + "%";
        if(percent < 100){
          //vm.radialProgress.setAngle(360 * (percent/100));
        }else{
          //vm.radialProgress.setAngle(360 * (percent/100), vm.continue);
          vm.continue();
        }

      })
    }

    vm.updateLoaderNumber = function(){
      if(vm.loaded >= 100) return;

      $timeout(function(){
        var progress = vm.queue.progress;
        var percent = Math.max(0, Math.round((progress * 100)));
        vm.loaded = percent;//Math.round(vm.progress.progress * 100);
        if(vm.loaded < 100){
          vm.updateLoaderNumber();
        }
      },10)
    }

    vm.continue = function(){

      //Game.gotoTela(0);
      Game.load(function(){
        $timeout(function(){
          //Game.gotoIntro();
          //vm.showLoading = false;
          vm.allLoaded = true;

          //Game.gotoTela(0);
        }, 500)



        /*if(Game.data.iniciated){
          Game.gotoMenu();
        }else{
          //Game.gotoLogo();
          Game.gotoIntro();
        }*/
      });
    }

    vm.start = function(){
      //Game.data.iniciated = true;
      //Game.gotoIntro();
      //Game.gotoMenu();
      Game.gotoTela(0,4);
      /*if(Game.data.iniciated){
        Game.gotoTela(Game.data.currentScreen);
      }else{
        //Game.gotoLogo();
        Game.data.iniciated = true;
        Game.gotoTela(0);
      }*/

    }

  }
  LoadingController.$inject = ['$log', 'Game', '$rootScope', '$timeout', 'Sprites'];
})();
