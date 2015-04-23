'use strict';

angular.module('angular.boleto', ['ui.bootstrap', 'ui.mask', 'ui.utils.masks'])

  .directive('inputBoleto', function () {
    return {
      restrict: 'E',
      replace: true,
      require: '?ngModel',
      scope: {
        form: '=',
        name: '@',
        validarValor: '='
      },
      template: '<input type="text" ui-mask="?99999.99999 99999.999999 99999.999999 9 99999999999999" placeholder="_____._____ _____.______ _____.______ _ ______________" />',
      link: function (scope, elem, attrs, ctrl) {

        scope.$watch(attrs.ngModel, function (newVal) {
          validar(newVal);
        });

        var validar = function (val) {
          var numeroBoleto;

          resetarValidade();

          if (typeof val === 'undefined' || val.length == 0)
            return;
          else
            numeroBoleto = val.replace(/[^0-9]/g, '');

          if (numeroBoleto.length < 47) {
            scope.form[scope.name].$setValidity('tamanhoErrado', false)
            return false;
          }

          if (parseInt(numeroBoleto) === 0 || numeroBoleto.length === 0) {
            scope.form[scope.name].$setValidity('zerado', false);
            return false;
          }

          // TODO: Para poder calcular o dígito verificador será necessário identificar o banco pois há diferenças na verificação para alguns bancos como o BB por exemplo.
          /*
          if (numeroBoleto.length == 47 && calcularDigitoVerificadorGeral(numeroBoleto.substr(0, 4) + numeroBoleto.substr(5, 39)) != numeroBoleto.substr(4, 1)) {
            scope.form[scope.name].$setValidity('verificadorErrado', false);
            return false;
          }
          */

          if (numeroBoleto.length == 47 && validarBlocos(numeroBoleto)) {
            return true;
          }
        }; // $scope.validar

        var resetarValidade = function () {
          scope.form[scope.name].$setValidity('tamanhoErrado', true);
          scope.form[scope.name].$setValidity('zerado', true);
          scope.form[scope.name].$setValidity('verificadorErrado', true);
          scope.form[scope.name].$setValidity('bloco1Errado', true);
          scope.form[scope.name].$setValidity('bloco2Errado', true);
          scope.form[scope.name].$setValidity('bloco3Errado', true);
          scope.form[scope.name].$setValidity('valorErrado', true);
        }; // resetarValidade

        /*
        var calcularDigitoVerificadorGeral = function (numero) {
          var soma  = 0;
          var peso  = 2;
          var base  = 9;
          var resto = 0;
          var contador = numero.length - 1;
          for (var i = contador; i >= 0; i--) {
            soma = soma + (numero.substring(i,i + 1) * peso);
            if (peso < base)
              peso++;
            else
              peso = 2;
          }
          var digito = 11 - (soma % 11);
          if (digito >  9)
            digito = 0;
          if (digito == 0)
            digito = 1;
          return digito;
        }; // calcularDigitoVerificadorGeral
        */

        var calcularDigitoVerificador = function (numero) {
          var soma  = 0;
          var peso  = 2;
          var multiplicacao;
          var contador = numero.length-1;
          while (contador >= 0) {
            multiplicacao = numero.substr(contador,1) * peso;
            if (multiplicacao >= 10)
              multiplicacao = 1 + (multiplicacao-10);
            soma = soma + multiplicacao;
            if (peso == 2)
              peso = 1;
            else
              peso = 2;
            contador = contador - 1;
          }
          var digito = 10 - (soma % 10);
          if (digito == 10)
            digito = 0;
          return digito;
        }; // calcularDigitoVerificador

        var validarBlocos = function (numeroBoleto) {
          var campo1 = numeroBoleto.substr(0, 9);
          var dig1 = numeroBoleto.substr(9, 1);
          var dv1 = calcularDigitoVerificador(campo1);
          if (parseInt(campo1) === 0 || dig1 != dv1) {
            scope.form[scope.name].$setValidity('bloco1Errado', false);
            return false;
          }

          var campo2 = numeroBoleto.substr(10, 10);
          var dig2 = numeroBoleto.substr(20, 1);
          var dv2 = calcularDigitoVerificador(campo2);
          if (parseInt(campo2) === 0 || dig2 != dv2) {
            scope.form[scope.name].$setValidity('bloco2Errado', false);
            return false;
          }

          var campo3 = numeroBoleto.substr(21, 10);
          var dig3 = numeroBoleto.substr(31, 1);
          var dv3 = calcularDigitoVerificador(campo3);
          if (parseInt(campo3) === 0 || dig3 != dv3) {
            scope.form[scope.name].$setValidity('bloco3Errado', false);
            return false;
          }

          //var campo4 = numeroBoleto.substr(32, 1); // Digito verificador
          //var campo5 = numeroBoleto.substr(33, 14); // Vencimento + Valor

          if (typeof scope.validarValor !== 'undefined') {
            var valor = numeroBoleto.substr(37, 10);
            valor = parseFloat(valor.substr(0, 8) + '.' + valor.substr(valor.length-2));
            if (valor !== scope.validarValor) {
              scope.form[scope.name].$setValidity('valorErrado', false);
              return false;
            }
          }

          return true;
        }; // validarBlocos
      }
    }
  })
;