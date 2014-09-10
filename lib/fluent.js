Customer = function() {
  this.orders = [];
  this.newOrder = function() {
    var o = new Order(1);
    this.orders.push(o);
    return o;
  };
};

Order = function(id) {
  var self = this;
  this.id = id;
  this.lineItems = [];
  this.priority = false;

  this.with = function(lineItemId, productId) {
    var l = new LineItem(lineItemId, self, productId);
    this.lineItems.push(l);
    return l;
  };

  this.priorityRush = function() {
    self.priority = true;
    return self;
  };

  this.skippable = function() {
    self.shouldSkip = true;
    return self;
  };
};

LineItem = function(id, order, product) {
  var self = this;
  this.id = id;
  this.shouldSkip = false;
  this.product = product;

  this.with = function(lineItemId, productId) {
    return order.with.call(order, lineItemId, productId);
  };

  this.skippable = function() {
    return order.skippable.call()
    return self;
  };

  this.priorityRush = function() {
    return order.priorityRush.call(order);
  };
};

Product = function(id) {
  this.id = id;
};

// customer.newOrder()
//                 .with(6, "TAL")
//                 .with(5, "HPK").skippable()
//                 .with(3, "LGV")
//                 .priorityRush();
