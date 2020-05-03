/*function renderPromise(promise, hyperscript, node){
    const spinner=createSpinner();
    spinner.render(node);  // clears the node first!
                                                                                                              
    promise
    .then(result=>hyperscript(result).render(node))
    .catch(err=> h("p", "error"+err).render(node))
    .finally();		// kanske inte behövs, men annars ta bort spinner, func removeChild(spinner), node.removeChild(child);
}
function createSpinner(){
    return h("div", h("img", {src:"https://assets.eu.content-cdn.io/css/themes/mjt02012595/images/main/show_loader.gif"}))
}*/

function RenderPromise({ promise, renderData }) {
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    setData(null);
    promise.then((x) => setData(x)).catch((err) => setData({ error: err }));
  }, [promise]); // TODO: return cancel promise on unmount

  return (
    (data === null &&
      h("img", {
        src:
          "https://assets.eu.content-cdn.io/css/themes/mjt02012595/images/main/show_loader.gif",
      })) ||
    (data !== null && !data.error && h(renderData, { data })) ||
    (data !== null && data.error && h("div", {}, data.error.toString()))
  );
}
