import React from "react";
import "./OrderStatus.scss";

export const OrderStatus = props => {
  const { order } = props;
  return (
    <div className="order-status-list">
      <span
        className={
          order.isDone ? "order-status-ready" : "order-status-in-progress"
        }
      >
        {order.isDone ? "Ready" : "In Progress"}
      </span>
      <span
        className={order.isPaid ? "order-status-unpaid" : "order-status-paid"}
      >
        {order.isPaid ? "Paid" : "Unpaid"}
      </span>
    </div>
  );
};
