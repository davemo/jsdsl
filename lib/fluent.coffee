class Customer
  constructor: ->
    @orders = []

  newOrder: ->
    o = new Order(1)
    @orders.push(o)
    o

class Order
  constructor: (@id) ->
    @lineItems = []
    @priority = false

  with: (lineItemId, product) ->
    l = new LineItem(lineItemId, product)
    @lineItems.push(l)
    @

  skippable: ->
    @lineItems[@lineItems.length - 1].shouldSkip = true;
    @

  priorityRush: ->
    @priority = true
    @

class LineItem
  constructor: (@id, @product) ->
    @shouldSkip = false

module?.exports = {Customer, Order, LineItem}
