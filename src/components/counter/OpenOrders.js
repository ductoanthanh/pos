import React, { Component } from "react";
import { Cart } from "./Cart";
import "./OpenOrders.scss";
import { socket } from "../../global/header";

export class OpenOrders extends Component {
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
      <div>
        <div className="order-manage__heading">
          <p className="margin0">
            No. of orders: <strong>{this.state.orderData.length}</strong>
          </p>
          <button className="primary-btn">New order</button>
        </div>
        {this.state.orderData.map((order, index) => {
          console.log(order.foods);
          return (
            <div key={index} className="order-manage__card">
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
                <strong>
                  {
                    order.foods.filter(food =>
                      ["main", "appertizer"].includes(food.category)
                    ).length
                  }
                  &nbsp;items
                </strong>
                <br />
                Drinks &amp; desserts:&nbsp;
                <strong>
                  {
                    order.foods.filter(food =>
                      ["drink", "dessert"].includes(food.category)
                    ).length
                  }
                  &nbsp;items
                </strong>
              </p>
            </div>
          );
        })}
        <Cart />
      </div>
    );
  }
}
