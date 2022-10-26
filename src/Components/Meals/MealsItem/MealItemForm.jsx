import React, { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputref = useRef();

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = amountInputref.current.value;
    const enteredAmountInNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountInNumber < 1 ||
      enteredAmountInNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }
    props.onAddToCart(enteredAmountInNumber);
  };
  return (
    <form className={classes.form} onSubmit={formSubmitHandler}>
      <Input
        ref={amountInputref}
        label="Amount"
        input={{
          id: "amount",
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+Add to Card</button>
      {!amountIsValid && <p>Please Enter a valid amount (1-5)</p>}
    </form>
  );
};

export default MealItemForm;
