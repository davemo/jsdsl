class Customer
  orders: []

  newOrder: ->
    o = new Order(1)
    @orders.push(o)
    o

class Order
  lineItems: []
  priority: false

  constructor: (@id) ->

  with: (lineItemId, productId) ->
    l = new LineItem(lineItemId, @, productId)
    @lineItems.push(l)
    l

  priorityRush: ->
    @priority = true
    @

class LineItem
  constructor: (@id, @order, @product) ->

  with: (lineItemId, productId) ->
    @order.with.call(@order, lineItemId, productId)

  skippable: ->
    @shouldSkip = true
    @

  priorityRush: ->
    @order.priorityRush.call(@order)

class Product
  constructor: (@id) ->

# // customer.newOrder()
# // .with(6, "TAL")
# // .with(5, "HPK").skippable()
# // .with(3, "LGV")
# // .priorityRush();
