'use strict';

/***********************************************************************************************************************************************
 * NG-REPEAT WHILE
 ***********************************************************************************************************************************************
 * @description Will print DOM on the page as ng-repeat while the provided expression evaluates to true.
 */
app.directive('ngRepeatWhile', function($parse, $compile) {

  return  {
    restrict: 'A',
    scope: true,
    link: function ($scope, $element, $attrs) {
        var counter = $parse($attrs.ngRepeatWhile)($scope);
        for(var i = 0; i < counter; i++) {
            var monster = "<div class=\"boxHeader\">" + $scope.friend.name + "</div>" +
            "<img src=" + $scope.friend.img + " width=\"35%\">"+
            "<p>DMG per second:</p><span>" + $scope.friend.ups + "</span>";
            $element.append(monster);
        }
    }
  }
}); 