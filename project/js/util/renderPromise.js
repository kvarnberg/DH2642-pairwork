function renderPromise(promise, hyperscript, node){
    const spinner=createSpinner();
    spinner.render(node);  // clears the node first!
                                                                                                              
    promise
    .then(result=>hyperscript(result).render(node))
    .catch(err=> h("p", "error"+err).render(node))
    .finally();		// kanske inte behövs, men annars ta bort spinner, func removeChild(spinner), node.removeChild(child);
}
function createSpinner(){
    return h("div", h("img", {src:"https://assets.eu.content-cdn.io/css/themes/mjt02012595/images/main/show_loader.gif"}))
}