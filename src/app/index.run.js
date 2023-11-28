(function() {
  'use strict';

  angular
    .module('infi-cursos')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $window, $rootScope, $timeout, Util, /*MODULES,*/ SCENE_WIDTH, SCENE_HEIGHT) {

    //createjs.Sound.registerSound("sound/path/name.mp3", "sound_id");

    $rootScope.imageLocations = [

    ];

    $rootScope.imageLocationsLazy = [

    ]

    $rootScope.sprites = {

    }

    //------------------- resize functions ----------------------------

    var wnd = angular.element($window);
    var element = angular.element('.container');
    $rootScope.rootScale = 1;

    //$log.debug(element);

    //element.css('width', SCENE_WIDTH + "px");
    //element.css('height', SCENE_HEIGHT + "px");
    //$log.debug("inicia com 1024 e 768");

    //wnd.on('resize', resizeFunction);

    function resizeFunction(){
      var wnd = angular.element(window);
      var el = angular.element('.container');

      var rate1 = wnd.width() / SCENE_WIDTH;
      var rate2 = wnd.height() / SCENE_HEIGHT;
      var rate = Math.min((Math.min(rate1, rate2) - 0.002), 1);
      //$log.debug(element);
      el.css({
        '-webkit-transform': "scale(" + rate + ")",
        '-moz-transform': "scale(" + rate + ")",
        '-ms-transform': "scale(" + rate + ")",
        '-o-transform': "scale(" + rate + ")",
        'transform': "scale(" + rate + ")"
      });
      var valw = (wnd.width() - (SCENE_WIDTH * rate))/2;
      var valh = (wnd.height() - (SCENE_HEIGHT * rate))/2;

      el.css('left', valw + "px");
      el.css('top', valh + "px");

      $rootScope.rootScale = rate;
      window.rootScale = rate;
    }

    //resizeFunction();

    $rootScope.resize = function(){
      //resizeFunction();
    }

    //$rootScope.$on('$stateChangeSuccess', resizeFunction);

    //------------------ end resize functions --------------------------------

    //------------------ define requestAnimationFrame ------------------------

    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !$window.requestAnimationFrame; ++x) {
      $window.requestAnimationFrame = $window[vendors[x]+'RequestAnimationFrame'];
      $window.cancelAnimationFrame = $window[vendors[x]+'CancelAnimationFrame'] || $window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!$window.requestAnimationFrame){
      $window.requestAnimationFrame = function(callback/*, element*/) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = $window.setTimeout(function() { callback(currTime + timeToCall); },
          timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };
    }

    if (!$window.cancelAnimationFrame){
      $window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
      };
    }

    $rootScope.animationCallbacks = {};
    $rootScope.animateConstant = {};

    function animateFrame(){

      angular.forEach($rootScope.animateConstant, function(value/*, key*/){
        value();
        //$log.debug(key)
      });

      requestAnimationFrame(animateFrame);
    }

    //$rootScope.animation = requestAnimationFrame(animateFrame);

    //-------------------- end define requestAnimationFrame ---------------------

    window.addEventListener('resize', resize)

    function resize(){
      document.querySelector(':root').style
      //.setProperty('--vw', window.innerWidth/100 + 'px')
      .setProperty('--vh', window.innerHeight/100 + 'px');
      //.setProperty('--scale', $rootScope.rootScale)

    }

    resize();

    //Css
    //width: calc(100 * var(--vw));


    if ( typeof window.CustomEvent !== "function" ){
      function CustomEvent ( event, params ) {
        params = params || { bubbles: false, cancelable: false, detail: null };
        var evt = document.createEvent( 'CustomEvent' );
        evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
        return evt;
      }

      window.CustomEvent = CustomEvent;
    }

  }

})();
