Customer = function() {
  this.orders = [];
  this.newOrder = function() {
    var o = new Order(1);
    this.orders.push(o);
    return o;
  };
};

Order = function(id) {
  this.id = id;
  this.lineItems = [];
  this.priority = false;

  this.with = function(lineItemId, product) {
    var l = new LineItem(lineItemId, this, product);
    this.lineItems.push(l);
    return this;
  };

  this.priorityRush = function() {
    this.priority = true;
    return this;
  };

  this.skippable = function() {
    this.lineItems[this.lineItems.length - 1].shouldSkip = true;
    return this;
  };
};

LineItem = function(id, order, product) {
  this.id = id;
  this.shouldSkip = false;
  this.product = product;
};

if (typeof module !== "undefined" && module !== null) {
  module.exports = {
    Customer: Customer,
    Order: Order,
    LineItem: LineItem
  };
}
