import React, { Component } from "react";
import ItemListing from "../../components/counter/ItemListing";
import { OrderManage } from "../../components/counter/OrderManage";
import { Order } from "../../components/counter/Order";
import { VibamiConsumer } from "../../context/context";
import "./Counter.scss";

export const Counter = () => {
  return (
    <VibamiConsumer>
      {value => {
        const { sideView, setSideView } = value;
        console.log(sideView);
        return (
          <div className="counter-container">
            <div className="food-container">
              <ItemListing />
            </div>
            <div className="ticket-container">
              {sideView === "orders-manage" ? <OrderManage /> : ""}
              {sideView === "order-manage" ? <Order /> : ""}
            </div>
          </div>
        );
      }}
    </VibamiConsumer>
  );
};
