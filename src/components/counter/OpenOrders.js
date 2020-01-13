import React, { useState } from "react";
import { Cart } from "./Cart";
import "./OpenOrders.scss";

export const OpenOrders = () => {
  return (
    <div>
      <div className="order-manage__heading">
        <p className="margin0">
          No. of orders: <strong>15</strong>
        </p>
        <button className="primary-btn">New order</button>
      </div>
      <div className="order-manage__card">
        <div className="order-manage__card-header">
          <h5 className="margin0">Table 1</h5>
          <span>$140</span>
        </div>
        <div className="order-manage__card-status-list">
          <span className={`order-manage__card-status-ready`}>Ready</span>
          <span className={`order-manage__card-status-unpaid`}>Unpaid</span>
        </div>
        <p className="margin0">
          Dishes: <strong>4 items</strong> <br />
          Drinks & desserts: <strong>5 items</strong>
        </p>
      </div>
      <div className="order-manage__card">
        <div className="order-manage__card-header">
          <h5 className="margin0">Table 2</h5>
          <span>$140</span>
        </div>
        <div className="order-manage__card-status-list">
          <span className={`order-manage__card-status-in-progress`}>
            In Progress
          </span>
          <span className={`order-manage__card-status-paid`}>Paid</span>
        </div>
        <p className="margin0">
          Dishes: <strong>4 items</strong> <br />
          Drinks & desserts: <strong>5 items</strong>
        </p>
      </div>
      <Cart />
    </div>
  );
};
