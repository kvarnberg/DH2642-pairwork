class Details extends React.Component {
  constructor(props) {
    super(props);
    this.model = props.model;
    this.useObserver = props.useObserver;
    this.state = {
      id: this.useObserver("clickedDish", this.model),
      guests: this.props.model.getNumberOfGuests(),
    };
  }

  createDishDisplay(dish) {
    const inMenu = this.model.alreadyInMenu(dish);
    const guests = this.useObserver("guests", this.model);
    return h(
      "div",
      {},
      h("h2", { className: "text" }, dish.title),
      h(
        "div",
        { className: "text" },
        "Price for " +
          guests +
          " guest(s): " +
          this.model.getPrice(dish) * guests +
          ":-"
      ),
      h(
        "button",
        {
          className: "addButton",
          disabled: inMenu === true,
          onClick: (event) => this.model.addToMenu(dish),
        },
        "Add to menu"
      ),
      h("div", {}, h("img", { src: dish.image })),
      h(
        "div",
        {},
        h(
          "table",
          {},
          h(
            "thead",
            {},
            h(
              "tr",
              {},
              h("th", { className: "text" }, "Ingredient:"),
              h(
                "th",
                { className: "text" },
                "Amount for " + guests + " guest(s):"
              )
            )
          ),
          h(
            "tbody",
            {},
            dish.extendedIngredients.map((ingredient) => {
              return h(
                "tr",
                { key: ingredient.name },
                h("td", { className: "text" }, ingredient.name),
                h("td", { className: "text" }, ingredient.amount * guests)
              );
            })
          )
        )
      ),
      h("h3", { className: "text" }, "Instructions"),
      h("p", { className: "text" }, dish.instructions),
      h("a", { className: "text", href: dish.sourceUrl }, "See more")
    );
  }

  render() {
    return h(
      "div",
      {},
      <button
        className="nav button"
        onClick={(e) => (window.location.hash = "#search")}
      >
        Go back
      </button>,
      h(
        "div",
        {},
        <RenderPromise
          promise={this.model.getDishDetails(this.currentDish)}
          renderData={({ data }) => h("div", {}, this.createDishDisplay(data))}
        />
      )
    );
  }
}
