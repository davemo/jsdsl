FluentConstructor = require "./../lib/fluent.js"

describe "fluent interface with constructor funcs", ->

  Given -> @subject = new FluentConstructor.Customer()
  Given -> @order   = @subject.newOrder()

  describe "creating an order", ->
    Then  -> @order.id == 1
    And   -> @order.lineItems.length == 0

  describe "chaining", ->
    When ->
      @order.with(6, "TAL")
            .with(5, "HPK").skippable()
            .with(3, "LGV")
            .priorityRush()

    Then  -> @order.lineItems.length == 3
    And   -> @order.lineItems[0].id == 6
    And   -> @order.lineItems[0].product == "TAL"
    And   -> @order.lineItems[0].shouldSkip == false

    And   -> @order.lineItems[1].id == 5
    And   -> @order.lineItems[1].product == "HPK"
    And   -> @order.lineItems[1].shouldSkip == true

    And   -> @order.lineItems[2].id == 3
    And   -> @order.lineItems[2].product == "LGV"
    And   -> @order.lineItems[2].shouldSkip == false

    And   -> @order.priority == true
