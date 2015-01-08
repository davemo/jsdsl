(function() {

  var templatePathForDirective = function(camelCasedDirectiveName) {
    var snakeCased = _.str.underscored(camelCasedDirectiveName);
    return "/examples/angular_autowire/directives/" + snakeCased + ".html";
  };

  window.autowireAngularObjects = function(moduleName , objectType, name, fn) {
    if(_.contains(['controller', 'service', 'provider', 'factory'], objectType)) {
      angular.module(moduleName)[objectType](name, fn);
    }

    if(objectType === 'config' || objectType === 'run') {
      angular.module(moduleName)[objectType](fn);
    }

    if(objectType === 'directive') {
      if (_.isFunction(fn)) {
        angular.module(moduleName).directive(name, fn);
      } else {
        angular.module(moduleName)[objectType](name, function() {
          fn.replace = true;
          fn.templateUrl = templatePathForDirective(name);
          return fn;
        });
      }
    }
  };

  window.def = _(extend).wrap(function() {
    var ex         = arguments[0];
    var args       = 2 <= arguments.length ? [].slice.call(arguments, 1) : [];
    var namespace  = args[0], target = args[1];
    var segments   = namespace.split(".");
    var moduleName = segments[0];
    var objectType = segments[1];
    var targetName = _.last(segments);

    autowireAngularObjects(moduleName, objectType, targetName, target);

    return ex.apply(this, args);
  });

})();
