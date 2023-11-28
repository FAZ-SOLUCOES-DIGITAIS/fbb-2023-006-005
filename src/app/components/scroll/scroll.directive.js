(function() {
  'use strict';

  angular
    .module('infi-cursos')
    .directive('scroll', scroll);

  /** @ngInject */
  function scroll($timeout, Util, Game) {
    var directive = {
      restrict: 'E',
      transclude: true,
      replace: true,
      templateUrl: 'app/components/scroll/scroll.html',
      scope: {
        config: '='
      },
      controller: scrollController,
      controllerAs: "vm",
      bindToController: true
    };

    return directive;

    function scrollController(){
      var vm = this;

      vm.showScrollbar = true;
      vm.sliderHeight = 0;

      if(!vm.config){
        vm.config = {
          lockMaxPage: -1
        }
      }else{
        if(!vm.config.lockMaxPage){
          vm.config.lockMaxPage = -1
        }
      }

      vm.scrollbarstyle = {
        position: 'absolute',
        right: 5,
        top: 65,
        width: 20,
        height: 1005
      }

      vm.pickerStyle = {
        top:0,
        left:0,
        width:20,
        height:80
      }

      vm.buttonsStyle = {
        width:20,
        heihgt:20,
        display:'none'
      }

      vm.pickertop = {
        min: 0,
        max: 0
      }

      vm.scrollStyle = {
        position: 'absolute',
        left: 0,
        top: 0,
        transition: '0.5s top'
      }

      vm.top = {
        min: 0,
        max: 0
      }

      vm.pages = {
        min:0,
        max:0
      }

      vm.mouseVel = 0;
      vm.posTop = 0;

      vm.config.currentPage = 0;

      vm.moving = false;
      vm.mousepos = {
        y:0
      }

      vm.inipos = {
        y:0
      }

      vm.updatePickerPos = function(){
        $timeout(function(){
          vm.pickerStyle.top = (vm.scrollStyle.top / vm.top.max) * (vm.pickertop.max)

          var event = new CustomEvent("customScroll", {
            detail: {
              top: -vm.posTop + (2 * 1080/3)
            }
          });
          dispatchEvent(event);
        })
      }

      vm.updatePagePos = function(){
        $timeout(function(){
          vm.scrollStyle.top = (vm.pickerStyle.top / vm.pickertop.max) * vm.top.max;

          var event = new CustomEvent("customScroll", {
            detail: {
              top: -vm.posTop + (2 * 1080/3)
            }
          });
          dispatchEvent(event);
        })
      }

      vm.updateVel = function(velocity) {
        vm.mouseVel = velocity.velocityY();
      };

      $timeout(function(){
        vm.timeline = angular.element('.scroll-content');

        $timeout(function(){
          vm.sliderHeight = angular.element('#slider-bar').height();
          //console.log(vm.sliderHeight)
          vm.pickertop.max = vm.sliderHeight - 80;
        }, 5)

        vm.scrollStyle.width = vm.timeline.width();
        vm.scrollStyle.height = vm.config.pageHeight;//vm.timeline.height();

        vm.top.max = vm.timeline.parent().height() - vm.config.totalHeight;
        console.log(vm.top.max)

        vm.pages.max = Math.abs(Math.round(vm.top.max / vm.scrollStyle.height));

        //vm.scrollbarstyle.height = vm.scrollStyle.height - 200;

        //console.log(vm.timeline.parent().height())
        //console.log(vm.timeline.height())

        //vm.mouseSpeed = new Util.MouseSpeed({ selector: '.scroll', velocityOnMouseDownOnly: true, handler: vm.updateVel });


        //vm.timeline.on('mousedown touchstart', function(evt){
        angular.element('.scroll-content').on('mousedown touchstart', function(evt){
          //if(evt.target.offsetParent.className == 'slick-track') return;
          //console.log(evt.target.offsetParent.className);
          if(evt.target.offsetParent.className == 'drag' || evt.target.offsetParent.className == 'drag dropped') return;
          vm.scrollStyle.transition = null;
          vm.pickerStyle.transition = null;
          vm.mousepos.y = Util.getEventPosition(evt).y//.pageY;
          vm.inipos.y = vm.scrollStyle.top;
          vm.moving = true;

          //console.log(vm.moving, vm.mousepos, vm.inipos);
        })

        angular.element(window).on('mousemove touchmove', function(evt){
          if (evt.type == 'mousedown' || evt.type == 'mouseup' || evt.type == 'mousemove') evt.preventDefault();

          if(vm.moving){
            var evtY = Util.getEventPosition(evt).y;
            var deltaY = evtY - vm.mousepos.y;
            vm.mousepos.y = evtY;
            $timeout(function(){
              vm.posTop = Math.min(vm.top.min, Math.max(vm.top.max, vm.posTop + deltaY));
              //console.log(vm.posTop, -vm.config.lockMaxPage * vm.scrollStyle.height)
              if(vm.config.lockMaxPage >= 0){
                vm.posTop = Math.max(vm.posTop, -vm.config.lockMaxPage * vm.scrollStyle.height)
              }
              vm.scrollStyle.top = vm.posTop;
              vm.updatePickerPos();
            })

            //vm.update(evt);
          }
        })


        angular.element(window).on('mouseup touchend', function(){
          vm.moving = false;
          //vm.movingScroll = false;

          var pg = Math.round(Math.abs(vm.posTop / vm.scrollStyle.height))
          //console.log(pg);

          //vm.animToPage(vm.config.currentPage)

          //console.log(vm.mouseVel);

          if(vm.mouseVel > 1200 && pg == vm.config.currentPage){
            vm.animToPage(vm.config.currentPage - 1)
          }else if(vm.mouseVel < -1200 && pg == vm.config.currentPage){
            if(vm.config.lockMaxPage >= 0){
              var targetPage = Math.min(vm.config.currentPage + 1, vm.config.lockMaxPage)
              vm.animToPage(targetPage)
            }else{
              vm.animToPage(vm.config.currentPage + 1)
            }
          }else{
            vm.animToPage(pg)
          }


          //vm.animVel(vm.mouseVel);
        })

        // --------------------- scroll ---------------------- //

        vm.scrollTop = 0;

        angular.element('.scroll-bar-slider-picker').on('mousedown touchstart', function(evt){
          vm.scrollStyle.transition = null;
          vm.pickerStyle.transition = null;
          vm.mousepos.y = Util.getEventPosition(evt).y//.pageY;
          vm.inipos.y = vm.pickerStyle.top;
          vm.scrollTop = vm.pickerStyle.top;
          vm.movingScroll = true;

          //console.log(vm.moving, vm.mousepos, vm.inipos);
        })

        angular.element(window).on('mousemove touchmove', function(evt){
          if (evt.type == 'mousedown' || evt.type == 'mouseup' || evt.type == 'mousemove') evt.preventDefault();

          if(vm.movingScroll){
            var evtY = Util.getEventPosition(evt).y;
            var deltaY = evtY - vm.mousepos.y;
            //vm.mousepos.y = evtY;
            $timeout(function(){
              //console.log(vm.pickertop.min, vm.pickertop.max, vm.scrollTop + deltaY)
              vm.scrollTop = Math.min(vm.pickertop.max, Math.max(vm.pickertop.min, vm.scrollTop + deltaY));
              if(vm.config.lockMaxPage >= 0){
                var maxPagePosition = vm.config.lockMaxPage * vm.scrollStyle.height
                var maxPagePercentage = Math.abs(maxPagePosition / vm.top.max);
                var maxPickerTop = maxPagePercentage * vm.pickertop.max
                //console.log(maxPagePosition, maxPagePercentage, maxPickerTop, vm.scrollTop)
                //vm.scrollTop = Math.min(maxPickerTop, vm.scrollTop)
                if(vm.scrollTop > maxPickerTop){
                  vm.scrollTop = maxPickerTop
                }else{
                  vm.mousepos.y = evtY;
                }
              }else{
                vm.mousepos.y = evtY;
              }
              vm.pickerStyle.top = vm.scrollTop;
              //vm.posTop = Math.min(vm.top.min, Math.max(vm.top.max, vm.posTop + deltaY));
              //vm.scrollStyle.top = vm.posTop;
              vm.updatePagePos();
            })

            //vm.update(evt);
          }
        })


        angular.element(window).on('mouseup touchend', function(){
          vm.movingScroll = false;

          //var pg = Math.round(Math.abs(vm.posTop / vm.scrollStyle.height))
          var pg = Math.round(Math.abs(vm.scrollStyle.top / vm.scrollStyle.height))

          //console.log(pg);

          //vm.animToPage(vm.config.currentPage)

          //console.log(vm.mouseVel);

          if(vm.mouseVel > 1200 && pg == vm.config.currentPage){
            vm.animToPage(vm.config.currentPage - 1)
          }else if(vm.mouseVel < -1200 && pg == vm.config.currentPage){
            if(vm.config.lockMaxPage >= 0){
              var targetPage = Math.min(vm.config.currentPage + 1, vm.config.lockMaxPage)
              vm.animToPage(targetPage)
            }else{
              vm.animToPage(vm.config.currentPage + 1)
            }
          }else{
            vm.animToPage(pg)
          }


          //vm.animVel(vm.mouseVel);
        })

        // -------------------- /scroll ---------------------- //

        angular.element(window).on('swipeup', function(){
          vm.animToPage(vm.config.currentPage - 1)
        })

        angular.element(window).on('swipedown', function(){
          if(vm.config.lockMaxPage >= 0){
            if(vm.config.currentPage + 1 <= vm.config.lockMaxPage) vm.animToPage(vm.config.currentPage + 1)
          }else{
            vm.animToPage(vm.config.currentPage + 1)
          }
        })

        angular.element(window).on('mousewheel wheel DOMMouseScroll', function(evt){

          var direction = Util.getScrollDirection(evt);
          //var vel = 0;

          //vm.config.currentPage = Math.round(Math.abs(vm.posTop / vm.top.max))

          if(direction == 'up'){
            vm.animToPage(vm.config.currentPage - 1)
            //vel = 2000;
          }else{
            if(vm.config.lockMaxPage >= 0){
              if(vm.config.currentPage + 1 <= vm.config.lockMaxPage) vm.animToPage(vm.config.currentPage + 1)
            }else{
              vm.animToPage(vm.config.currentPage + 1)
            }
            //vel = -2000;
          }

          //vm.animVel(vel);
        })

        angular.element(window).on('keydown', function(evt){

          var keycode = evt.keyCode;
          //var vel = 0;

          //console.log(keycode)

          if(keycode == 37 || keycode == 38){
            vm.animToPage(vm.config.currentPage - 1)
            //vel = 2000;
          }else if(keycode == 39 || keycode == 40){
            if(vm.config.lockMaxPage >= 0){
              if(vm.config.currentPage + 1 <= vm.config.lockMaxPage) vm.animToPage(vm.config.currentPage + 1)
            }else{
              vm.animToPage(vm.config.currentPage + 1)
            }
            //vel = -2000;
          }

          //vm.animVel(vel);
        })

        addEventListener('scrollDown', vm.clickDown);
        addEventListener('scrollUp', vm.clickUp);
      }, 50)

      vm.clickDown = function(){
        //vm.animToPage(vm.config.currentPage + 1)
        if(vm.config.lockMaxPage >= 0){
          if(vm.config.currentPage + 1 <= vm.config.lockMaxPage) vm.animToPage(vm.config.currentPage + 1)
        }else{
          vm.animToPage(vm.config.currentPage + 1)
        }
      }

      vm.clickUp = function(){
        vm.animToPage(vm.config.currentPage - 1)
      }


      vm.animating = false;
      vm.animToPage = function(page){
        //console.log(page, vm.animating)
        if(vm.animating) return;

        $timeout(function(){

        if(page >= 0 && page <= vm.pages.max){
          vm.animating = true;
          vm.scrollStyle.transition = '0.5s top';
          vm.pickerStyle.transition = '0.5s top';
          vm.config.currentPage = page;
          vm.posTop = - vm.config.currentPage * vm.scrollStyle.height;

          $timeout(function(){
            vm.scrollStyle.top = vm.posTop;
            vm.updatePickerPos();

            $timeout(function(){
              vm.animating = false;
            }, 400)
          })
        }

        if(page == vm.pages.max){
          if(vm.config.callback){
            vm.config.callback();
          }

          var event = new CustomEvent("customScroll", {
            detail: {
              top: vm.config.totalHeight
            }
          });
          dispatchEvent(event);

          /*if(!Game.data.completed){
            Game.data.completed = true;
            Game.data.progress = 100;
            Game.save();
          }*/
        }

        },10)

      }

      vm.config.unscroll = function(){
        if(vm.config.callback){
          vm.config.callback = null;
        }
      }

    }
  }
  scroll.$inject = ['$timeout', 'Util', 'Game'];

})();
