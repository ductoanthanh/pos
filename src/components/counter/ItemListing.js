import React, { useState, useEffect } from "react";
import { ItemList } from "./ItemList";
import { socket } from "../../global/header";
import "./ItemListing.scss";

export const ItemListing = () => {
  const [foodData, setFoodData] = useState([]);
  const [time, setTime] = useState("lunch");
  const [category, setCategory] = useState("appertizer");
  const availableTimes = ["Lunch", "Dinner", "Weekends"];
  const itemCategories = ["Appertizer", "Main", "Drinks", "Desserts"];

  useEffect(() => {
    socket.emit("get_foods");
    socket.on("get_food_data", payload => {
      setFoodData(payload);
    });
    socket.on("change_data", () => {
      socket.emit("get_foods");
    });

    return () => {
      socket.off("get_food_data");
      socket.off("change_data");
    };
  }, []);

  return (
    <div>
      <div className="tab time-tab">
        {availableTimes.map(timeWindow => {
          return (
            <button
              key={timeWindow}
              className={`tablinks ${
                time === timeWindow.toLowerCase() ? "active" : ""
              }`}
              onClick={() => setTime(timeWindow.toLowerCase())}
            >
              {timeWindow}
            </button>
          );
        })}
      </div>
      <div className="tab category-tab">
        {itemCategories.map(category => {
          return (
            <button
              key={category}
              className={`tablinks ${
                category === category.toLowerCase() ? "active" : ""
              }`}
              onClick={() => setCategory(category.toLowerCase())}
            >
              {category}
            </button>
          );
        })}
      </div>
      <ItemList
        foods={foodData.filter(
          item => item.category === category // render item within certain category
        )}
      />
    </div>
  );
};
