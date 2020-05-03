class Search extends React.Component {
  constructor(props) {
    super(props);
    this.model = props.model;
    this.state = {
      textControl: "",
      typeControl: "",
    };

    this.createDishDisplay = this.createDishDisplay.bind(this);
  }

  setText = (e) => {
    e.preventDefault();
    this.setState({ textControl: e.target.value });
  };

  setType = (e) => {
    e.preventDefault();
    this.setState({ typeControl: e.target.value });
  };

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
        <SummaryShow />
        <Form
          typeControl={this.state.typeControl}
          setText={this.setText}
          setType={this.setType}
          getSearch={this.getSearch}
        />
        <span>{this.getSearch()}</span>
      </div>
    );
  }
}
