import React from "react";
import { CartModals } from "./Cart";
import Product from "./Product";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
const App = () => {
  const cartOpenClose = useSelector((state) => state.cart.cartOpenClose);
  return (
    <>
      <Product />
      {cartOpenClose && <CartModals />}
    </>
  );
};

export default App;
