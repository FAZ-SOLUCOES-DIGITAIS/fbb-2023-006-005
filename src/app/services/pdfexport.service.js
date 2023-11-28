(function() {
  'use strict';

  angular
    .module('infi-cursos')
    .service('Pdfexport', Pdfexport);

    /** @ngInject */
    function Pdfexport(){
      var vm = this;

      vm.createPdf = function(content, name){
        var dd = {
          pageSize:'A4',
          pageMargins: [ 40, 40, 40, 40 ],
          header: {
            columns: [
              //{text:'Módulo Carreiras – Etapa 1: Carreira x Trabalho – Como começar a trilhar uma carreira?', color:'#a7d61f'},
              //{image: 'topo', margin:[0,0,0,40], width: 595}
            ]
          },
          content: content,
          footer: {
            columns: [
              //{image: 'rodape', margin: [0, 20, 0, 0 ], width: 600}
            ]
          },
          styles: {
            header: {
              fontSize: 20,
              bold: true,
              marginBottom: 5,
              marginTop: 20,
              color: "#4ac1e0"
            },
            header2: {
              fontSize: 18,
              bold: true,
              marginBottom: 10,
              marginTop: 20,
              color: "#4ac1e0"
            },
            subheader: {
              fontSize: 15
            },
            normal: {
              color: "#282828"
            },
            bold: {
              color: "#282828",
              bold: true
            },
            quote: {
              italics: true
            },
            small: {
              fontSize: 8
            },
            backgroundSize: {
              width: '100%'
            }
          },
          images: {
            //topo: 'data:image/png;base64...'
          }
        }

        pdfMake.createPdf(dd).download(name);

      }

    }
})();
