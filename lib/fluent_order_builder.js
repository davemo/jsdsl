var OrderDomainObjects = require("./order_domain_objects.js");

var Order    = OrderDomainObjects.Order;
var LineItem = OrderDomainObjects.LineItem;

FluentOrderBuilder = function() {

  var order = new Order(1);

  this.with = function(lineItemId, product) {
    var l = new LineItem(lineItemId, order.id, product);
    order.lineItems.push(l);
    return this;
  };

  this.priorityRush = function() {
    order.priority = true;
    return this;
  };

  this.skippable = function() {
    order.lineItems[order.lineItems.length - 1].shouldSkip = true;
    return this;
  };

  this.build = function() {
    return order;
  };

};

if (typeof module !== "undefined" && module !== null) {
  module.exports = FluentOrderBuilder;
}
