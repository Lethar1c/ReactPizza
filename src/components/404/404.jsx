import { Link } from "react-router-dom";
import emptyCart from "../../img/empty-cart.png";
import Header from "../header/header";

export default function NotFound() {
  return (
    <>
      <Header />
      <div className="content">
        <div className="container container--cart">
          <div className="cart cart--empty">
            <h2>
              Корзина пустая <icon>😕</icon>
            </h2>
            <p>
              Вероятней всего, вы не заказывали ещё пиццу.
              <br />
              Для того, чтобы заказать пиццу, перейди на главную страницу.
            </p>
            <img src={emptyCart} alt="Empty cart" />
            <Link to="../ReactPizza" className="button button--black">
              <span>Вернуться назад</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
