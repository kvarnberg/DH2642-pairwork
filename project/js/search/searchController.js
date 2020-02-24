class SearchController{
    constructor(model, root, whenDone, onAdd){
        const view= new SearchView(model, root, whenDone);
		view.render();
		document.getElementById("button").addEventListener("click", e=>{view.updateSearchResults()});

		root.lastElementChild.firstElementChild.nextElementSibling.addEventListener("click", e=>{
			
			var id = view.isDishRepresentation(event.target); 
			if (typeof id == "string"){
				onAdd(id)
			};
		})	
    }
   
}
