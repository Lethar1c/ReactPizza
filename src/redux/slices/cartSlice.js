import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpened: false,
  itemList: [],
  itemCount: 0,
  price: 0,
};

// PIZZA OBJECT DESCRIPTION
// const pizza = {
//   title: title,
//   price: prices[activeSizeIndex],
//   type: activeType,
//   size: sizes[activeSizeIndex],
//   count: 1,
// };
const findIdenticalPizza = (pizza, pizzaList) => {
  for (let i = 0; i < pizzaList.length; i++) {
    if (
      pizza.title === pizzaList[i].title &&
      pizza.size === pizzaList[i].size &&
      pizza.type === pizzaList[i].type
    )
      return i;
  }
  return -1;
};

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


export const getPizzaCount = (pizza, cartList) => {
  return findIdenticalPizza(pizza, cartList) === -1
    ? 0
    : cartList[findIdenticalPizza(pizza, cartList)].count;
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      let pizzaIndex = findIdenticalPizza(action.payload, state.itemList);
      if (pizzaIndex === -1) {
        state.itemList.push({
          title: action.payload.title,
          price: action.payload.price,
          type: action.payload.type,
          size: action.payload.size,
          imageUrl: action.payload.imageUrl,
          count: 1,
        });
      } else {
        state.itemList[pizzaIndex].count++;
      }
      state.itemCount = getCartCount(state.itemList);
      state.price = getCartPrice(state.itemList);
    },
    decrementPizzaCount: (state, action) => {
      let pizzaIndex = findIdenticalPizza(action.payload, state.itemList);
      if (pizzaIndex >= 0) {
        if (state.itemList[pizzaIndex].count >= 2) state.itemList[pizzaIndex].count--;
      }
      state.itemCount = getCartCount(state.itemList);
      state.price = getCartPrice(state.itemList);
    },
    removePizza: (state, action) => {
      let pizzaIndex = findIdenticalPizza(action.payload, state.itemList);
      state.itemList.splice(pizzaIndex, 1);
      state.itemCount = getCartCount(state.itemList);
      state.price = getCartPrice(state.itemList);
    },
    setCartList: (state, action) => {
      state.cartList = action.payload;
    },
    setIsOpened: (state, action) => {
      state.isOpened = action.payload;
    }
  },
});

export const {
  addToCart,
  decrementPizzaCount,
  removePizza,
  setCartList,
  setIsOpened
} = cartSlice.actions;

export default cartSlice.reducer;
