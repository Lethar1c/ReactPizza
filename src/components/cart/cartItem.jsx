import React from "react";
import { CartContext } from "../../App";

export default function CartItem({
  title,
  type,
  size,
  count,
  price,
  imageUrl,
}) {
  const typesDescriptor = ["Традиционное", "Тонкое"];
  const { cartList, setCartList } = React.useContext(CartContext);

  const isPizzasIdentical = (pizza1, pizza2) => {
    return (
      pizza1.title === pizza2.title &&
      pizza1.size === pizza2.size &&
      pizza1.type === pizza2.type
    );
  };

  const findIdenticalPizza = (pizza, pizzaList) => {
    for (let i = 0; i < pizzaList.length; i++) {
      if (isPizzasIdentical(pizza, pizzaList[i])) return i;
    }
    return -1;
  };

  const deletePizza = (pizza) => {
    let pizzaIndex = findIdenticalPizza(pizza, cartList);
    if (pizzaIndex === -1) return;
    let cartListCopy = cartList.slice();
    cartListCopy.splice(pizzaIndex, 1);
    setCartList(cartListCopy);
  };

  const editPizzaCount = (pizza, difference) => {
    let pizzaIndex = findIdenticalPizza(pizza, cartList);
    if (pizzaIndex === -1) return;
    let cartListCopy = cartList.slice();
    cartListCopy[pizzaIndex].count += difference;
    if (cartListCopy[pizzaIndex].count <= 0) {
      cartListCopy[pizzaIndex].count -= difference;
      return;
    }
    setCartList(cartListCopy);
  };

  const pizza = {
    title: title,
    price: price,
    type: type,
    size: size,
    imageUrl: imageUrl,
    count: 1,
  };

  return (
    <div class="cart__item">
      <div class="cart__item-img">
        <img class="pizza-block__image" src={imageUrl} alt="Pizza" />
      </div>
      <div class="cart__item-info">
        <h3>{title}</h3>
        <p>
          {typesDescriptor[type]} тесто, {size} см
        </p>
      </div>
      <div class="cart__item-count">
        <div
          class="button button--outline button--circle cart__item-count-minus"
          onClick={() => editPizzaCount(pizza, -1)}
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
              fill="#EB5A1E"
            />
            <path
              d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
              fill="#EB5A1E"
            />
          </svg>
        </div>
        <b>{count}</b>
        <div
          class="button button--outline button--circle cart__item-count-plus"
          onClick={() => editPizzaCount(pizza, 1)}
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
              fill="#EB5A1E"
            />
            <path
              d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
              fill="#EB5A1E"
            />
          </svg>
        </div>
      </div>
      <div class="cart__item-price">
        <b>{price} ₽</b>
      </div>
      <div class="cart__item-remove" onClick={() => deletePizza(pizza)}>
        <div class="button button--outline button--circle">
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
              fill="#EB5A1E"
            />
            <path
              d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
              fill="#EB5A1E"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
