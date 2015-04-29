'use strict';

describe('Directive: myResults', function () {

  // load the directive's module and view
  beforeEach(module('votingApp'));
  beforeEach(module('app/main/myResults/myResults.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<my-results></my-results>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the myResults directive');
  }));
});