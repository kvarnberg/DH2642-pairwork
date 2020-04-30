const Form = ({ typeControl, setText, setType, getSearch }) => (
  <div>
    <form onSubmit={getSearch}>
      <input type="text" onChange={setText} />
      <select value={typeControl} onChange={setType}>
        <option value="">Choose type: </option>
        <option value="starter">starter</option>
        <option value="main course">main course</option>
        <option value="dessert">dessert</option>
      </select>
      <button className="button">Search</button>
    </form>
  </div>
);
