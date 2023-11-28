(function() {
  'use strict';

  angular
    .module('infi-cursos')
    .service('Util', Util);

    /** @ngInject */
    function Util($rootScope){
      var util = this;

      util.rootScale = function(){
        return $rootScope.rootScale;
      }

      util.getScale = function(x, xi, xm, xf){
        //$log.debug(((x - xi)*(x - xf))/((xm-xi)*(xm-xf)));
        if(xf != undefined){
          if(xi == undefined){
            return Math.min((x - xm)/(xf - xm), 1);
          }else{
            return Math.max(Math.min(((x - xi)*(x - xf))/((xm-xi)*(xm-xf)), 1), 0);
          }
        }else{
          if(x < xi){
            return 0
          }else{
            return Math.min((x - xi)/(xm - xi), 1);
          }
        }
      }

      util.getEventPosition = function(e){
        var out = {x:0, y:0};
        var container = angular.element(".container").position();
        if(e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel'){
          var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
          out.x = touch.pageX / $rootScope.rootScale - (container.left / $rootScope.rootScale);
          out.y = touch.pageY / $rootScope.rootScale - (container.top / $rootScope.rootScale);
        } else if (e.type == 'mousedown' || e.type == 'mouseup' || e.type == 'mousemove' || e.type == 'mouseover'|| e.type=='mouseout' || e.type=='mouseenter' || e.type=='mouseleave' || e.type=='click') {
          out.x = e.pageX / $rootScope.rootScale - (container.left / $rootScope.rootScale);
          out.y = e.pageY / $rootScope.rootScale - (container.top / $rootScope.rootScale);
        }
        return out;
      }

      util.getLocalEventPosition = function(e){
        var out = {x:0, y:0};
        if(e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel'){
          var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
          out.x = touch.offsetX;
          out.y = touch.offsetY;
        } else if (e.type == 'mousedown' || e.type == 'mouseup' || e.type == 'mousemove' || e.type == 'mouseover'|| e.type=='mouseout' || e.type=='mouseenter' || e.type=='mouseleave' || e.type=='click') {
          out.x = e.offsetX;
          out.y = e.offsetY;
        }
        return out;
      }

      /*var wnd = angular.element($window);

      wnd.bind("mousewheel wheel DOMMouseScroll", function(event){
        event.preventDefault();
      })*/

      //Recebe um evento scroll e retorna a direção da rolagem
      util.getScrollDirection = function(event){
        var direction = "";

        if(event.originalEvent.deltaY) {
          if(event.originalEvent.deltaY > 0) {
            //scroll down
            direction = "down";
          } else {
            //scroll up
            direction = "up";
          }
        } else {
          if(event.wheelDelta){
            if(event.wheelDelta < 0){
              //scroll down
              direction = "down";
            }else{
              //scroll up
              direction = "up";
            }
          }else{
            if(event.originalEvent.wheelDelta < 0) {
              //scroll down
              direction = "down";
            }else {
              //scroll up
              direction = "up";
            }
          }
        }

        return direction;
      }

      util.distance = function(x1, y1, x2, y2){
        var dist = Math.sqrt( Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2) );
        return dist;
      }

      util.getScrollVal = function(pixel){
        return (pixel/24) * 100;
      }

      util.getAngle = function(x1, y1, x2, y2){
        var xDiff = x2 - x1;
        var yDiff = y2 - y1;
        return Math.atan2(yDiff, xDiff) * (180 / Math.PI);
      }

      util.pad = function(n, width, z) {
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
      }

      util.shuffle = function(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;

          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }

        return array;
      }


      util.MouseSpeed = function(config) {
        var updateInterval = 50;
        var velocity = new util.MouseSpeed.Velocity();
        var timerToken;
        var mousedown = !config.velocityOnMouseDownOnly;

        if (config.velocityOnMouseDownOnly) {
          angular.element('body').mouseup(function(e) { if (e.button === 0) { mousedown = false; } });
          angular.element('body').mousedown(function(e) { if (e.button === 0) { mousedown = true; } });
        }

        angular.element(config.selector).mousemove(function(e) {
          velocity.setPoint(new util.MouseSpeed.Point(e.pageX, e.pageY));
        });

        var update = function() {
          velocity.mark();
          if (!mousedown) {
            velocity.setPoint();
          }
          config.handler.call(this, velocity);
        };

        var start = function() {
            angular.element('body').on('mouseover', stopper);
            timerToken = setInterval(update, updateInterval);
        };

        var stopper = function(e) {
            var body = angular.element('body')[0];
            var el = angular.element(e.target);
            var found = false;

            while (!found && el[0] !== body) {
              found = el.is(config.selector);
              el = angular.element(el[0].parentNode);
            }

            if (!found) {
              clearTimeout(timerToken);
              angular.element('body').off('mouseover', stopper);
              angular.element(config.selector).one('mouseover', start);
              velocity.setPoint();
              update();
            }
        };

        angular.element(config.selector).one('mouseover', start);
      };

      util.MouseSpeed.Point = function(x, y) {

        var pointX = x;
        var pointY = y;

        return {
          get: function() {
            var point = [pointX, pointX];
            point.x = pointX;
            point.y = pointX;
            return point;
          },

          set: function(x, y) {
            pointX = x;
            pointY = y;
          },

          getX: function(x) {
            return pointX;
          },

          getY: function(y) {
            return pointY;
          },

          setX: function(x) {
            pointX = x;
          },

          setY: function(y) {
            pointY = y;
          }
        }
      };

      util.MouseSpeed.Velocity = function(point) {

        var p1 = point;
        var p2 = p1;
        var t1 = new Date().getTime();
        var t2 = t1;
        var marked = null;

        var calcVelocity = function(coord1, coord2) {
          return ((coord1 - coord2) / (t1 - t2)) * 1000;
        };

        return {
          velocityX: function() {
            if (!p1 || !p2) { return 0; }
            return Math.round(calcVelocity(p1.getX(), p2.getX()));
          },

          velocityY: function() {
            if (!p1 || !p2) { return 0; }
            return Math.round(calcVelocity(p1.getY(), p2.getY()));
          },

          velocity: function() {
            if (!p1 || !p2) { return 0; }
            var vx = calcVelocity(p1.getX(), p2.getX()),
                vy = calcVelocity(p1.getY(), p2.getY());
            return Math.round(Math.sqrt((vx * vx) + (vy * vy)));
          },

          setPoint: function(p) {
            p2 = p1;
            t2 = t1;
            p1 = p;
            t1 = new Date().getTime();
            marked = null;
          },

          mark: function() {
            var now = new Date().getTime();
            if (marked && marked + 100 < now) {
              this.setPoint();
            }
            marked = marked || now;
          }
        }
      }

    }

})();
