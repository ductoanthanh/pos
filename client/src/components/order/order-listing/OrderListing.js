import React, { useState, useEffect } from "react";
import { OrderList } from "./OrderList";
import { socket } from "../../../global/header";
import axios from "axios";

export const OrderListing = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setInterval(async () => {
      axios
        .get("http://localhost:5000/api/v1/orders")
        .then(response => setOrders(response.data));
    }, 5000);
  }, []);

  return (
    <div className="layout-container kds-container">
      <h2 className="h2Class">Kitchen Area</h2>
      <OrderList orders={orders} />
    </div>
  );
};
