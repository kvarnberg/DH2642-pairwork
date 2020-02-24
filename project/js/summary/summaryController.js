class SummaryController{
    constructor(model, root, whenDone){
		const update= ()=> h(SummaryView, {ingredients:model.getIngredients(), guests:model.getNumberOfGuests(), whenDone}).render(root);  
		model.addObserver(update);
      	update(); 
    }
}