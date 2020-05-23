const SummaryShow = () => {
  return (
    <button
      className="summarybutton"
      onClick={(e) => (window.location.hash = "#summary")}
    >
      Show summary
    </button>
  );
};
