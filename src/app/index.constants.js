/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('infi-cursos')
    //.constant('malarkey', malarkey)
    //.constant('moment', moment)
    .constant('SCENE_WIDTH', 1920)
    .constant('SCENE_HEIGHT', 1080)
    .constant('MODULES',[
      [1],//1
      [1],//2
      [1],//3
      [1],//4
      [1,2,3,4,5,6,7],//5
      [1]//6
    ])
    ;

})();
