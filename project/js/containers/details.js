class Details extends React.Component {
  constructor(props) {
    super(props);
    const model = props.model;
    const useObserver = props.useObserver;
  }

  render() {
    return h(
      "div",
      {},
      "hello",
      <button
        className="nav button"
        onClick={(e) => (window.location.hash = "#search")}
      >
        Go back
      </button>
    );
  }
}
