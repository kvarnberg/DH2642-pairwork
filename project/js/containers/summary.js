const Summary = ({ model, useObserver }) => {
  const guests = useObserver("numberOfGuests", model);
  const dishes = useObserver("dishes", model);
  const ingredients = model.getIngredients();

  return (
    <div>
      <SearchShow />
      {h("div", {}, "Dinner for " + guests + " people")}
    </div>
  );
};
