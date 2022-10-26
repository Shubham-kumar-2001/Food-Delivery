import { useState } from "react";

const useInput = (validateInput) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [inputIsTouched, setInputIsTouched] = useState(false);

  const enteredInputIsValid = validateInput(enteredValue);
  const hasError = !enteredInputIsValid && inputIsTouched;

  const inputChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };
  const inputBlurHandler = () => {
    setInputIsTouched(true);
  };

  const reset = () => {
    setInputIsTouched(false);
    setEnteredValue("");
  };
  return {
    value: enteredValue,
    isValid: enteredInputIsValid,
    hasError,
    inputBlurHandler,
    inputChangeHandler,
    reset,
  };
};

export default useInput;
