import React, { Component } from "react";
import { Cart } from "./Cart";
import { Order } from "./Order";
import "./OpenOrders.scss";
import { socket } from "../../global/header";

export class OpenOrders extends Component {
  constructor() {
    super();
    this.state = {
      orders: [], // connect to sockets,
      isOrderOpen: false,
      selectedOrder: {}
    };
  }

  getOrdersData = orders => {
    this.setState({ orders: orders });
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
    console.log(this.state.orders);
    return (
      <div>
        <div className="order-manage__heading">
          <p className="margin0">
            No. of orders: <strong>{this.state.orders.length}</strong>
          </p>
          <button className="primary-btn">New order</button>
        </div>
        {/* render all open orders */
        this.state.orders.map((order, index) => {
          let foodQty = 0;
          const totalQty = order.foods.reduce((accumulator, currentValue) => {
            if (
              ["main", "appertizer"].includes(currentValue.itemInfo.category)
            ) {
              foodQty += currentValue.quantity; // food & appertizer quantity
            }
            return accumulator + currentValue.quantity;
          }, 0); // all items quantity
          return (
            <div
              key={index}
              className="order-manage__card"
              onClick={() =>
                this.setState({ isOrderOpen: true, selectedOrder: order })
              }
            >
              <div className="order-manage__card-header">
                <h5 className="margin0">{order.title}</h5>
                <span>${order.totalPrice}</span>
              </div>
              <div className="order-manage__card-status-list">
                <span
                  className={
                    order.isDone
                      ? "order-manage__card-status-ready"
                      : "order-manage__card-status-in-progress"
                  }
                >
                  {order.isDone ? "Ready" : "In Progress"}
                </span>
                <span
                  className={
                    order.paid
                      ? "order-manage__card-status-unpaid"
                      : "order-manage__card-status-paid"
                  }
                >
                  {order.paid ? "Paid" : "Unpaid"}
                </span>
              </div>
              <p className="margin0">
                Dishes:&nbsp;
                <strong>{foodQty} &nbsp;items</strong>
                <br />
                Drinks &amp; desserts:&nbsp;
                <strong>{totalQty - foodQty} &nbsp;items</strong>
              </p>
            </div>
          );
        })}
        {this.state.isOrderOpen ? (
          <Order order={this.state.selectedOrder} />
        ) : (
          ""
        )}
        <Cart />
      </div>
    );
  }
}
