'use strict';

describe('Directive: votePoll', function () {

  // load the directive's module and view
  beforeEach(module('votingApp'));
  beforeEach(module('app/main/votePoll/votePoll.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<vote-poll></vote-poll>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the votePoll directive');
  }));
});