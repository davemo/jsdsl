class Customer
  constructor: ->
    @orders = []

class Order
  constructor: (@id) ->
    @lineItems = []
    @priority = false

class LineItem
  constructor: (@id, @product) ->
    @shouldSkip = false

module?.exports = {Customer, Order, LineItem}
