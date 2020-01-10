import React, { Component } from "react";
import { socket } from "../../../global/header";

class OrderCard extends Component {
  constructor() {
    super();
    this.state = {
      isDone: false
    };
  }

  markDone = id => {
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
        <div className="card bwm-card">
          <img
            className="card-img-top"
            src={order.image}
            alt={order.title}
          ></img>
          <div className="card-block">
            <h4 className="card-title">{order.title}</h4>
            <p className="card-text">{order._id}</p>
            <p className="card-text">Guests: {order.guests}</p>
            <p className="card-text">€{order.totalPrice}</p>
            <p className="card-text">
              Status: {order.isDone ? "Done" : "Not Done"}
            </p>
            {order.foods.map((food, index) => {
              return <p key={index}>{food._id}</p>;
            })}
            <button onClick={() => this.markDone(order._id)}>
              Mark as done
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderCard;
