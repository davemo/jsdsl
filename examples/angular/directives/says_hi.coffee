def "app.directive.saysHi",
  restrict: 'E'
  link: (scope, element, attributes) ->
    scope.message = attributes.message
