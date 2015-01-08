var __slice = [].slice;

window.def = _(extend).wrap(function() {
  var args, ex, namespace, target;
  ex = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
  namespace = args[0], target = args[1];
  if (typeof target !== "object") {
    target.prototype.namespacePath = namespace;
  }
  return ex.apply(this, args);
});
