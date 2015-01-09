var FluentConstructor;

FluentConstructor = require("./../lib/fluent.js");

describe("js: fluent interface with constructor funcs", function() {
  Given(function() {
    return this.subject = new FluentConstructor.Customer();
  });
  Given(function() {
    return this.order = this.subject.newOrder();
  });
  describe("creating an order", function() {
    Then(function() {
      return this.order.id === 1;
    });
    return And(function() {
      return this.order.lineItems.length === 0;
    });
  });
  return describe("chaining", function() {
    When(function() {
      return this.order["with"](1, "widget")["with"](2, "pants").skippable()["with"](3, "cows").priorityRush();
    });
    Then(function() {
      return this.order.lineItems.length === 3;
    });
    And(function() {
      return this.order.lineItems[0].id === 1;
    });
    And(function() {
      return this.order.lineItems[0].product === "widget";
    });
    And(function() {
      return this.order.lineItems[0].shouldSkip === false;
    });
    And(function() {
      return this.order.lineItems[1].id === 2;
    });
    And(function() {
      return this.order.lineItems[1].product === "pants";
    });
    And(function() {
      return this.order.lineItems[1].shouldSkip === true;
    });
    And(function() {
      return this.order.lineItems[2].id === 3;
    });
    And(function() {
      return this.order.lineItems[2].product === "cows";
    });
    And(function() {
      return this.order.lineItems[2].shouldSkip === false;
    });
    return And(function() {
      return this.order.priority === true;
    });
  });
});
