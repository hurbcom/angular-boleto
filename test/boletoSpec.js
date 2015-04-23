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
      '<input-boleto ng-model="$parent.payment_bank_slip" validar-valor="$parent.total_invoice_amount_selected" form="form1" name="boleto"></input-boleto>' +
      '</ng-form>{{$parent}}';

    $scope.element = $compile(element)($scope);
  }));

  it ('deverá substituir elemento com o HTML certo', function () {
    expect($scope.element.html()).toContain('<input type="text" ui-mask="?99999.99999 99999.999999 99999.999999 9 99999999999999" placeholder="_____._____ _____.______ _____.______ _ ______________" ng-model="$parent.payment_bank_slip" validar-valor="$parent.total_invoice_amount_selected" form="form1" name="boleto" class="ng-isolate-scope ng-pristine ng-valid">');
  });

  it ('deverá estar válido com código de boleto válido', function () {
    $rootScope.total_invoice_amount_selected = 0.00;
    $scope.form1.boleto.$setViewValue('10491504263100090855355227287939364140000000000');
    $scope.$digest();

    expect($scope.form1.$valid).toBe(true);
    expect($scope.form1.boleto.$valid).toBe(true);
  });

  it ('deverá estar válido com código de boleto válido', function () {
    $rootScope.total_invoice_amount_selected = 934.23;
    $scope.form1.boleto.$setViewValue('10491443385511900000200000000141325230000093423');
    $scope.$digest();

    expect($scope.form1.$valid).toBe(true);
    expect($scope.form1.boleto.$valid).toBe(true);
  });

  it ('deverá estar inválido com código de boleto com valor errado', function () {
    $rootScope.total_invoice_amount_selected = 1274567.89;
    $scope.form1.boleto.$setViewValue('21890010070014560208200371313180100000987654321');
    $scope.$digest();

    expect($scope.form1.$valid).toBe(false);
    expect($scope.form1.boleto.$valid).toBe(false);
    expect($scope.form1.boleto.$error.valorErrado).toBe(true);
  });

  it ('deverá estar válido com código de boleto com valor correto', function () {
    $rootScope.total_invoice_amount_selected = 1274567.89;
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

});