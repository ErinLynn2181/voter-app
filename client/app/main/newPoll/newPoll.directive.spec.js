'use strict';

describe('Directive: newPoll', function () {

  // load the directive's module and view
  beforeEach(module('votingApp'));
  beforeEach(module('app/main/newPoll/newPoll.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<new-poll></new-poll>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the newPoll directive');
  }));
});