import "./App.css";
import Header from "./components/header/header";
import Cart from "./components/cart";
import NotFound from "./components/404/404";
import Content from "./pages/content";

import React from "react";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <Routes>
          <Route path="ReactPizza/" element={<Content />} />
          <Route path="ReactPizza/Cart" element={<Cart />}>
            <Route path="../ReactPizza/" element={<Content />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
