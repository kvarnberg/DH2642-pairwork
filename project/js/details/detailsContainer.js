class DishDetailsContainer{
	constructor(model, root, onAdd, onCancel){
		this.model=model;
		this.root=root;
		this.onAddCallback=onAdd[0];
    this.onAddLabel=onAdd[1];
    this.cancelAction=onCancel[0];
    this.cancelMessage=onCancel[1];
    let currentDish = 0 

		model.addObserver(()=> this.currentDish?this.createDishDisplay(this.currentDish).render(root):null); 
   	}

   	createDishDisplay(dish){
      return h(DishView, {dish: this.currentDish, 
        addControl: [()=>{this.model.addToMenu(this.currentDish); this.onAddCallback()}, this.onAddLabel], 
        onCancel: [()=>{this.cancelAction()}, this.cancelMessage], 
        price: this.model.getPrice(dish), 
        guests: this.model.getNumberOfGuests(), 
        inMenu: this.model.alreadyInMenu(dish)});
	  }

   	render(id){
   		renderPromise(
        model.getDishDetails(id),
   			dish =>{this.currentDish = dish;
          return h("div", this.createDishDisplay(this.currentDish))},
        this.root)
        
   		//h("span", "Here we will show the dish with id: ", id).render(this.root);
   	}
}