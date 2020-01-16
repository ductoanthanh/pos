import React, { Component } from "react";
import { socket } from "../../../global/header";
import { Timer } from "./Timer";
import SwipeButton from "../../../global/SwipeButton";

class OrderCard extends Component {
  constructor() {
    super();
    this.state = {
      isDone: false
    };
  }

  markDone = id => {
    console.log(id);
    this.setState({ isDone: true });
    socket.emit("mark_order_done", id);
  };

  render() {
    const order = this.props.order;
    return (
      <div
        className={this.props.colNum}
        style={{ display: this.state.isDone ? "none" : "block" }}
      >
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
                  <span style={{ color: "#C4CDD5" }}>
                    {food.additionalInfo}
                  </span>
                </p>
              );
            })}
            <SwipeButton
              index={this.props.index}
              text="Food Ready"
              color="#009de0"
              onSuccess={() => this.markDone(order._id)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default OrderCard;
