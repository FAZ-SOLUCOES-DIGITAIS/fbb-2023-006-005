(function() {
  'use strict';

  angular
    .module('infi-cursos')
    .controller('Modulo5_Tela3Controller', Modulo5_Tela3Controller);

  /** @ngInject */
  function Modulo5_Tela3Controller($log, $timeout, Game) {
    var vm = this;

    vm.game = Game;

    $timeout(function(){
      Game.data.currentModule = 4;
      Game.data.currentScreen = 2;
    })

    vm.unlock = Game.unlock;

    if(!Game.data.outros.modulo5.tela3){
      Game.data.outros.modulo5.tela3 = {};
    }

    if(!vm.game.data.outros.modulo5.tela3.items){
      vm.game.data.outros.modulo5.tela3.items = [
        [true, false, false]//0
      ]
      vm.game.data.outros.modulo5.tela3.currentItem = [
        0,//0
      ]

      vm.game.data.outros.modulo5.tela3.quiz = [
        /*{
          selected: -1,
          completed: false,
          answer: 1,
          points: 0
        }*/
      ]

      vm.game.data.outros.modulo5.tela3.texts = [

      ]
    }

    vm.items = vm.game.data.outros.modulo5.tela3.items;
    vm.currentItem = vm.game.data.outros.modulo5.tela3.currentItem;
    vm.quiz = vm.game.data.outros.modulo5.tela3.quiz;
    vm.texts = vm.game.data.outros.modulo5.tela3.texts;

    vm.select = function(id, item, callback, scroll){
      console.log(id, item)
      $timeout(function(){
        vm.items[id][item] = true;
        vm.currentItem[id] = item;

        vm.checkAfterSelect(callback, scroll);

      })
    }

    vm.checkAfterSelect = function(callback, scroll){
      if(callback){
        $timeout(function(){
          callback();
        })
      }

      if(vm.items.every(function(_items){
        return _items.every(function(_item){
          return _item;
        })
      })){
        Game.finishScreen();
      }

      if(scroll){
        $timeout(function(){
          vm.scrollTo(scroll);
        },20)
      }
    }


    vm.selectQuiz = function(id, item, callback, scroll){
      if(vm.quiz[id].completed) return;

      $timeout(function(){
        vm.quiz[id].selected = item;

        //vm.checkAfterSelect(callback, scroll);
      })
    }

    vm.finishQuiz = function(id, callback, scroll){
      if(vm.quiz[id].completed) return;

      $timeout(function(){
        vm.quiz[id].completed = true;

        vm.checkAfterSelect(callback, scroll);
      })
    }

    vm.next = function(id){
      $timeout(function(){
        vm.select(id, vm.currentItem[id] + 1)
      })
    }

    vm.prev = function(id){
      $timeout(function(){
        vm.select(id, vm.currentItem[id] - 1)
      })
    }

    vm.scrollTo = function(id){
      var element = document.getElementById(id);

      var y = element.getBoundingClientRect().top + window.scrollY;
      window.scroll({
        top: y,
        behavior: 'smooth'
      });
    }


    vm.finish = function(){
      Game.finishScreen();
      Game.gotoMenu();
    }

  }
  Modulo5_Tela3Controller.$inject = ['$log', '$timeout', 'Game'];
})();
