const Sidebar = ({ model, useObserver }) => {
  const num = useObserver("numberOfGuests", model);
  const dishes = useObserver("dishes", model);
  return h(
    "div",
    { className: "sidebar debug" },
    h(NumberPresentational, {
      num: num,
      setNum: React.useCallback((x) => model.setNumberOfGuests(x), [model]),
    }),
    h(SidebarDishes, { dishes: dishes, model: model, num: num })
  );
};

const NumberPresentational = ({ num, setNum }) => {
  return h(
    "div",
    null,
    h("p", {}, "Guests: "),
    h("button", { onClick: (e) => setNum(num - 1), disabled: num <= 1 }, "-"),
    num,
    h("button", { onClick: (e) => setNum(num + 1) }, "+")
  );
};

const dishDisplay = (dish, model, num) => {
  return h(
    "tr",
    { key: dish.id },
    h("td", {}, dish.title),
    h("td", {}, (dish.price * num).toFixed(2)),
    h(
      "td",
      {},
      h(
        "button",
        { className: "button", onClick: (event) => model.remove(dish) },
        "x"
      )
    )
  );
};

const SidebarDishes = ({ dishes, model, num }) => {
  return h(
    "div",
    {},
    h("p", {}, "Menu: "),
    h(
      "table",
      {},
      h("thead", {}),
      h(
        "tbody",
        {},
        model.getMenu().map((dish) => dishDisplay(dish, model, num)),
        h(
          "tr",
          {},
          h("td", {}, "Total:"),
          h("td", {}, model.totalPrice(dishes)),
          h("td", {}, "kr")
        )
      )
    )
  );
};
