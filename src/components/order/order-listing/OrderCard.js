import React, { useState } from "react";
import { socket } from "../../../global/header";
import { Timer } from "./Timer";
import SwipeButton from "../../../global/SwipeButton";

export const OrderCard = props => {
  const { order, colNum, index } = props;
  const [isDone, setIsDone] = useState(false);

  const markDone = id => {
    setTimeout(() => {
      setIsDone(true);
    }, 1000);
    socket.emit("mark_order_done", id);
  };

  return (
    <div className={colNum} style={{ display: isDone ? "none" : "block" }}>
      <Timer createdAt={order.createdAt} />
      <div className="card">
        <div className="card-block">
          <h4 className="card-title">{order.title}</h4>
          <p className="card-text">Guests: {order.guests}</p>
          {order.foods.map((food, index) => {
            return (
              <p key={index}>
                {food.quantity}x {food.itemInfo.name} {food.variant.title}
                <br />
                <span style={{ color: "#C4CDD5" }}>{food.additionalInfo}</span>
              </p>
            );
          })}
          <SwipeButton
            index={index}
            text="Food Ready"
            color="#009de0"
            onSuccess={() => markDone(order._id)}
          />
        </div>
      </div>
    </div>
  );
};
