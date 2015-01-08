def("app.directive.saysHi", {
  restrict: 'E',
  link: function(scope, element, attributes) {
    scope.message = attributes.message;
  }
});
