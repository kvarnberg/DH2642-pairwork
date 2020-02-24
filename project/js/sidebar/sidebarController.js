class SidebarController{
    constructor(model, root){
        new SidebarView(model, root, dish=>model.remove(dish)).render();
        
        /*const plusButton= document.getElementById("plusButton"); 			// document.getElementById("plusButton");
		plusButton.addEventListener("click", function(event){
    		model.setNumberOfGuests(model.getNumberOfGuests()+1)
		});

		const minusButton= document.getElementById("minusButton"); 				//document.getElementById("minusButton");
		minusButton.addEventListener("click", function(event){
			model.setNumberOfGuests(model.getNumberOfGuests()-1)
		});
		*/

		const sidebar = document.getElementById("sidebar");
		sidebar.addEventListener("click", e=>{
			if (e.target.classList.contains("minusButton")){
				model.setNumberOfGuests(model.getNumberOfGuests()-1)
			}
			else if (e.target.classList.contains("plusButton")){
				model.setNumberOfGuests(model.getNumberOfGuests()+1)
			}
		});
    }
}