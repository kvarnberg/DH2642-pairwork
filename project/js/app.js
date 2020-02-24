const model = new DinnerModel()

// React:

const DinnerPlanner=()=>h("div", {},
	  h("div", {}, 
      h(Sidebar, {model})),
		h("div", {}, h(Summary, {model}), h(Search)));
	
const Sidebar=({model})=>{                 
   const num= useObserver("numberOfGuests", model); 
   return h(NumberPresentational, {num, setNum:n=>model.setNumberOfGuests(n)});};

const NumberPresentational=({num, setNum})=>{
    return h("div", null, 
      h("button", {onClick:e=>setNum(num-1), disabled:num<=1}, "-"),
      num,
      h("button", {onClick:e=>setNum(num+1)}, "+"));};

const Search=()=>h("div", {}, 
  h(SearchHeader));

const SearchHeader=()=>h("div", {}, "Input and search here");

const Summary=({model})=><span>Dinner for {useObserver("numberOfGuests", model)}</span>;

const useObserver=(prop, model)=>{  // a normal function, NOT component!
   const[value, setValue]= React.useState(model[prop]);  // m["k"] === m.k! 
   React.useEffect(()=>{
         const obs= ()=> setValue(model[prop]);
         model.addObserver(obs);
         return ()=> model.removeObserver(obs);
   }, [model, prop]);
   return value;
};  