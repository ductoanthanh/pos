import React, { useState, useEffect } from "react";
import { ItemCard } from "./ItemCard";
import axios from "axios";
import "./ItemListing.scss";

export const ItemListing = () => {
  const [foodData, setFoodData] = useState([]);
  const [time, setTime] = useState("lunch");
  const [category, setCategory] = useState("appertizer");
  const availableTimes = ["Lunch", "Dinner", "Weekends"];
  const itemCategories = ["Appertizer", "Main", "Drinks", "Desserts"];

  useEffect(() => {
    axios.get("/api/v1/foods").then(response => setFoodData(response.data));
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

      {/* display items */}
      <div className="row">
        {foodData
          .filter(
            item => item.category === category // render item within certain category
          )
          .map((item, index) => {
            return (
              <ItemCard key={index} colNum="col-md-4 col-xs-6" food={item} />
            );
          })}
      </div>
    </div>
  );
};
