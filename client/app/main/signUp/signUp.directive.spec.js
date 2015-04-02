'use strict';

describe('Directive: signUp', function () {

  // load the directive's module and view
  beforeEach(module('votingApp'));
  beforeEach(module('app/main/signUp/signUp.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<sign-up></sign-up>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the signUp directive');
  }));
});