import React from "react";

export default function SortPanel({ pizzas, setPizzas }) {
  const [popUpShown, setPopUpShown] = React.useState(false);
  const [sortParameterIndex, setSortParameterIndex] = React.useState(0);

  const sortParametersList = ["популярности", "цене", "алфавиту"];

  const onParameterClick = (index) => {
    setSortParameterIndex(index);
    setPopUpShown(!popUpShown);
    switch (index) {
      case 0:
        setPizzas(sortByRating(pizzas));
        break;
      case 1:
        setPizzas(sortByPrice(pizzas));
        break;
      case 2:
        setPizzas(sortByAlphabet(pizzas));
        break;
      default:
        break;
    }
  };

  const sortByPrice = (pizzas) => {
    let sortedPizzas = pizzas.slice(); // copy
    sortedPizzas.sort((a, b) => a.price - b.price);
    return sortedPizzas;
  };

  const sortByRating = (pizzas) => {
    let sortedPizzas = pizzas.slice(); // copy
    sortedPizzas.sort((a, b) => b.rating - a.rating);
    return sortedPizzas;
  };

  const sortByAlphabet = (pizzas) => {
    let sortedPizzas = pizzas.slice(); // copy
    sortedPizzas.sort((a, b) => (a.title > b.title ? 1 : -1));
    return sortedPizzas;
  };

  const sortWindow = React.useRef(null);

  React.useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (!e.composedPath().includes(sortWindow.current)) {
        setPopUpShown(false);
      }
    });
  }, []);

  return (
    <div className="sort" ref={sortWindow}>
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span
          onClick={() => {
            setPopUpShown(!popUpShown);
          }}
        >
          {sortParametersList[sortParameterIndex]}
        </span>
      </div>
      {popUpShown && (
        <div className="sort__popup">
          <ul>
            {sortParametersList.map((element, index) =>
              index === sortParameterIndex ? (
                <li
                  key={element}
                  className="active"
                  onClick={() => onParameterClick(index)}
                >
                  {sortParametersList[index]}
                </li>
              ) : (
                <li key={element} onClick={() => onParameterClick(index)}>
                  {sortParametersList[index]}
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
