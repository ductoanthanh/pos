import React, { useState, useEffect } from "react";
import { OrderList } from "./OrderList";
import axios from "axios";

export const OrderListing = () => {
  const [orders, setOrders] = useState([]);

  const getOrders = () => {
    axios
      .get("/api/v1/orders?location=kitchen")
      .then(response => setOrders(response.data));
  };

  useEffect(() => {
    getOrders();
    setInterval(async () => {
      getOrders();
    }, 5000);
  }, []);

  return (
    <div className="layout-container kds-container">
      <h2 className="h2Class">Kitchen Area</h2>
      <OrderList orders={orders} />
    </div>
  );
};
