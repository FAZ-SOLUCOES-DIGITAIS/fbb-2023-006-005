(function() {
  'use strict';

  angular
    .module('infi-cursos')
    .service('Data', Data);

    /** @ngInject */
    function Data($log, lzw){
      var data = this;

      pipwerks.SCORM.version = "1.2";
      data.encode = false;
      data.id = "infi-2023-006-005"

      data.scorm = pipwerks.SCORM;
      data.scormConected = data.scorm.init();

      data.success_status = 'failed';
      data.completion_status = 'incomplete';
      data.score_min = 0;
      data.score_max = 100;
      data.success_score = 0.7;

      data.data = {
        version: "0.8",
        currentTry:0,
        currentModule:0,
        currentScreen:0,
        iniciated: false,
        completed: false,
        preFinal: false,
        progress:0,
        score:0,
        time:0,
        telas: {},
        trilhas:{
          trilha1:{
            completed:true
          },
          trilha2:{
            completed:true
          },
          trilha3:{
            completed:true
          },
          trilha4:{
            completed:true
          },
          trilha5:{
            completed:false
          },
          trilha6:{
            completed:true
          }
        },
        outros: {
          modulo1:{},
          modulo2:{},
          modulo3:{},
          modulo4:{},
          modulo5:{},
          modulo6:{}
        }
      }

      data.setProgress = function(progress){
        data.data.progress = progress;
      }

      data.getProgress = function(){
        return data.data.progress;
      }

      data.getScore = function(){
        return data.data.score;
      }

      data.setScore = function(score){
        if(score >= data.data.score){
          data.data.score = score;
        }
      }

      data.getData = function(){
        return data.data;
      }

      data.checkCompletion = function(){
        if(data.data.completed){
          data.completion_status = "completed";
          //data.completion_status = (data.scorm.version == 1.2 ? 'completed' : 'completed');
          //Podemos inserir outros estados no scorm 2004
          /*if(data.data.score >= 70){
            data.completion_status = "completed"
          }else{
            if(data.data.currentTry === 2){
              data.completion_status = "completed"
            }
          }*/
        }
      }

      data.save = function(){
        //data.setCurrentScroll();
        var state;
        if(data.encode){
          state = lzw.compress(angular.toJson(data.data).replace(/&quot;/g,'"'));
        }else{
          state = angular.toJson(data.data).replace(/&quot;/g,'"');
        }
        data.checkCompletion();

        if(data.scormConected){
          if(data.scorm.version == "2004"){
            data.scorm.set("cmi.suspend_data", state);
            if(data.data.score >= (data.score_max * data.success_score)) data.scorm.set("cmi.success_status", 'passed');
            data.scorm.set("cmi.completion_status", data.completion_status);
            data.scorm.set("cmi.score.min", data.score_min);
            data.scorm.set("cmi.score.max", data.score_max);
            data.scorm.set("cmi.score.scaled", data.data.score/data.score_max);
            data.scorm.set("cmi.score.raw", data.data.score);
            if(data.completion_status == "completed"){
              data.scorm.set("cmi.exit", "logout");
            }else{
              data.scorm.set("cmi.exit", "suspend");
            }
            data.scorm.set("cmi.progress_measure", data.data.progress);
          }else{
            data.scorm.set("cmi.suspend_data", state);
            data.scorm.set("cmi.core.lesson_status", data.completion_status);
            data.scorm.set("cmi.core.score.min", data.score_min);
            data.scorm.set("cmi.core.score.max", data.score_max);
            data.scorm.set("cmi.core.score.raw", data.data.score);
            if(data.completion_status == "completed"){
              data.scorm.set("cmi.core.exit", "logout");
            }else{
              data.scorm.set("cmi.core.exit", "suspend");
            }
          }

          data.scorm.save();
        }else{
          localStorage.setItem(data.id, state);
        }
      }

      data.load = function(callback){
        var state = "";
        if(data.scormConected){
          if(data.scorm.version == "2004"){
            data.success_status = data.scorm.get("cmi.success_status") || 'failed';
            data.completion_status = data.scorm.get("cmi.completion_status") || 'incomplete';
            data.data.score = data.scorm.get("cmi.score.raw") || 0;
            state = data.scorm.get("cmi.suspend_data") || "";
          }else{
            data.completion_status = data.scorm.get("cmi.core.lesson_status") || 'incomplete';
            state = data.scorm.get("cmi.suspend_data") || "";
            data.data.score = data.scorm.get("cmi.core.score.raw") || 0;
          }
        }else{
          state = localStorage.getItem(data.id) || "";
        }
        //$log.debug(state);

        if(state != ""){
          //data.data = JSON.parse(lzw.decompress(state));
          //data.data = angular.fromJson(lzw.decompress(state));
          var new_state = "";
          try{
            if(data.encode){
              new_state = angular.fromJson(lzw.decompress(state));
            }else{
              new_state = angular.fromJson(state.replace(/&quot;/g,'"'));
            }
          }catch(err){
            console.log("Erro ao decodificar string");
            console.log(err);
            new_state = "";
          }

          console.log("restaurando:")
          console.log(new_state);

          if(new_state != ""){
            if(new_state.version){
              if(new_state.version == data.data.version){
                data.data = new_state;
              }
            }
          }
          //console.log(data.data);
        }

        if(callback) callback();
      }

      data.quit = function(){
        data.save();
        data.scorm.quit();
      }


    }
    Data.$inject = ['$log', 'lzw'];
})();
