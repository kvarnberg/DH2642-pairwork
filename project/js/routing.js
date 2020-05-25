const Router = ({ model, useObserver }) => {
  const [router, setRouter] = React.useState(window.location.hash);

  React.useEffect(() => {
    const listener = () => setRouter(window.location.hash);
    window.addEventListener("hashchange", listener);
    return () => window.removeEventListener("hashchange", listener);
    // window.onhashchange = () => setRouter(window.location.hash);
  }, []);

  return h(
    "div",
    { className: "flexParent" },
    h(Sidebar, { model: model, useObserver: useObserver }),
    h(
      "div",
      { className: "mainContent debug" },
      (router === "#search" && h(Search, { model: model })) ||
        (router === "#summary" &&
          h(Summary, { model: model, useObserver: useObserver })) ||
        (router === "#details" &&
          h(Details, { model: model, useObserver: useObserver })) ||
        h("div", {}, "error")
    )
  );
};
