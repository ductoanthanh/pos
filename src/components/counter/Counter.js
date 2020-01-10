import React, { Component } from "react";
import FoodListing from "./FoodListing";
import Cart from "./Cart";

export default class Counter extends Component {
  render() {
    return (
      <div>
        <FoodListing />
        <Cart />
      </div>
    );
  }
}
