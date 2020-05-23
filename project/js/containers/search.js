class Search extends React.Component {
  constructor(props) {
    super(props);
    this.model = props.model;
    this.state = {
      textControl: "",
      typeControl: "",
    };
  }

  update() {
    this.setState({
      textControl: document.getElementById("textControl").value,
      typeControl: document.getElementById("typeControl").value,
    });
  }

  createDishDisplay(dish) {
    return (
      <span
        className="dishDisplay"
        key={dish.id}
        id={dish.id}
        title={dish.title}
        onClick={(e) => {
          this.model.setClicked(dish.id);
          window.location.hash = "#details";
        }}
      >
        <img src={`https://spoonacular.com/recipeImages/${dish.image}`}></img>
        <div>{dish.title}</div>
      </span>
    );
  }

  getSearch = () => {
    return (
      <RenderPromise
        promise={this.model.searchDishes(
          this.state.typeControl,
          this.state.textControl
        )}
        renderData={({ data }) =>
          data.map((dish) => this.createDishDisplay(dish))
        }
      />
    );
  };

  render() {
    return (
      <div>
        <p className="fancytext">Dinner planner</p>
        <div>
          <input
            className="input"
            placeholder="Search term..."
            id="textControl"
          />
          <select id="typeControl">
            <option value="">Choose type:</option>
            {["starter", "main course", "dessert"].map((opt) =>
              h("option", { value: opt, key: opt }, opt)
            )}
          </select>
          <button onClick={() => this.update()}>Search</button>
        </div>
        <div>
          <span>{this.getSearch()}</span>
        </div>
        <SummaryShow />
      </div>
    );
  }
}
