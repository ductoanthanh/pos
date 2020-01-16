import React, { Component } from "react";
import { OrderList } from "./OrderList";
import { socket } from "../../../global/header";

class OrderListing extends Component {
  constructor() {
    super();
    this.state = {
      orderData: [] // connect to sockets,
    };
  }

  getOrdersData = orders => {
    this.setState({ orderData: orders });
  };

  changeData = () => socket.emit("get_orders");

  componentDidMount() {
    socket.emit("get_orders");
    socket.on("get_order_data", this.getOrdersData);
    socket.on("change_data", this.changeData);
  }

  componentWillUnmount() {
    socket.off("get_order_data");
    socket.off("change_data");
  }

  render() {
    return (
      <div className="layout-container kds-container">
        <h2 className="h2Class">Kitchen Area</h2>
        <OrderList orders={this.state.orderData} />
      </div>
    );
  }
}

export default OrderListing;
