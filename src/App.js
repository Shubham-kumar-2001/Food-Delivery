import React, { useState } from "react";
import Cart from "./Components/Cart/Cart";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import CartProvider from "./store/CartProvider";

const App = (props) => {
  const [cartIsShown, setCartIsShown] = useState(false);

  const cartShownHandler = () => {
    setCartIsShown(true);
  };
  const hideCartHandler = () => {
    setCartIsShown(false);
  };
  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={cartShownHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
};

export default App;
