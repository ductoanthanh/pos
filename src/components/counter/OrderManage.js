import React, { useState } from "react";
import { OpenOrders } from "./OpenOrders";
import "./OrderManage.scss";

export const OrderManage = () => {
  const [isOpenOrdersTab, setOpenOrdersTab] = useState(true);
  return (
    <div className="order-manage__container">
      <div>
        <div class="tab">
          <button
            class={`tablinks ${isOpenOrdersTab ? "active" : ""}`}
            onClick={() => setOpenOrdersTab(true)}
          >
            Open orders
          </button>
          <button
            class={`tablinks ${isOpenOrdersTab ? "" : "active"}`}
            onClick={() => setOpenOrdersTab(false)}
          >
            Today History
          </button>
        </div>
        {isOpenOrdersTab ? <OpenOrders /> : ""}
      </div>
    </div>
  );
};
