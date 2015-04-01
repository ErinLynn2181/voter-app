'use strict';

describe('Directive: newPollPosted', function () {

  // load the directive's module and view
  beforeEach(module('votingApp'));
  beforeEach(module('app/main/newPollPosted/newPollPosted.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<new-poll-posted></new-poll-posted>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the newPollPosted directive');
  }));
});