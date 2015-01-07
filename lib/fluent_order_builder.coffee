OrderDomainObjects = require "./order_domain_objects.coffee"

Order    = OrderDomainObjects.Order
LineItem = OrderDomainObjects.LineItem

class FluentOrderBuilder
  constructor: ->
    @order = new Order(1)

  with: (lineItemId, product) ->
    l = new LineItem(lineItemId, product)
    @order.lineItems.push(l)
    @

  priorityRush: ->
    @order.priority = true
    @

  skippable: ->
    @order.lineItems[@order.lineItems.length - 1].shouldSkip = true
    @

  build: -> @order

module?.exports = FluentOrderBuilder
