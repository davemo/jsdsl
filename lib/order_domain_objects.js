Customer = function() {
  this.orders = [];
};

Order = function(id) {
  this.id = id;
  this.lineItems = [];
  this.priority = false;
};

LineItem = function(id, order, product) {
  this.id = id;
  this.shouldSkip = false;
  this.product = product;
};

if(module) {
  module.exports = {
    Customer: Customer,
    Order: Order,
    LineItem: LineItem
  };
}
