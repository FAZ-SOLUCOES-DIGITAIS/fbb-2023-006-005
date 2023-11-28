(function() {
  'use strict';

  angular
    .module('infi-cursos')
    .config(routeConfig);

  function routeConfig($stateProvider, $urlRouterProvider, MODULES) {

    var showRoutes = true;

    if(showRoutes){
      $stateProvider
        .state('loading', {
          url: "/febraban-cdc",
          templateUrl: 'app/scenes/loading/loading.html',
          controller: 'LoadingController',
          controllerAs: 'loading'
        })
        .state('logo', {
          url: "/logo",
          templateUrl: 'app/scenes/logo/logo.html',
          controller: 'LogoController',
          controllerAs: 'logo'
        })
        .state('intro', {
          url: "/intro",
          templateUrl: 'app/scenes/intro/intro.html',
          controller: 'IntroController',
          controllerAs: 'intro'
        })
        .state('menu', {
          url: "/menu",
          templateUrl: 'app/scenes/menu/menu.html',
          controller: 'MenuController',
          controllerAs: 'menu'
        })

    }else{
      $stateProvider
        .state('loading', {
          url: "/febraban-cdc",
          templateUrl: 'app/scenes/loading/loading.html',
          controller: 'LoadingController',
          controllerAs: 'loading'
        })
        .state('logo', {
          //url: "/logo",
          templateUrl: 'app/scenes/logo/logo.html',
          controller: 'LogoController',
          controllerAs: 'logo'
        })
        .state('intro', {
          //url: "/intro",
          templateUrl: 'app/scenes/intro/intro.html',
          controller: 'IntroController',
          controllerAs: 'intro'
        })
        .state('menu', {
          //url: "/menu",
          templateUrl: 'app/scenes/menu/menu.html',
          controller: 'MenuController',
          controllerAs: 'menu'
        })

    }


    //console.log($stateProvider);

    /*for (var i = 0; i < MODULES.length; i++) {
      for (var j = 0; j < MODULES[i].length; j++) {
        //console.log(i, j)
        if(showRoutes){
          $stateProvider
            .state('tela' + MODULES[i][j],{
              url:'/tela' + MODULES[i][j],
              templateUrl: 'app/scenes/modulo' + (i + 1) + '/tela' + MODULES[i][j] + '/tela' + MODULES[i][j] + ".html",
              controller: 'Tela' + MODULES[i][j] + 'Controller',
              controllerAs: 'vm'
            })
        }else{
          $stateProvider
            .state('tela' + MODULES[i][j],{
              templateUrl: 'app/scenes/modulo' + (i + 1) + '/tela' + MODULES[i][j] + '/tela' + MODULES[i][j] + ".html",
              controller: 'Tela' + MODULES[i][j] + 'Controller',
              controllerAs: 'vm'
            })
        }
        //console.log('app/scenes/modulo' + (i + 1) + '/tela' + MODULES[i][j] + '/tela' + MODULES[i][j] + ".html");

      }
    }*/

    for (var i = 0; i < MODULES.length; i++) {
      for (var j = 0; j < MODULES[i].length; j++) {
          //console.log(i, j)
          if (showRoutes) {
              $stateProvider
                  .state('modulo' + (i + 1) + '/tela' + MODULES[i][j], {
                      url: '/modulo' + (i + 1) + '/tela' + MODULES[i][j],
                      templateUrl: 'app/scenes/modulo' + (i + 1) + '/tela' + MODULES[i][j] + '/tela' + MODULES[i][j] + ".html",
                      controller: 'Modulo' + (i + 1) + '_Tela' + MODULES[i][j] + 'Controller',
                      controllerAs: 'vm'
                  })
          } else {
              $stateProvider
                .state('modulo' + (i + 1) + '/tela' + MODULES[i][j], {
                  //url: '/modulo' + (i + 1) + '/tela' + MODULES[i][j],
                  templateUrl: 'app/scenes/modulo' + (i + 1) + '/tela' + MODULES[i][j] + '/tela' + MODULES[i][j] + ".html",
                  controller: 'Modulo' + (i + 1) + '_Tela' + MODULES[i][j] + 'Controller',
                  controllerAs: 'vm'
                })
          }
          //console.log('app/scenes/modulo' + (i + 1) + '/tela' + (i + 1) + '_' + MODULES[i][j] + '/tela' + (i + 1) + '_' + MODULES[i][j] + ".html");

      }
    }

    $urlRouterProvider.otherwise("/febraban-cdc");
  }

})();
