import React, { useState } from "react";
import classes from "./Checkout.module.css";
import useInput from "../../Hooks/use-input";

const isInputValid = (value) => value.trim() !== "";
const isPostalValid = (value) => value.trim().length === 6;

const Checkout = (props) => {
  const {
    value: nameInputValue,
    isValid: nameInputIsValid,
    hasError: nameHasError,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: nameReset,
  } = useInput(isInputValid);
  const {
    value: cityInputValue,
    isValid: cityInputIsValid,
    hasError: cityHasError,
    inputChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
    reset: cityReset,
  } = useInput(isInputValid);
  const {
    value: postalCodeInputValue,
    isValid: postalCodeInputIsValid,
    hasError: postalCodeHasError,
    inputChangeHandler: postalCodeChangeHandler,
    inputBlurHandler: postalCodeBlurHandler,
    reset: postalCodeReset,
  } = useInput(isPostalValid);
  const {
    value: streetInputValue,
    isValid: streetInputIsValid,
    hasError: streetHasError,
    inputChangeHandler: streetChangeHandler,
    inputBlurHandler: streetBlurHandler,
    reset: streetReset,
  } = useInput(isInputValid);

  const formValid =
    nameInputIsValid &&
    cityInputIsValid &&
    postalCodeInputIsValid &&
    streetInputIsValid;

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (!formValid) {
      return;
    }
    nameReset();
    cityReset();
    postalCodeReset();
    streetReset();

    const userAddressData = {
      name: nameInputValue,
      city: cityInputValue,
      postalCode: postalCodeInputValue,
      street: streetInputValue,
    };

    props.onPlaceOrder(userAddressData);
  };
  const nameClasses = `${classes.control} ${
    nameHasError ? classes.invalid : ""
  }`;

  return (
    <form className={classes.form} onSubmit={formSubmitHandler}>
      <div className={nameClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={nameInputValue}
        />
        {nameHasError && (
          <p className={classes.invalid}>Please enter a valid name</p>
        )}
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
          value={cityInputValue}
        />
        {cityHasError && (
          <p className={classes.invalid}>Please enter a valid city name</p>
        )}
      </div>
      <div className={classes.control}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="number"
          id="post"
          onChange={postalCodeChangeHandler}
          onBlur={postalCodeBlurHandler}
          value={postalCodeInputValue}
        />
        {postalCodeHasError && (
          <p className={classes.invalid}>Please enter a valid pinCode</p>
        )}
      </div>
      <div className={classes.control}>
        <label htmlFor="village">Village/street</label>
        <input
          type="text"
          id="village"
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
          value={streetInputValue}
        />
        {streetHasError && (
          <p className={classes.invalid}>Please enter a valid street name</p>
        )}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button type="submit" className={classes.submit}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
