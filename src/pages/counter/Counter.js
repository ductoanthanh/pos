import React, { Component } from "react";
import ItemListing from "../../components/counter/ItemListing";
import { OrderManage } from "../../components/counter/OrderManage";
import "./Counter.scss";

export default class Counter extends Component {
  render() {
    return (
      <div className="counter-container">
        <div className="food-container">
          <ItemListing />
        </div>
        <div className="ticket-container">
          <OrderManage />
        </div>
      </div>
    );
  }
}
