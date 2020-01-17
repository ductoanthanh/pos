import React from "react";
import { OrderCard } from "./OrderCard";

export const OrderList = props => {
  const { orders } = props;
  return (
    <div className="row">
      {orders.map((order, index) => {
        return (
          <OrderCard
            key={index}
            index={index}
            colNum="col-xl-3 col-md-4 col-xs-6"
            order={order}
          />
        );
      })}
    </div>
  );
};
