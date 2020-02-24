class SearchView{
	constructor(model, root, whenDone){
        this.root=root;
        this.model=model;
        this.doneCallback=whenDone[0];
        this.doneMessage=whenDone[1];
    }
    render(){
    	h("div",
    		h("div",       
            	this.textControl = h("input"),   
            	this.typeControl = h("select", 
                    h("option", {value:""}, "Choose:"), 
                    ["starter", "main course", "dessert"].map(opt=>(h("option", {value:opt}, opt)))),
            	h("button", {id:"button"}, "Search!"),
                h("button", {onClick: event=>show("summary"), style:"float:right"}, "Show summary")
            ),
       		this.resultDiv= h("div")
       	).render(this.root);

    	this.updateSearchResults();
    }

    updateSearchResults(){
        renderPromise(
            this.model.searchDishes(this.typeControl.value, this.textControl.value), 
            dishes=>(h("div", {className:"dishDiv"}, dishes.map(dish => this.createDishDisplay(dish)))),
            this.resultDiv)
    }

    createDishDisplay(dish){
        return h("span", {className:"dishDisplay", id:dish.id, title:dish.title}, h("img",{src:"https://spoonacular.com/recipeImages/" + dish.image}), dish.title);
    }

    isDishRepresentation(clickedNode){
        if (clickedNode.classList.contains("dishDisplay")){     // && confirm("Add " + clickedNode.title + " to menu?")
            // return clickedNode.id; 
            return clickedNode.id    
        }
        else if(clickedNode.parentNode.classList.contains("dishDisplay")){    // 
            // return clickedNode.parentNode.id;  
            return clickedNode.parentNode.id   
        }
        else{
            return null 
        }
    }
}