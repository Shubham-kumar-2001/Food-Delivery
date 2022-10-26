/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import classes from "./Available.module.css";
import Card from "../UI/Card";
import MealItem from "./MealsItem/MealItem";
import style from "./Error.module.css";
import loader from "./Loader.module.css";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://fir-http-react-default-rtdb.firebaseio.com/movies.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const jsonData = await response.json();

      const loadedData = [];
      for (let key in jsonData) {
        loadedData.push({
          id: key,
          name: jsonData[key].name,
          description: jsonData[key].description,
          price: jsonData[key].price,
        });
      }
      setMeals(loadedData);
      setIsLoading(false);
    };

    //this is not going to solve my problem because async provide me a promise during error it going to reject the promise so we are going to use .catch method
    // try {
    //   fetchData();
    // } catch (error) {
    //   setIsLoading(false);
    //   setHttpError(error.message);
    // }
    fetchData().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });

    // fetchData();
  }, []);

  if (httpError) {
    return (
      <Card className={style.error}>
        <h1>{httpError}</h1>
      </Card>
    );
  }

  if (isLoading) {
    return <div className={loader.loader}></div>;
  }

  return (
    <Card className={classes.meals}>
      <ul>
        {meals.map((meal) => (
          <MealItem
            key={`${meal.id} ${meal.name}`}
            name={meal.name}
            description={meal.description}
            price={meal.price}
            id={meal.id}
          />
        ))}
      </ul>
    </Card>
  );
};

export default AvailableMeals;
