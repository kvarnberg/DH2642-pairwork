function DishView({dish,
    addControl:[addAction, addMessage], 
    onCancel:[cancelAction, cancelMessage], 
    price, 
    guests, 
    inMenu}){

	function ingreds(dish){
		return dish.extendedIngredients.map(ingr => h("li",ingr.name));
	}
	const disableAdd = inMenu? "true": undefined;

	return h("div",
		h("div",
			h("button", {onClick:addAction, label:addMessage, style:"float:right", disabled:disableAdd}, "Add"),
			h("button", {onClick:cancelAction, label:cancelMessage, style:"float:right"}, "Cancel")),
		h("div",
			h("h2", dish.title),
			h("p", "Price for "+guests+" guests: "+price*guests),
			h("p", "Type: "+dish.dishTypes),
			h("div",
			h("img", {src:dish.image}),
			h("ul", ingreds(dish)),
			h("p", "Recipe: "+dish.instructions),
			h("a", {href:dish.sourceUrl}, "More details"))));

}
