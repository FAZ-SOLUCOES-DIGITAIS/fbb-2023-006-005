(function () {
  'use strict';

  angular
    .module('infi-cursos')
    .controller('Modulo5_Tela5Controller', Modulo5_Tela5Controller);

  /** @ngInject */
  function Modulo5_Tela5Controller($log, $timeout, Game) {
    var vm = this;

    vm.game = Game;

    $timeout(function () {
      Game.data.currentModule = 4;
      Game.data.currentScreen = 4;
    })

    vm.unlock = Game.unlock;

    if (!Game.data.outros.modulo5.tela5) {
      Game.data.outros.modulo5.tela5 = {};
    }

    if (!vm.game.data.outros.modulo5.tela5.items) {
      vm.game.data.outros.modulo5.tela5.items = [
        [false, false],//0
        [false, false],//1
        [false, false] //2
      ]
      vm.game.data.outros.modulo5.tela5.currentItem = [
        0,//0
      ]

      vm.game.data.outros.modulo5.tela5.quiz = [
        {
          selected: -1,
          completed: false,
          answer: 1,
          points: 0
        },
        {
          selected: -1,
          completed: false,
          answer: 1,
          points: 0
        },
        {
          selected: -1,
          completed: false,
          answer: 1,
          points: 0
        }
      ]

      vm.game.data.outros.modulo5.tela5.texts = [

      ]
    }

    vm.items = vm.game.data.outros.modulo5.tela5.items;
    vm.currentItem = vm.game.data.outros.modulo5.tela5.currentItem;
    vm.quiz = vm.game.data.outros.modulo5.tela5.quiz;
    vm.texts = vm.game.data.outros.modulo5.tela5.texts;

    vm.select = function (id, item, callback, scroll) {
      $timeout(function () {
        vm.items[id][item] = true;
        vm.currentItem[id] = item;

        vm.checkAfterSelect(callback, scroll);

      })
    }

    vm.checkAfterSelect = function (callback, scroll) {
      if (callback) {
        $timeout(function () {
          callback();
        })
      }


      if (vm.items.every(function (_items) {
        return _items.every(function (_item) {
          return _item;
        })
      })) {
        Game.finishScreen();
      }

      if (scroll) {
        $timeout(function () {
          vm.scrollTo(scroll);
        }, 20)
      }
    }


    vm.selectQuiz = function (idQuiz, selectedItem, item, callback, scroll) {
      // if(vm.quiz[id].completed) return;

      $timeout(function () {
        vm.currentItem[idQuiz] = item;

        vm.quiz[idQuiz].selected = selectedItem;


        if (vm.quiz[idQuiz].selected === 1 && !vm.quiz[idQuiz].completed) {
          vm.items[idQuiz] = [true, true];
          vm.quiz[idQuiz].points += 1;
          vm.quiz[idQuiz].completed = true;
        }
        // }

        vm.checkAfterSelect(callback, scroll);
      })

      // vm.checkAfterSelect(callback, scroll);
      // vm.finishQuiz(idQuiz, callback, scroll)
      // })
    }


    vm.finishQuiz = function (id, callback, scroll) {
      if (vm.quiz[id].selected === -1) return;


      $timeout(function () {
        if (!vm.quiz[id].completed) {
          vm.quiz[id].completed = true;

          if (vm.quiz[id].selected === 1) {
            vm.items[id] = [true, true];

            vm.quiz[id].points += 1
          }
        }

        vm.checkAfterSelect(callback, scroll);
      })
    }

    vm.next = function (id) {
      $timeout(function () {
        vm.select(id, vm.currentItem[id] + 1)
      })
    }

    vm.prev = function (id) {
      $timeout(function () {
        vm.select(id, vm.currentItem[id] - 1)
      })
    }

    vm.scrollTo = function (id) {
      var element = document.getElementById(id);

      var y = element.getBoundingClientRect().top + window.scrollY;
      window.scroll({
        top: y,
        behavior: 'smooth'
      });
    }


    vm.finish = function () {
      Game.finishScreen();
      Game.gotoMenu();
    }

  }
  Modulo5_Tela5Controller.$inject = ['$log', '$timeout', 'Game'];
})();
