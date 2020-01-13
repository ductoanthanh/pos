import React, { Component } from "react";
import FoodListing from "../../components/counter/FoodListing";
import { OrderManage } from "../../components/counter/OrderManage";
import "./Counter.scss";

export default class Counter extends Component {
  render() {
    return (
      <div className="counter-container">
        <div className="food-container">
          <FoodListing />
        </div>
        <div className="ticket-container">
          <OrderManage />
        </div>
      </div>
    );
  }
}
