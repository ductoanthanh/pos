import React, { useState, useEffect } from "react";
import { OrderStatus } from "./OrderStatus";
import "./OpenOrders.scss";
import axios from "axios";
import { isFood } from "../../../helpers";
import { VibamiConsumer } from "../../../context/context";

export const OpenOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setInterval(async () => {
      axios
        .get("http://localhost:5000/api/v1/orders?location=counter")
        .then(response => setOrders(response.data));
    }, 3000);
  }, []);

  return (
    <VibamiConsumer>
      {value => {
        const { setSideView, setSelectedOrder } = value;
        return (
          <div>
            <div className="order-manage__heading">
              <p className="margin0">
                No. of orders: <strong>{orders.length}</strong>
              </p>
              <button
                className="app-btn primary-btn"
                onClick={() => setSideView("cart")}
              >
                New order
              </button>
            </div>
            {/* render all open orders */
            orders.map((order, index) => {
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
};
