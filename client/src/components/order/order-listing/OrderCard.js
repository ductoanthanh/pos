import React, { useState } from "react";
import axios from "axios";
import { Timer } from "./Timer";
import SwipeButton from "../../../global/SwipeButton";

export const OrderCard = props => {
  const { order, colNum, index } = props;
  const [isDone, setIsDone] = useState(false);

  const markDone = async id => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/v1/orders/${id}`,
        {
          isDone: true
        }
      );
      setTimeout(() => {
        setIsDone(true);
      }, 1000);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
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
