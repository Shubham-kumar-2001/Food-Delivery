import React from "react";

const CartContex = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
});
export default CartContex;
