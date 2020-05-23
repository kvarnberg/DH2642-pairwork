class App extends React.Component {
  constructor() {
    super();

    /*const modelString = localStorage.getItem("dinnerModel");
    let modelObject = JSON.parse(modelString);
    if (modelObject === undefined) {
      modelObject = {};
    }
    this.model = new DinnerModel(modelObject.guests, modelObject.dishes);*/
    const modelString = localStorage.getItem("dinnerModel");
    if (modelString) {
      console.log("modelstring exists");
      const modelObject = JSON.parse(modelString);
      if (modelObject) {
        this.model = new DinnerModel(modelObject.guests, modelObject.dishes);
      } else {
        this.model = new DinnerModel();
      }
    }
    this.state = {
      guests: this.model.getNumberOfGuests(),
      menu: this.model.getMenu(),
    };
  }

  useObserver = (prop, model) => {
    // a normal function, NOT component!
    const [value, setValue] = React.useState(model[prop]); // m["k"] === m.k!
    React.useEffect(() => {
      const obs = () => setValue(model[prop]);
      model.addObserver(obs);
      return () => model.removeObserver(obs);
    }, [model, prop]);
    return value;
  };

  updateMenu() {
    this.state = { menu: this.model.getMenu() };
  }

  componentDidMount = () => {
    if (!window.location.hash) {
      window.location.hash = "#search";
    }
  };

  render() {
    return <Router model={this.model} useObserver={this.useObserver} />;
  }
}
