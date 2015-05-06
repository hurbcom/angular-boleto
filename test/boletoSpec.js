describe('Campo de boleto bancário', function () {
  var $compile;
  var $rootScope;
  var $scope;

  beforeEach(module('angular.boleto'));

  beforeEach(inject(function (_$compile_, _$rootScope_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;

    $scope = $rootScope.$new();

    var element = '<ng-form name="form1">' +
      '<input-boleto ng-model="$parent.boleto" validar-valor="$parent.valor" validar-vencimento="$parent.vencimento" form="form1" name="boleto" />' +
      '</ng-form>';

    $scope.element = $compile(element)($scope);
  }));

  it ('deverá substituir elemento com o HTML certo', function () {
    expect($scope.element.html()).toContain('<input type="text" ui-mask="?99999.99999 99999.999999 99999.999999 9 99999999999999" ng-model="$parent.boleto" validar-valor="$parent.valor" validar-vencimento="$parent.vencimento" form="form1" name="boleto" class="ng-isolate-scope ng-pristine ng-valid">');
  });

  it ('deverá estar válido com código de boleto válido', function () {
    $rootScope.valor = 0.00;
    $scope.form1.boleto.$setViewValue('10491504263100090855355227287939364140000000000');
    $scope.$digest();

    expect($scope.form1.$valid).toBe(true);
    expect($scope.form1.boleto.$valid).toBe(true);
  });

  it ('deverá estar válido com código de boleto válido', function () {
    $rootScope.valor = 934.23;
    $scope.form1.boleto.$setViewValue('10491443385511900000200000000141325230000093423');
    $scope.$digest();

    expect($scope.form1.$valid).toBe(true);
    expect($scope.form1.boleto.$valid).toBe(true);
  });

  it ('deverá estar válido com código de boleto válido', function () {
    $rootScope.valor = 0.00;
    $scope.form1.boleto.$setViewValue('10491443385511900000200000000141325230000000000');
    $scope.$digest();

    expect($scope.form1.$valid).toBe(true);
    expect($scope.form1.boleto.$valid).toBe(true);
  });

  it ('deverá estar inválido com código de boleto com valor errado', function () {
    $rootScope.valor = 1274567.89;
    $scope.form1.boleto.$setViewValue('21890010070014560208200371313180100000987654321');
    $scope.$digest();

    expect($scope.form1.$valid).toBe(false);
    expect($scope.form1.boleto.$valid).toBe(false);
    expect($scope.form1.boleto.$error.valorErrado).toBe(true);
  });

  it ('deverá estar válido com código de boleto com valor correto', function () {
    $rootScope.valor = 1274567.89;
    $scope.form1.boleto.$setViewValue('21890010070014560208200371313180100000127456789');
    $scope.$digest();

    expect($scope.form1.$valid).toBe(true);
    expect($scope.form1.boleto.$valid).toBe(true);
    expect($scope.form1.boleto.$error.valorErrado).toBe(false);
  });

  it ('deverá estar inválido com código de boleto com tamanho errado', function () {
    $scope.form1.boleto.$setViewValue('0000000000000000000000000000000000000000001');
    $scope.$digest();

    expect($scope.form1.$valid).toBe(false);
    expect($scope.form1.boleto.$valid).toBe(false);
    expect($scope.form1.boleto.$error.tamanhoErrado).toBe(true);
  });

  it ('deverá estar inválido com código de boleto zerado', function () {
    $scope.form1.boleto.$setViewValue('00000000000000000000000000000000000000000000000');
    $scope.$digest();

    expect($scope.form1.$valid).toBe(false);
    expect($scope.form1.boleto.$valid).toBe(false);
    expect($scope.form1.boleto.$error.zerado).toBe(true);
  });

  it ('deverá estar inválido com código de boleto com bloco 1 inválido', function () {
    $scope.form1.boleto.$setViewValue('00000000010000000000000000000000000000000000000');
    $scope.$digest();

    expect($scope.form1.$valid).toBe(false);
    expect($scope.form1.boleto.$valid).toBe(false);
    expect($scope.form1.boleto.$error.bloco1Errado).toBe(true);
  });

  it ('deverá estar inválido com código de boleto com bloco 2 inválido', function () {
    $scope.form1.boleto.$setViewValue('21890010070000000000100000000000000000000000000');
    $scope.$digest();

    expect($scope.form1.$valid).toBe(false);
    expect($scope.form1.boleto.$valid).toBe(false);
    expect($scope.form1.boleto.$error.bloco2Errado).toBe(true);
  });

  it ('deverá estar inválido com código de boleto com bloco 3 inválido', function () {
    $scope.form1.boleto.$setViewValue('21890010070014560208200000000001000000000000000');
    $scope.$digest();

    expect($scope.form1.$valid).toBe(false);
    expect($scope.form1.boleto.$valid).toBe(false);
    expect($scope.form1.boleto.$error.bloco3Errado).toBe(true);
  });
  
  it ('deverá estar válido com código de boleto com vencimento correto', function () {
    $rootScope.vencimento = '2014-01-18';
    $scope.form1.boleto.$setViewValue('21890010070014560208200371313180159470127456789');
    $scope.$digest();

    expect($scope.form1.$valid).toBe(true);
    expect($scope.form1.boleto.$valid).toBe(true);
    expect($scope.form1.boleto.$error.vencimentoErrado).toBe(false);
  });

  it ('deverá estar válido com código de boleto sem vencimento', function () {
    $scope.form1.boleto.$setViewValue('21890010070014560208200371313180159470127456789');
    $scope.$digest();

    expect($scope.form1.$valid).toBe(true);
    expect($scope.form1.boleto.$valid).toBe(true);
    expect($scope.form1.boleto.$error.vencimentoErrado).toBe(false);
  });

  it ('deverá estar inválido com código de boleto com vencimento inválido', function () {
    $rootScope.vencimento = '2014-01-18';
    $scope.form1.boleto.$setViewValue('21890010070014560208200371313180159480127456789');
    $scope.$digest();

    expect($scope.form1.$valid).toBe(false);
    expect($scope.form1.boleto.$valid).toBe(false);
    expect($scope.form1.boleto.$error.vencimentoErrado).toBe(true);
  });

  it ('deverá estar válido com código de boleto com vencimento correto', function () {
    $rootScope.vencimento = '2014-03-12';
    $scope.form1.boleto.$setViewValue('21890010070014560208200371313180160000127456789');
    $scope.$digest();

    expect($scope.form1.$valid).toBe(true);
    expect($scope.form1.boleto.$valid).toBe(true);
    expect($scope.form1.boleto.$error.vencimentoErrado).toBe(false);
  });

  it ('deverá estar válido com código de boleto com fator de vencimento zerado', function () {
    $rootScope.vencimento = '2014-03-12';
    $scope.form1.boleto.$setViewValue('21890010070014560208200371313180100000127456789');
    $scope.$digest();

    expect($scope.form1.$valid).toBe(true);
    expect($scope.form1.boleto.$valid).toBe(true);
    expect($scope.form1.boleto.$error.vencimentoErrado).toBe(false);
  });

  it ('deverá estar válido com código de boleto com fator de vencimento zerado', function () {
    $rootScope.vencimento = '2014-03-12';
    $scope.form1.boleto.$setViewValue('21890010070014560208200371313180109990127456789');
    $scope.$digest();

    expect($scope.form1.$valid).toBe(true);
    expect($scope.form1.boleto.$valid).toBe(true);
    expect($scope.form1.boleto.$error.vencimentoErrado).toBe(false);
  });

  /*** Testes para comunicado FEBRABAN de n° 082/2012 de 14/06/2012 ***/
  it ('deverá estar válido com código de boleto com vencimento correto', function () {
    $rootScope.vencimento = '2025-02-21';
    $scope.form1.boleto.$setViewValue('21890010070014560208200371313180199990127456789');
    $scope.$digest();

    expect($scope.form1.$valid).toBe(true);
    expect($scope.form1.boleto.$valid).toBe(true);
    expect($scope.form1.boleto.$error.vencimentoErrado).toBe(false);
  });

  it ('deverá estar válido com código de boleto com vencimento correto', function () {
    $rootScope.vencimento = '2025-02-22';
    $scope.form1.boleto.$setViewValue('21890010070014560208200371313180110000127456789');
    $scope.$digest();

    expect($scope.form1.$valid).toBe(true);
    expect($scope.form1.boleto.$valid).toBe(true);
    expect($scope.form1.boleto.$error.vencimentoErrado).toBe(false);
  });

  it ('deverá estar válido com código de boleto com vencimento correto', function () {
    $rootScope.vencimento = '2025-02-23';
    $scope.form1.boleto.$setViewValue('21890010070014560208200371313180110010127456789');
    $scope.$digest();

    expect($scope.form1.$valid).toBe(true);
    expect($scope.form1.boleto.$valid).toBe(true);
    expect($scope.form1.boleto.$error.vencimentoErrado).toBe(false);
  });
  /*** Fim - Testes para comunicado FEBRABAN de n° 082/2012 de 14/06/2012 ***/

  it ('deverá estar válido com código de boleto com vencimento correto', function () {
    $rootScope.vencimento = '2000-07-03';
    $scope.form1.boleto.$setViewValue('21890010070014560208200371313180110000127456789');
    $scope.$digest();

    expect($scope.form1.$valid).toBe(true);
    expect($scope.form1.boleto.$valid).toBe(true);
    expect($scope.form1.boleto.$error.vencimentoErrado).toBe(false);
  });

  it ('deverá estar válido com código de boleto com vencimento correto', function () {
    $rootScope.vencimento = '2015-05-05';
    $scope.form1.boleto.$setViewValue('21890010070014560208200371313180164190000093796');
    $scope.$digest();

    expect($scope.form1.$valid).toBe(true);
    expect($scope.form1.boleto.$valid).toBe(true);
    expect($scope.form1.boleto.$error.vencimentoErrado).toBe(false);
  });

  /*** Testes para datas acima do limite da FEBRABAN
  it ('deverá estar válido com código de boleto com vencimento correto', function () {
    $rootScope.vencimento = '2052-07-09';
    $scope.form1.boleto.$setViewValue('21890010070014560208200371313180199990000093796');
    $scope.$digest();

    expect($scope.form1.$valid).toBe(true);
    expect($scope.form1.boleto.$valid).toBe(true);
    expect($scope.form1.boleto.$error.vencimentoErrado).toBe(false);
  });

  it ('deverá estar válido com código de boleto com vencimento correto', function () {
    $rootScope.vencimento = '2052-07-10';
    $scope.form1.boleto.$setViewValue('21890010070014560208200371313180110000000093796');
    $scope.$digest();

    expect($scope.form1.$valid).toBe(true);
    expect($scope.form1.boleto.$valid).toBe(true);
    expect($scope.form1.boleto.$error.vencimentoErrado).toBe(false);
  });
  */
});