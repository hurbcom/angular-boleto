'use strict';

describe('Testando Filters:', function() {
  var $filter;

  beforeEach(function() {
    module('angular.boleto');
  });

  beforeEach(inject(function($injector) {
    $filter = $injector.get('$filter');
  }));

  it('$filter deve estar definido', function() {
    expect($filter).toBeDefined();
  });

  describe('utc:', function() {
    it('0-utc deve estar definido', function() {
      expect($filter('utc')).toBeDefined();
    });

    it('1-utc', function() {
      var dateStr = '2014-09-01T00:00:00Z';
      var date = $filter('date')(dateStr, 'dd/MM/yyyy');
      var dateUTC = $filter('utc')(dateStr);
      var dateOK = $filter('date')(dateUTC, 'dd/MM/yyyy');

      expect(date).toBe('31/08/2014');
      expect(+dateUTC).toBe(1409540400000);
      expect(dateOK).toBe('01/09/2014');
    });

    it('2-utc', function() {
      var dateStr = '2014-09-01T00:00:00Z';
      var dateUTC = $filter('utc')(dateStr, 'dd/MM/yyyy');

      expect(dateUTC).toBe('01/09/2014');
    });
  });

  describe('boleto:', function() {
    it('0-boleto deve estar definido', function() {
      expect($filter('boleto')).toBeDefined();
    });

    it('1-boleto', function() {
      var boleto = '21890010070014560208200371313180159470127456789';
      var boletoFormatado = $filter('boleto')(boleto);

      expect(boletoFormatado).toBe('21890.01007 00145.602082 00371.313180 1 59470127456789');
    });

    it('2-boleto', function() {
      var boleto = '';
      var boletoFormatado = $filter('boleto')(boleto);

      expect(boletoFormatado).toBe('');
    });

    it('3-boleto', function() {
      var boleto = undefined;
      var boletoFormatado = $filter('boleto')(boleto);

      expect(boletoFormatado).toBe('');
    });

    it('4-boleto', function() {
      var boleto = null;
      var boletoFormatado = $filter('boleto')(boleto);

      expect(boletoFormatado).toBe('');
    });

    it('5-boleto', function() {
      var boleto = null;
      var boletoFormatado = $filter('boleto')(boleto, 'Não existe boleto');

      expect(boletoFormatado).toBe('Não existe boleto');
    });
  });
});