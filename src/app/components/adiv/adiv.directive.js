(function() {
  'use strict';

  angular
    .module('infi-cursos')
    .directive('adiv', adiv);

  /** @ngInject */
  function adiv($timeout) {
    var directive = {
      restrict: 'E',
      //transclude: true,
      replace: true,
      templateUrl: 'app/components/adiv/adiv.html',
      scope: {
        pos: '=',
        from: '=',
        duration: '=',
        delay: '=',
        opacity: '=',
        scale:'=',
        size:'=',
        rotation:'=',
        evento:'@'
      },
      controller: adivController,
      controllerAs: "vm",
      transclude: true,
      bindToController: true
    };

    return directive;

    function adivController(){
      var vm = this;

      //console.log(vm);

      vm.divstyle = {
        position: 'absolute',
        left: (vm.from ? vm.from.x : vm.pos.x),
        top: (vm.from ? vm.from.y : vm.pos.y),
        opacity: (vm.opacity ? vm.opacity.from : 1),
        transform: 'scale(' + (vm.scale ? vm.scale.from : 1) + ") rotate(" + (vm.rotation ? (vm.rotation.from + "deg") : '0deg') + ")" ,
        transition: 'left ' + vm.duration + 's, top ' + vm.duration + 's, opacity ' + vm.duration + 's, transform ' + vm.duration + 's',
        width: (vm.size ? vm.size.w : 'auto'),
        height: (vm.size ? vm.size.h : 'auto')
      }

      $timeout(function(){
        //console.log("evento: ", vm.evento)

        if(vm.evento){
          addEventListener(vm.evento, vm.iniciaEvento);
        }else{
          $timeout(function(){
            vm.inicia();
          }, vm.delay * 1000)
        }
      })

      vm.iniciaEvento = function(evt){
        //console.log(evt.detail.top, vm.pos.y)
        if(evt.detail.top >= vm.pos.y){
          removeEventListener(vm.evento, vm.iniciaEvento);
          $timeout(function(){
            vm.inicia();
          }, vm.delay * 1000)
        }
      }

      vm.inicia = function(){
        //console.log("ouviu ", vm.evento);
        //removeEventListener(vm.evento, vm.inicia);
        $timeout(function(){
          vm.divstyle.left = vm.pos.x;
          vm.divstyle.top = vm.pos.y;
          vm.divstyle.opacity = (vm.opacity ? vm.opacity.to : 1);
          vm.divstyle.transform = 'scale(' + (vm.scale ? vm.scale.to : 1) + ") rotate(" + (vm.rotation ? (vm.rotation.to + "deg") : '0deg') + ")";
        })
      }


    }
  }

  adiv.$inject = ['$timeout'];

})();
