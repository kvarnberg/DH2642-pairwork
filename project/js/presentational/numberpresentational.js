const numberPresentational = ({ num, setNum }) => {
  return h(
    "div",
    null,
    h(
      "button",
      {
        className: "button",
        onClick: (e) => setNum(num - 1),
        disabled: num <= 1,
      },
      "-"
    ),
    num,
    h("button", { className: "button", onClick: (e) => setNum(num + 1) }, "+")
  );
};
