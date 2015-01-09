var DomainObjects, FluentOrderBuilder;

DomainObjects = require("./../lib/order_domain_objects.js");

FluentOrderBuilder = require("./../lib/fluent_order_builder.js");

describe("js: fluent interface with api builder object", function() {
  Given(function() {
    return this.order = new DomainObjects.Order(1);
  });
  Given(function() {
    return this.subject = new FluentOrderBuilder(this.order);
  });
  describe("creating an order", function() {
    Then(function() {
      return this.order.id === 1;
    });
    And(function() {
      return this.order.lineItems.length === 0;
    });
    return And(function() {
      return this.order.priority === false;
    });
  });
  return describe("chaining", function() {
    When(function() {
      return this.result = this.subject["with"](1, "widget")["with"](2, "pants").skippable()["with"](3, "cows").priorityRush().build();
    });
    Then(function() {
      return this.result.lineItems.length === 3;
    });
    And(function() {
      return this.result.lineItems[0].id === 1;
    });
    And(function() {
      return this.result.lineItems[0].product === "widget";
    });
    And(function() {
      return this.result.lineItems[0].shouldSkip === false;
    });
    And(function() {
      return this.result.lineItems[1].id === 2;
    });
    And(function() {
      return this.result.lineItems[1].product === "pants";
    });
    And(function() {
      return this.result.lineItems[1].shouldSkip === true;
    });
    And(function() {
      return this.result.lineItems[2].id === 3;
    });
    And(function() {
      return this.result.lineItems[2].product === "cows";
    });
    And(function() {
      return this.result.lineItems[2].shouldSkip === false;
    });
    return And(function() {
      return this.result.priority === true;
    });
  });
});
