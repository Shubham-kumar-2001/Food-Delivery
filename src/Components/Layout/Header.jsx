import React from "react";
import classes from "./Header.module.css";
import mealsimg from "../../assets/meals.jpg";
import HeaderCartButton from "./HeaderButton";
const Header = (props) => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>Delicious Food</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsimg} alt="Table is a full of delicious food" />
      </div>
    </React.Fragment>
  );
};

export default Header;
