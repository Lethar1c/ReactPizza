import React from "react";
import { useSelector } from "react-redux";

import PizzaBlock from "../components/pizzaBlock";
import Categories from "../components/header/categories";
import SortPanel from "../components/header/sort";
import Skeleton from "../components/pizzaBlock/skeleton";
import pizzas from "../pizzas.json";

export default function Content() {
  const [pizzasBack, setPizzasBack] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const searchingCategory = useSelector(state => state.filter.category);
  const searchText = useSelector(state => state.filter.searchText);
  const SKELETON_COUNT = 6;
  const sortByRating = (pizzas) => {
    let sortedPizzas = pizzas.slice(); // copy
    sortedPizzas.sort((a, b) => b.rating - a.rating);
    return sortedPizzas;
  };

  setTimeout(() => {
    if (pizzasBack.length === 0) {
      setPizzasBack(sortByRating(pizzas));
      setIsLoading(false);
    }
  }, 2000);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          list={[
            "Все",
            "Мясные",
            "Вегетарианские",
            "Гриль",
            "Острые",
            "Закрытые",
          ]}
        />
        <SortPanel pizzas={pizzasBack} setPizzas={setPizzasBack} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...Array(SKELETON_COUNT).keys()].map((el) => <Skeleton key={el} />)
          : pizzasBack
              .filter((element) =>
                element.title.toLowerCase().includes(searchText.toLowerCase())
              )
              .filter((element) =>
                element.categories.includes(searchingCategory)
              )
              .map((pizza, index) => <PizzaBlock {...pizza} key={pizza.id} />)}
      </div>
    </div>
  );
}
