import React, { Component } from "react";
import { OrderStatus } from "./OrderStatus";
import "./OpenOrders.scss";
import { socket } from "../../global/header";
import { isFood } from "../../helpers";
import { VibamiConsumer } from "../../context/context";

export class OpenOrders extends Component {
  constructor() {
    super();
    this.state = {
      orders: [], // connect to sockets,
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
    return (
      <VibamiConsumer>
        {value => {
          const {
            sideView,
            setSideView,
            selectedOrder,
            setSelectedOrder
          } = value;
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
                const totalQty = order.foods.reduce(
                  (accumulator, currentValue) => {
                    if (isFood(currentValue.itemInfo.category)) {
                      foodQty += currentValue.quantity; // food & appertizer quantity
                    }
                    return accumulator + currentValue.quantity;
                  },
                  0
                ); // all items quantity
                return (
                  <div
                    key={index}
                    className="order-manage__card"
                    onClick={() => {
                      this.setState({ selectedOrder: order });
                      setSideView("order-manage");
                      setSelectedOrder(order);
                    }}
                  >
                    <div className="order-manage__card-header">
                      <h5 className="margin0">{order.title}</h5>
                      <span>${order.totalPrice}</span>
                    </div>
                    <OrderStatus order={order} />
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
            </div>
          );
        }}
      </VibamiConsumer>
    );
  }
}
