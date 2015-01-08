DomainObjects      = require "./../lib/order_domain_objects.coffee"
FluentOrderBuilder = require "./../lib/fluent_order_builder.coffee"

describe "fluent interface with api builder object", ->

  Given -> @order   = new DomainObjects.Order(1)
  Given -> @subject = new FluentOrderBuilder(@order)

  describe "creating an order", ->
    Then  -> @order.id == 1
    And   -> @order.lineItems.length == 0
    And   -> @order.priority == false

  describe "chaining", ->
    When ->
      @result = @subject.with(1, "widget")
                        .with(2, "pants").skippable()
                        .with(3, "cows").priorityRush()
                        .build()

    Then  -> @result.lineItems.length == 3
    And   -> @result.lineItems[0].id == 1
    And   -> @result.lineItems[0].product == "widget"
    And   -> @result.lineItems[0].shouldSkip == false

    And   -> @result.lineItems[1].id == 2
    And   -> @result.lineItems[1].product == "pants"
    And   -> @result.lineItems[1].shouldSkip == true

    And   -> @result.lineItems[2].id == 3
    And   -> @result.lineItems[2].product == "cows"
    And   -> @result.lineItems[2].shouldSkip == false
    And   -> @result.priority == true
