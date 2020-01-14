import React from "react";

export const OrderStatus = props => {
  const { order } = props;
  return (
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
          order.isPaid
            ? "order-manage__card-status-unpaid"
            : "order-manage__card-status-paid"
        }
      >
        {order.isPaid ? "Paid" : "Unpaid"}
      </span>
    </div>
  );
};
