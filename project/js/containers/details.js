const Details = ({ model, useObserver }) => {
  const clicked = useObserver("clickedDish", model);
  console.log(clicked);

  return h(
    "div",
    {},
    <button
      className="nav button"
      onClick={(e) => (window.location.hash = "#search")}
    >
      Go back
    </button>,
    h(RenderGroups, { model: model, id: clicked, useObserver: useObserver })
  );
};

const RenderGroups = ({ model, id, useObserver }) =>
  h(renderPromise, {
    promise: model.getDishDetails(id),
    model: model,
    useObserver: useObserver,
  });

const renderPromise = ({ promise, model, useObserver }) => {
  const [promiseResult, setData] = React.useState(null);
  const [abort, setAbort] = React.useState(false);
  React.useEffect(() => {
    promise.then((x) => setData(x)).catch((err) => setData({ error: err }));
    return () => setAbort(true);
  }, [promise]); // TODO: return cancel promise on unmount

  return (
    !abort &&
    ((promiseResult === null &&
      h("img", { src: "http://www.csc.kth.se/~cristi/loading.gif" })) ||
      (promiseResult !== null &&
        !promiseResult.error &&
        h(DishDetails, { model, dish: promiseResult, useObserver })) ||
      (promiseResult !== null &&
      promiseResult.error && // promise error
        h("div", {}, promiseResult.error.toString())))
  );
};

const DishDetails = ({ model, dish, useObserver }) => {
  const guests = useObserver("numberOfGuests", model);
  const menu = useObserver("dishes", model);
  const inMenu = model.alreadyInMenu(dish);
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
        model.getPrice(dish) * guests +
        ":-"
    ),
    h(
      "button",
      {
        className: "addButton",
        disabled: inMenu === true,
        onClick: (event) => model.addToMenu(dish),
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
};
