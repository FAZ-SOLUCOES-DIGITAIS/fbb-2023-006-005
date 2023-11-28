(function() {
  'use strict';

  angular
    .module('infi-cursos')
    .service('AnimationControl', AnimationControl);

    /** @ngInject */
    function AnimationControl($log, $window){
      var control = this;

      control.lastTime = 0;
      var vendors = ['ms', 'moz', 'webkit', 'o'];
      for(var x = 0; x < vendors.length && !$window.requestAnimationFrame; ++x) {
        $window.requestAnimationFrame = $window[vendors[x]+'RequestAnimationFrame'];
        $window.cancelAnimationFrame = $window[vendors[x]+'CancelAnimationFrame'] || $window[vendors[x]+'CancelRequestAnimationFrame'];
      }

      if (!$window.requestAnimationFrame){
        $window.requestAnimationFrame = function(callback/*, element*/) {
          var currTime = new Date().getTime();
          var timeToCall = Math.max(0, 16 - (currTime - control.lastTime));
          var id = $window.setTimeout(function() { callback(currTime + timeToCall); },
            timeToCall);
          control.lastTime = currTime + timeToCall;
          return id;
        };
      }

      if (!$window.cancelAnimationFrame){
        $window.cancelAnimationFrame = function(id) {
          clearTimeout(id);
        };
      }

      control.animationCallbacks = {};

      function animateFrame(){

        angular.forEach(control.animationCallbacks, function(value/*, key*/){
          value();
          //$log.debug(key)
        });

        requestAnimationFrame(animateFrame);
      }

      control.animation = requestAnimationFrame(animateFrame);
    }
    AnimationControl.$inject = ['$log', '$window'];
})();
