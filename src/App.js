import "./App.css";
import Header from "./components/header/header";
import PizzaBlock from "./components/pizzaBlock";
import Categories from "./components/header/categories";
import SortPanel from "./components/header/sort";
import Skeleton from "./components/pizzaBlock/skeleton";
import pizzas from "./pizzas.json";
import Cart from "./components/cart";
import NotFound from "./components/404/404";

import React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";

function Content({ searchValue }) {
  const [pizzasBack, setPizzasBack] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchingCategory, setSearchingCategory] = React.useState(0);
  const SKELETON_COUNT = 6;
  const sortByRating = (pizzas) => {
    let sortedPizzas = pizzas.slice(); // copy
    sortedPizzas.sort((a, b) => b.rating - a.rating);
    return sortedPizzas;
  };

  const BackendTimeout = setTimeout(() => {
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
          setSearchingCategory={setSearchingCategory}
          searchingCategory={searchingCategory}
        />
        <SortPanel pizzas={pizzasBack} setPizzas={setPizzasBack} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...Array(SKELETON_COUNT).keys()].map((el) => <Skeleton key={el} />)
          : pizzasBack
              .filter((element) =>
                element.title.toLowerCase().includes(searchValue.toLowerCase())
              )
              .filter((element) =>
                element.categories.includes(searchingCategory)
              )
              .map((pizza, index) => <PizzaBlock {...pizza} key={pizza.id} />)}
      </div>
    </div>
  );
}

export const CartContext = React.createContext();

export const getCartPrice = (cartList) => {
  let res = 0;
  for (let i = 0; i < cartList.length; i++) {
    res += cartList[i].price * cartList[i].count;
  }
  return res;
};

export const getCartCount = (cartList) => {
  let res = 0;
  for (let i = 0; i < cartList.length; i++) {
    res += cartList[i].count;
  }
  return res;
};

function App() {
  const [cartList, setCartList] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");

  return (
    <div className="App">
      <div className="wrapper">
        <CartContext.Provider value={{ cartList, setCartList }}>
          <Header
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            cartPrice={getCartPrice(cartList)}
            cartCount={getCartCount(cartList)}
          />
          <Routes>
            <Route path="/" element={<Content searchValue={searchValue} />} />
            <Route path="cart.html" element={<Cart />}>
              <Route
                path="../"
                element={<Content searchValue={searchValue} />}
              />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </CartContext.Provider>
      </div>
    </div>
  );
}

export default App;
