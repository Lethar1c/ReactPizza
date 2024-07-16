import React from "react";
import { getPizzaCount, addToCart } from "../../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";

export default function PizzaBlock({
  title,
  imageUrl,
  types,
  sizes,
  prices,
}) {
  const typesDescriptor = ["Традиционное", "Тонкое"];

  const [activeType, setActiveType] = React.useState(0);
  const [activeSizeIndex, setActiveSizeIndex] = React.useState(0);

  const cartList = useSelector((state) => state.cart.itemList);
  const dispatch = useDispatch();

  const onAddButtonClick = () => {
    const pizza = {
      title: title,
      price: prices[activeSizeIndex],
      type: activeType,
      size: sizes[activeSizeIndex],
      imageUrl: imageUrl,
    };
    dispatch(addToCart(pizza));
  };

  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={imageUrl} alt={title} />
      <h4 className="pizza-block__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map((element, index) =>
            index === activeType ? (
              <li
                className="active"
                onClick={() => setActiveType(index)}
                key={index}
              >
                {typesDescriptor[element]}
              </li>
            ) : (
              <li onClick={() => setActiveType(index)} key={index}>
                {typesDescriptor[element]}
              </li>
            )
          )}
        </ul>
        <ul>
          {sizes.map((element, index) =>
            index === activeSizeIndex ? (
              <li
                className="active"
                onClick={() => setActiveSizeIndex(index)}
                key={index}
              >
                {sizes[index]} см
              </li>
            ) : (
              <li onClick={() => setActiveSizeIndex(index)} key={index}>
                {sizes[index]} см
              </li>
            )
          )}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">{prices[activeSizeIndex]} ₽</div>
        <div
          className="button button--outline button--add"
          onClick={onAddButtonClick}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          <i>
            {getPizzaCount({
              title: title,
              size: sizes[activeSizeIndex],
              type: activeType,
            }, cartList)}
          </i>
        </div>
      </div>
    </div>
  );
}
