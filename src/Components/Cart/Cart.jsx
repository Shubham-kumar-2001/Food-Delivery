import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "./../UI/Modal";
import CartContex from "./../../store/cart-contex";
import CartItem from "./CartItem";
import CheckOut from "./Checkout";
import loader from "../Meals/Loader.module.css";

const Cart = (props) => {
  const [isCheckOut, setIsCheckOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmitting, setDidSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const cartCtx = useContext(CartContex);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const hasItem = cartCtx.items.length > 0;

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const checkOutHandler = () => {
    setIsCheckOut(true);
  };
  if (isLoading) {
    return <div className={loader.loader}></div>;
  }

  const placeOrderedHandler = async (data) => {
    setIsSubmitting(true);
    setIsLoading(true);
    await fetch(
      "https://fir-http-react-default-rtdb.firebaseio.com/ordered.json",
      {
        method: "POST",
        body: JSON.stringify({
          userData: data,
          orderedData: cartCtx.items,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setIsSubmitting(false);
    setDidSubmitting(true);
    setIsLoading(false);
    cartCtx.clearCart();
  };

  const modalAction = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        close
      </button>
      {hasItem && (
        <button className={classes.button} onClick={checkOutHandler}>
          order
        </button>
      )}
    </div>
  );

  const cartItem = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          name={item.name}
          price={item.price}
          amount={item.amount}
          key={`${item.id} ${item.name}`}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const orderedPlacedmodal = (
    <React.Fragment>
      {cartItem}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckOut && (
        <CheckOut onCancel={props.onClose} onPlaceOrder={placeOrderedHandler} />
      )}
      {!isCheckOut && modalAction}
    </React.Fragment>
  );
  const isSubmittingModalContent = <p>Sending order Data</p>;
  const didSubmittingModalContent = (
    <React.Fragment>
      <p>Successfully You alced your order</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          close
        </button>
      </div>
    </React.Fragment>
  );
  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmitting && orderedPlacedmodal}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmitting && didSubmittingModalContent}
    </Modal>
  );
};

export default Cart;
