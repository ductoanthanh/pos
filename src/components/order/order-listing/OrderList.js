import React, { Component } from "react";
import OrderCard from "./OrderCard";

export class OrderList extends Component {
  renderOrders() {
    console.log(this.props);
    return this.props.orders.map((order, index) => {
      return <OrderCard key={index} colNum="col-md-3 col-xs-6" order={order} />;
    });
  }

  render() {
    return <div className="row">{this.renderOrders()}</div>;
  }
}
