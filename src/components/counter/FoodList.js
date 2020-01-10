import React, { Component } from "react";
import FoodCard from "./FoodCard";

export class FoodList extends Component {
  renderFoods() {
    //console.log(this.props);
    return this.props.foods.map((food, index) => {
      return (
        <FoodCard
          key={index}
          modifyCart={this.props.modifyCart}
          cart={this.props.cart}
          colNum="col-md-3 col-xs-6"
          food={food}
        />
      );
    });
  }

  render() {
    return <div className="row">{this.renderFoods()}</div>;
  }
}
