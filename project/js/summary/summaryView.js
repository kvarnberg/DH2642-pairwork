function SummaryView({ingredients, guests,  whenDone:[doneCallback, doneMessage]}){
    return h("div",
            h("button", {onClick: doneCallback, label:doneMessage, style:"float:right"}, "Back to search"),
                h("div", "Dinner for " + guests + ' people'),
                h("table", {border:1},
                    h("tr",
                        h("th", "Menu :"),h("th", "Shoppinglist :"), h("th", "Aisle :"), h("th", "Total price :")),
                    h("tr",
                        h("td", model.getMenu().map(dish =>(displayMenu(dish)))),
                        h("td", ingredients.map(ing => (displayShopping(ing)))),
                        h("td", ingredients.map(ing => (h("li", ing.aisle)))),
                        h("td", displayTotalPrice())
                        )
                    )
                )

        function displayMenu(dish){
            return h("li", h("a", {href:dish.sourceUrl}, dish.title))

        }

        function displayShopping(item){
            return h("li", (item.amount*guests).toFixed(2)+' ' + item.name)
        }

        function displayTotalPrice(){
            let dishes = model.getMenu()
            let price = model.totalPrice(dishes)
            return price.toFixed(2)
        }
}