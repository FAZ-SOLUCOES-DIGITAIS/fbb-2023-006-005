(function() {
  'use strict';

  angular
    .module('infi-cursos')
    .service('Game', Game);

    /** @ngInject */
    function Game($log, $state, lzw, $rootScope, $timeout, Data, MODULES){
      var game = this;

      game.data = Data.data;
      game.currentState = "iniciando";
      game.progress = [];
      game.modules = MODULES;

      game.unlock = true;

      game.feedClient = 0;

      for (var j = 0; j < game.modules.length; j++) {
        game.data.telas[j] = {};

        for (var i = 0; i < game.modules[j].length; i++) {
          game.data.telas[j]['tela' + game.modules[j][i]] = false;
        }
      }

      game.finishScreen = function(){
        game.data.telas[game.data.currentModule]['tela' + game.modules[game.data.currentModule][game.data.currentScreen]] = true;
        if(game.data.currentScreen < game.modules[game.data.currentModule].length - 1){
          game.unlockAvancar();
        }else{
          //game.data.completed = true;
          game.data.trilhas['trilha' + (game.data.currentModule + 1)].completed = true;
        }

        var finished = true;
        angular.forEach(game.data.trilhas, function(value, key){
          //console.log(key, value)
          if(!value.completed){
            finished = false;
          }
        })

        console.log("verigicando se está completo: ", finished);

        if(finished){
          game.data.completed = true;
          //game.data.score = 100;
          game.save();
        }else{
          game.save();
        }

        //$rootScope.updateProgress();
      }

      game.finishGame = function(_score){
        game.data.trilhas.trilha1.completed = true;
        game.data.completed = true;
        if(_score >= game.data.score){
          game.data.score = _score;
        }
        game.save();
      }

      game.screenFinished = function(){
        return game.data.telas[game.data.currentModule]['tela' + game.modules[game.data.currentModule][game.data.currentScreen]];
      }

      game.specificScreenFinished = function(targetScreen){
        return game.data.telas[game.data.currentModule]['tela' + game.modules[game.data.currentModule][targetScreen]];
      }

      game.save = function(){
        //if($rootScope.time != undefined) Data.data.time = $rootScope.time;
        console.log("Salvando data:");
        console.log(Data.data);
        //game.data.score = Math.round((game.data.exercicios.ex1.score + game.data.exercicios.ex2.score)/2 * 100);
        Data.save();
      }

      game.load = function(callback){
        Data.load(function(){
          $timeout(function(){
            game.data = Data.data;
            //$rootScope.time = Data.data.time;
            if(callback) callback();
          })
        });
      }

      game.gotoIntro = function(callback){
        angular.element(angular.element(".ng-scope")[0]).hide(200, function(){
          //$rootScope.setNext(null);
          //$rootScope.setPrev(null);
          $state.go('intro');
          game.currentState = 'início';
          game.showMenu(true);
          angular.element(angular.element(".ng-scope")[0]).show(200, function(){
            //$rootScope.updateMenu();
            if(callback) callback();
          });
        })
      }

      game.gotoLogo = function(callback){
        angular.element(angular.element(".ng-scope")[0]).hide(200, function(){
          $rootScope.setNext(null);
          $rootScope.setPrev(null);
          $state.go('logo');
          game.currentState = 'logo';
          angular.element(angular.element(".ng-scope")[0]).show(200, function(){
            //$rootScope.updateMenu();
            if(callback) callback();
          });
        })
      }

      game.gotoMenu = function(callback){
        angular.element(angular.element(".ng-scope")[0]).hide(200, function(){
          //$rootScope.setNext(null);
          //$rootScope.setPrev(null);
          if(game.bfFunction){
            game.bfFunction();
            game.bfFunction = null;
          }
          $state.go('menu');
          game.currentState = 'menu';
          game.showMenu(true);
          angular.element(angular.element(".ng-scope")[0]).show(200, function(){
            //$rootScope.updateMenu();
            if(callback) callback();
          });
        })
      }

      game.go = function(state, callback){
        angular.element(angular.element(".ng-scope")[0]).hide(200, function(){
          $rootScope.setNext(null);
          $rootScope.setPrev(null);
          $state.go(state).then(function(){
            angular.element(angular.element(".ng-scope")[0]).show(200, function(){
              if(callback) callback();
              game.save();
            });
          })
        })
      }

      game.gotoTela = function(tela, module, callback){
        //console.log(module)
        console.log(tela)
        if(tela > game.data.currentScreen){
          angular.element(".container-app").removeClass("goingleft").addClass("goingright")
        }else{
          angular.element(".container-app").removeClass("goingright").addClass("goingleft")
        }

        $timeout(function(){
          angular.element(".container-app").removeClass("goingleft").removeClass("goingright")
        },600)

        if(game.bfFunction){
          game.bfFunction();
          game.bfFunction = null;
        }

        if(module !== undefined){
          //console.log("entrou")
          game.data.currentModule = module;
        }

        game.lockAvancar();
        game.lockVoltar();

        //console.log("mod: " + game.data.currentModule);
        //console.log("tela: " + game.data.currentScreen);
        //console.log("page: " + game.modules[game.data.currentModule][game.data.currentScreen]);
        //console.log('tela' + (game.data.currentModule + 1) + "_" + game.modules[game.data.currentModule][game.data.currentScreen]);
        //if(game.data.lastScreen < tela) game.data.lastScreen = tela;
        game.data.lastScreen = game.data.currentScreen;
        game.data.currentScreen = tela;
        //game.save();

        $rootScope.changing = true;

        //angular.element(".contentscreen").addClass("changing-start")

        //angular.element(angular.element(".contentscreen")[0]).hide(200, function(){
          game.bfFunction = undefined;
          game.currentState = 'tela';
          //$state.go('tela' + game.modules[game.data.currentModule][game.data.currentScreen]);
          $state.go('modulo' + (game.data.currentModule + 1) + '/tela' + game.modules[game.data.currentModule][game.data.currentScreen]);

          //angular.element(".contentscreen").removeClass("changing-start").addClass("changing-end")
          //game.showMenu();
          //angular.element(angular.element(".contentscreen")[0]).show(200, function(){
            //$rootScope.updateMenu();
            /*$timeout(function(){
              game.totalTelas = game.modules[game.data.currentModule].length;
              game.currentTela = game.data.currentScreen + 1;
              game.updateProgress();
            })*/
            //$rootScope.updateProgress();
            if(game.data.currentScreen > 0){
              game.unlockVoltar();
            }

            if(game.data.telas[game.data.currentModule]['tela' + game.modules[game.data.currentModule][game.data.currentScreen]]){
              if(game.data.currentScreen < game.modules[game.data.currentModule].length - 1){
                game.unlockAvancar();
              }
            }
            if(callback) callback();
          //});
        //})
      }

      //Lidando com as função previous e next
      //game.nextFunction = null;

      game.nextFunction = function(){
        if(game.screenFinished()){
          //console.log("goingo to: ", game.data.currentScreen + 1)
          game.gotoTela(game.data.currentScreen + 1)
        }
      }

      game.next = function(){
        if(game.nextFunction) game.nextFunction();
      }

      $rootScope.setNext = function(nextFunc){
        game.nextFunction = nextFunc;
        if(nextFunc == null){
          $rootScope.locknext();
        }else{
          $rootScope.unlocknext();
        }
      }

      //game.prevFunction = null;

      game.prevFunction = function(){
        if(game.data.currentScreen > 0){
          game.gotoTela(game.data.currentScreen - 1)
        }
      }

      game.prev = function(){
        if(game.prevFunction) game.prevFunction();
      }

      $rootScope.setPrev = function(prevFunc){
        game.prevFunction = prevFunc;
        if(prevFunc == null){
          $rootScope.lockprev();
        }else{
          $rootScope.unlockprev();
        }
      }

      game.lockAvancar = function(){
        $rootScope.locknext();
      }
      game.unlockAvancar = function(){
        $rootScope.unlocknext();
      }

      game.lockVoltar = function(){
        $rootScope.lockprev();
      }
      game.unlockVoltar = function(){
        $rootScope.unlockprev();
      }

      //---------------------------------------------

      game.resizeWindow= function(){
        $rootScope.resize();
      }

      game.updateProgress = function(){
        $rootScope.updateProgress();
      }

      game.showMenu = function(){
        $rootScope.showMenu(true);
      }

      game.hideMenu = function(){
        $rootScope.showMenu(false);
      }

      game.changeMenu = function(grey){
        $rootScope.changeMoldura(grey);
      }

      window.onbeforeunload = function(){
        Data.quit();
      }


      /*$timeout(function(){

        console.log($state);

        game.data.currentScreen = Number($state.current.name.replace('tela', '')) - 1;

        if(game.data.currentScreen > 0){
          game.unlockVoltar();
        }

        //if(game.data.telas['tela' + game.modules[game.data.currentModule][game.data.currentScreen]]){
        if(game.data.currentScreen < game.modules[game.data.currentModule].length - 1 && game.data.telas['tela' + game.modules[game.data.currentModule][game.data.currentScreen]]){
          game.unlockAvancar();
        }
      }, 100)*/

    }
    Game.$inject = ['$log', '$state', 'lzw', '$rootScope', '$timeout', 'Data', 'MODULES'];
})();
