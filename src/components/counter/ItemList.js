import React from "react";
import { ItemCard } from "./ItemCard";

export const ItemList = props => {
  return (
    <div className="row">
      {props.foods.map((food, index) => {
        return <ItemCard key={index} colNum="col-md-4 col-xs-6" food={food} />;
      })}
    </div>
  );
};
