import React, { Component } from "react";
import FoodListing from "./FoodListing";
import { Cart } from "./Cart";
import { VibamiConsumer } from "../../context/context";

export default class Counter extends Component {
  render() {
    return (
      <VibamiConsumer>
        {value => {
          return (
            <div>
              <FoodListing modifyCart={value.modifyCart} cart={value.cart} />
              <Cart />
            </div>
          );
        }}
      </VibamiConsumer>
    );
  }
}
