'use strict';

angular.module('angular.boleto.exemplo', ['ui.utils.masks', 'angular.boleto'])
  
  .controller('IndexCtrl', function ($scope) {

    // Valores colocados nos modelos apenas para teste. Para colocar seus valores de teste e exibir os campos em branco na tela basta comentar esses trechos.
    $scope.$parent.valor = 1274567.89;
    $scope.$parent.vencimento = '2014-01-18';
    $scope.$parent.boleto = '21890010070014560208200371313180159470127456789';

  });