import React, { Component } from "react";
import { ItemCard } from "./ItemCard";

export class ItemList extends Component {
  renderFoods() {
    return this.props.foods.map((food, index) => {
      return <ItemCard key={index} colNum="col-md-3 col-xs-6" food={food} />;
    });
  }

  render() {
    return <div className="row">{this.renderFoods()}</div>;
  }
}
