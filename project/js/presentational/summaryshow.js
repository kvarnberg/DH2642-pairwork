const SummaryShow = () => {
  return (
    <button
      className="nav button"
      onClick={(e) => (window.location.hash = "#summary")}
    >
      Show summary
    </button>
  );
};
