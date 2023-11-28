(function() {
  'use strict';

  angular
    .module('infi-cursos')
    .directive('spritesheet', spritesheet);

  /** @ngInject */
  function spritesheet($log, $rootScope, $window, $timeout) {
    var directive = {
      restrict: 'E',
      //transclude: true,
      replace: true,
      templateUrl: 'app/components/spritesheet/spritesheet.html',
      scope: {
        control: "=",
        config: "=",
        id: "@"
      },
      /*link: function(scope, element, attributes){

      },*/
      controller: spritesheetController,
      controllerAs: "sprite",
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function spritesheetController(){
      var sprite = this;
      //console.log(sprite)
      sprite.currentframe = 0;
      sprite.animationFPS = 30;
      sprite.pixelPerFrame = 50;
      sprite.binded = false;
      //sprite.flip = false;
      sprite.sprstyle = {};

      sprite.spritewidth = function(){
        //console.log(sprite.currentframe);
        return sprite.config.frames[sprite.currentframe].frame.w;
      }

      sprite.spriteheight = function(){
        return sprite.config.frames[sprite.currentframe].frame.h;
      }

      sprite.spritex = function(){
        return sprite.config.frames[sprite.currentframe].frame.x;
      }

      sprite.spritey = function(){
        return sprite.config.frames[sprite.currentframe].frame.y;
      }

      sprite.spriteurl = function(){
        return $rootScope.sprites[sprite.config.meta.image];
        //return sprite.config.meta.image;
      }

      sprite.control.forward = function(){
        if(sprite.currentframe >= sprite.config.frames.length - 1) sprite.currentframe = 0;
        else sprite.currentframe += 1;
        $timeout(function(){
          //$log.debug(sprite.flip);
          sprite.control.setFrame(sprite.currentframe);
        });
        //$log.debug(sprite.id);
        //$log.debug(sprite.currentframe);
      }

      sprite.control.backward = function(){
        if(sprite.currentframe <= 0) sprite.currentframe = sprite.config.frames.length - 1;
        else sprite.currentframe -= 1;
        $timeout(function(){
          //$log.debug(sprite.flip);
          sprite.control.setFrame(sprite.currentframe);
        });
      }

      sprite.control.setFrame = function(frame){
        sprite.currentframe = Math.max(0, Math.min(frame, sprite.config.frames.length - 1));
        sprite.updateSprite();
        sprite.control.update();
        //$scope.$apply();
      }

      sprite.updateSprite = function(){
        $timeout(function(){
          sprite.sprstyle = {
            "width": sprite.spritewidth() + "px",
            "height": sprite.spriteheight() + "px",
            "background-image": "url(" + sprite.spriteurl() + ")",
            "background-position": "-" + sprite.spritex() + "px -" + sprite.spritey() + "px"
          }
        })
      }

      sprite.control.update = function(){
        $timeout(function(){
          if(sprite.control.position != undefined) sprite.sprstyle.position = sprite.control.position;
          if(sprite.control.display != undefined) sprite.sprstyle.display = sprite.control.display;
          if(sprite.control.opacity != undefined) sprite.sprstyle.opacity = sprite.control.opacity;
          if(sprite.control.x != undefined) sprite.sprstyle.left = sprite.control.x + "px";
          if(sprite.control.y != undefined) sprite.sprstyle.top = sprite.control.y + "px";
          if(sprite.control.r != undefined) sprite.sprstyle.right = sprite.control.r + "px";
          if(sprite.control.b != undefined) sprite.sprstyle.bottom = sprite.control.b + "px";
          if(sprite.control.scale != undefined) sprite.sprstyle.transform = "scaleX(" + sprite.control.scale + ") scaleY(" + sprite.control.scale + ")";
          if(sprite.control.rotation != undefined) sprite.sprstyle.transform = "rotate(" + sprite.control.rotation + "deg)";
          //$log.debug(sprite.control.rotation);
        });
      }

      sprite.control.play = function(){
        now = Date.now();
        //sprite.animation = requestAnimationFrame(animate);
        $rootScope.animateConstant[sprite.id] = animate;
      }

      sprite.control.playOnce = function(){
        now = Date.now();
        //sprite.control.setFrame(0);
        //sprite.animation = requestAnimationFrame(animate);
        $rootScope.animateConstant[sprite.id] = animateOnce;
      }

      sprite.animToFrame;
      sprite.control.playTo = function(frame){
        sprite.animToFrame = frame;
        now = Date.now();
        sprite.control.setFrame(0);
        //sprite.animation = requestAnimationFrame(animate);
        $rootScope.animateConstant[sprite.id] = animateTo;
      }

      sprite.control.reversePlay = function(){
        now = Date.now();
        //sprite.animation = requestAnimationFrame(reverseanimate);
        $rootScope.animateConstant[sprite.id] = reverseanimate;
      }

      sprite.control.bindToScroll = function(){
        if(sprite.binded) return;

        $rootScope.animationCallbacks[sprite.id] = animateWithScroll;
        sprite.binded = true;
      }

      sprite.control.unbindToScroll = function(){
        if(!sprite.binded) return;

        delete $rootScope.animationCallbacks[sprite.id];
        sprite.binded = false;
      }

      sprite.control.stop = function(){
        //cancelAnimationFrame(sprite.animation);
        delete $rootScope.animateConstant[sprite.id];
        $timeout(function(){
          //$log.debug(sprite.flip);
          sprite.control.setFrame(0);
        });
      }

      sprite.control.pause = function(){
        //cancelAnimationFrame(sprite.animation);
        delete $rootScope.animateConstant[sprite.id];
        //$rootScope.animationCallbacks[sprite.id]
      }


      var dt = 0;
      var now = null;
      var unow = null;

      function animate(){
        unow = Date.now();
        dt += unow - now;

        //$log.debug(dt);
        if(dt > 1000/sprite.animationFPS){
          sprite.control.forward();
          dt = 0;
        }

        now = unow;

        //requestAnimationFrame(animate);
      }

      function animateOnce(){
        unow = Date.now();
        dt += unow - now;

        //$log.debug(dt);
        if(dt > 1000/sprite.animationFPS){
          if(sprite.currentframe >= sprite.config.frames.length - 1){
            delete $rootScope.animateConstant[sprite.id];
            if(sprite.control.callback) sprite.control.callback();
          }else{
            sprite.control.forward();
            dt = 0;
          }
        }

        now = unow;

        //requestAnimationFrame(animate);
      }

      function animateTo(){
        unow = Date.now();
        dt += unow - now;

        //$log.debug(dt);
        if(dt > 1000/sprite.animationFPS){
          if(sprite.currentframe >= sprite.animToFrame){
            delete $rootScope.animateConstant[sprite.id];
            if(sprite.control.callbackTo) sprite.control.callbackTo();
          }else{
            sprite.control.forward();
            dt = 0;
          }
        }

        now = unow;
      }

      function reverseanimate(){
        unow = Date.now();
        dt += unow - now;

        if(dt > 1000/sprite.animationFPS){
          sprite.control.backward();
          dt = 0;
        }

        now = unow;

        //requestAnimationFrame(reverseanimate);
      }


      function animateWithScroll(){

        dt = Math.floor($rootScope.scrollPos / sprite.pixelPerFrame);
        var df = dt % (sprite.config.frames.length);
        //log.debug("dt: " + dt);
        //$log.debug("len: " + sprite.config.frames.length);
        if(sprite.control.runonce){
          if(dt > sprite.config.frames.length - 1){
            df = sprite.config.frames.length - 1;
          }
        }

        //$timeout(function(){
          //$log.debug(sprite.flip);
          sprite.control.setFrame(df);
        //});
      }

      switch(sprite.control.type){
        case "scroll":
          sprite.control.bindToScroll();
          break;
        case "play":
          sprite.control.play();
          break;
        case "reverse":
          sprite.control.reversePlay();
          break;
        case "playonce":
          sprite.control.playOnce();
          break;
      }

      sprite.updateSprite();
      sprite.control.update();
    }
  }
  spritesheet.$inject = ['$log', '$rootScope', '$window', '$timeout'];
})();
