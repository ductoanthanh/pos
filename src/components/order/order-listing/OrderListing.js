import React, { useState, useEffect } from "react";
import { OrderList } from "./OrderList";
import { socket } from "../../../global/header";

export const OrderListing = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    socket.emit("get_orders");
    socket.on("get_order_data", payload => {
      setOrders(payload);
    });
    socket.on("change_data", payload => {
      socket.emit("get_orders");
    });

    return () => {
      socket.off("get_order_data");
      socket.off("change_data");
    };
  }, []);

  return (
    <div className="layout-container kds-container">
      <h2 className="h2Class">Kitchen Area</h2>
      <OrderList orders={orders} />
    </div>
  );
};
