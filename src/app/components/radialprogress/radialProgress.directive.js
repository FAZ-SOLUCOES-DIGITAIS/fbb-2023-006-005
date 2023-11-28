(function() {
  'use strict';

  angular
    .module('infi-cursos')
    .directive('radialprogress', radialprogress);

  /** @ngInject */
  function radialprogress($timeout) {
    var directive = {
      restrict: 'E',
      //transclude: true,
      replace: true,
      templateUrl: 'app/components/radialprogress/radialprogress.html',
      scope: {
        config: '='
      },
      controller: radialprogressController,
      controllerAs: "vm",
      transclude: true,
      bindToController: true
    };

    return directive;

    function radialprogressController(){
      var vm = this;

      vm.cid = vm.config.cid;//Date.now().toString();
      //console.log(Date.now());

      //console.log(vm.config);

      /*
      config = {
        bkgSize: 4,
        progressSize: 12,
        size: 50,
        iniAngle: 10,
        endAngle: 350,
        currentAngle: 0,
        bkgColor: "#000",
        progressColor: "#f00"
      }
      */
      if(!vm.config){
        vm.config = {};
      }

      vm.lwi = vm.config.bkgSize || 4;
      vm.lwf = vm.config.progressSize || 12;
      vm.size = vm.config.size || 50;
      //console.log(vm.size);
      vm.radialStyle = {
        width: vm.size * 2 + vm.lwf,
        height: vm.size * 2 + vm.lwf
      }
      vm.iniAngle = (vm.config.iniAngle == undefined ? 10 : vm.config.iniAngle);
      vm.endAngle = vm.config.endAngle || 350;
      //console.log(vm.iniAngle);
      //console.log(vm.endAngle);
      vm.currentAngle = vm.config.currentAngle || vm.iniAngle;
      vm.bkgColor = vm.config.bkgColor || "#000";
      vm.progressColor = vm.config.progressColor || "#f00";

      vm.finalAngle;
      vm.callback = null;
      vm.config.setAngle = function(angle, callback){

        vm.finalAngle = Math.round(angle);
        if(callback) vm.callback = callback;

        if(!updating){
          vm.update();
        }
        /*
        if(Math.round(angle) == vm.currentAngle){
          if(callback) callback();
          return;
        }

        if(vm.currentAngle < angle){
          vm.currentAngle += 1;
        }else{
          vm.currentAngle -= 1;
        }
        vm.draw();

        $timeout(function(){
          vm.config.setAngle(angle, callback);
        },3)*/
      }

      var updating = false;
      vm.update = function(){

        if(vm.currentAngle == vm.finalAngle){
          updating = false;
          if(vm.callback) vm.callback();
          vm.callback = null;
          return;
        }

        updating = true;

        if(vm.currentAngle < vm.finalAngle){
          vm.currentAngle += 1;
        }else{
          vm.currentAngle -= 1;
        }

        vm.config.progress = (vm.currentAngle - vm.iniAngle) / (vm.endAngle - vm.iniAngle);

        vm.draw();
        $timeout(function(){
          vm.update();
        }, 3)
      }

      vm.config.toAngle = function(angle, callback){
        vm.currentAngle = angle;

        vm.draw();

        if(callback){
          $timeout(function(){
            callback();
          }, 500)
        }
      }

      vm.draw = function(){
        vm.ctx.clearRect(0, 0, vm.radialStyle.width, vm.radialStyle.height);

        vm.ctx.beginPath();
        vm.ctx.arc(vm.size + vm.lwf/2, vm.size + vm.lwf/2, vm.size, (vm.iniAngle/180) * Math.PI, (vm.endAngle / 180) * Math.PI);
        vm.ctx.strokeStyle = vm.bkgColor;
        vm.ctx.lineWidth = vm.lwi;
        vm.ctx.stroke();

        vm.ctx.beginPath();
        vm.ctx.arc(vm.size + vm.lwf/2, vm.size + vm.lwf/2, vm.size, (vm.iniAngle/180) * Math.PI, (vm.currentAngle / 180) * Math.PI);
        vm.ctx.strokeStyle = vm.progressColor;
        vm.ctx.lineWidth = vm.lwf;
        vm.ctx.stroke();
      }
      $timeout(function(){
        vm.c = document.getElementById(vm.cid);
        vm.ctx = vm.c.getContext("2d");
        vm.draw();
        //console.log("finalizou inicio");
      })
    }
  }

  radialprogress.$inject = ['$timeout'];

})();
