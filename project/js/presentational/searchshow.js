const SearchShow = () => {
  return (
    <button
      className="nav button"
      onClick={(e) => (window.location.hash = "#search")}
    >
      Show search
    </button>
  );
};
