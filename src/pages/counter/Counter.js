import React from "react";
import { ItemListing } from "../../components/counter/ItemListing";
import { OrderManage } from "../../components/counter/OrderManage";
import { Order } from "../../components/counter/Order";
import { Cart } from "../../components/counter/Cart";
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
            <div className="layout-container food-container">
              <ItemListing />
            </div>
            <div className="layout-container ticket-container">
              {sideView === "orders-manage" ? <OrderManage /> : ""}
              {sideView === "order-manage" ? <Order /> : ""}
              {sideView === "cart" ? <Cart /> : ""}
            </div>
          </div>
        );
      }}
    </VibamiConsumer>
  );
};
