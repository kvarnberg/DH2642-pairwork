const Summary = ({ model, useObserver }) => {
  const guests = useObserver("numberOfGuests", model);
  const dishes = useObserver("dishes", model);
  const ingredients = model.getIngredients();

  return h(
    "div",
    {},
    h(
      "button",
      {
        className: "nav",
        onClick: (e) => (window.location.hash = "#search"),
      },
      "Go back"
    ),
    h("div", { className: "fancytext" }, `Dinner for ${guests} people`),
    h("h3", {}, "Shopping list: "),
    h(Ingredients, { ingredients: ingredients, model: model }),
    h(Menu, {
      dishes: dishes,
      guests: guests,
      model: model,
    })
  );
};

const ingRow = (ing, model) => {
  return h(
    "tr",
    { key: ing.name },
    h("td", { className: "text" }, ing.name),
    h("td", { className: "text" }, ing.amount * model.numberOfGuests),
    h("td", { className: "text" }, ing.aisle)
  );
};

const Ingredients = ({ ingredients, model }) => {
  return (
    "div",
    { className: "text" },
    h(
      "table",
      {},
      h(
        "thead",
        {},
        h(
          "tr",
          {},
          h("th", {}, "Name"),
          h("th", {}, "Amount"),
          h("th", {}, "Aisle")
        )
      ),
      h(
        "tbody",
        {},
        ingredients.map((ing) => ingRow(ing, model))
      )
    )
  );
};

const Menu = ({ dishes, guests, model }) => {
  return h(
    "div",
    {},
    h("h3", {}, `TOTAL: ${model.totalPrice()}kr`),
    h("h3", {}, "Menu:"),
    h(
      "div",
      {},
      dishes.map((dish) => {
        return h(
          "div",
          { key: dish.id },
          h("div", { className: "text" }, " - ", dish.title),
          h(
            "div",
            { className: "text" },
            dish.price * guests,
            " kr",
            h(
              "a",
              { className: "text", href: dish.sourceUrl },
              "Link to recipe"
            )
          )
        );
      })
    )
  );
};

// insert explanations later, for table and such
