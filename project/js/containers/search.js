class Search extends React.Component {
  constructor(props) {
    super(props);
    this.model = props.model;
    this.state = {
      textControl: "",
      typeControl: "",
      load: false,
      data: [],
    };

    this.setText = this.setText.bind(this);
    this.setType = this.setType.bind(this);
    this.createDishDisplay = this.createDishDisplay.bind(this);
    this.getSearch = this.getSearch.bind(this);
  }

  setText(e) {
    this.setState({ textControl: e.target.value });
  }

  setType(e) {
    this.setState({ typeControl: e.target.value });
  }

  createDishDisplay(dish) {
    return (
      <span
        className="dishDisplay"
        id={dish.id}
        title={dish.title}
        onClick={(event) => {
          this.model.setClicked(dish.id);
        }}
      >
        <img src={`https://spoonacular.com/recipeImages/${dish.image}`}></img>
        <div>{dish.title}</div>
      </span>
    );
  }

  getSearch = async (e) => {
    this.setState({ loading: true });
    e.preventDefault();
    const results = this.model.searchDishes(
      this.state.typeControl,
      this.state.textControl
    );
    results.then((obj) => {
      this.setState({ data: obj });
    });
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
        {this.state.load ? (
          <LoadingSpinner />
        ) : (
          this.state.data.map((dish) => this.createDishDisplay(dish))
        )}
      </div>
    );
  }
}
