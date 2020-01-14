import React from "react";
import { isFood } from "../../helpers";
import { OrderStatus } from "./OrderStatus";
import { VibamiConsumer } from "../../context/context";
import "./Order.scss";

export const Order = props => {
  let foodTaxValue = 0,
    otherTaxValue = 0,
    foodTaxRate = 0.14,
    otherTaxRate = 0.24;

  return (
    <VibamiConsumer>
      {value => {
        const { setSideView, selectedOrder } = value;
        return (
          <div>
            <h5 className="margin0">{selectedOrder.title}</h5>
            <OrderStatus order={selectedOrder} />
            <div>
              {selectedOrder.foods.map((food, index) => {
                if (isFood(food.itemInfo.category)) {
                  foodTaxValue +=
                    food.itemInfo.price * food.quantity * foodTaxRate;
                  return (
                    <div key={index} className="row-container">
                      <div>
                        {food.itemInfo.name} x {food.quantity}
                      </div>
                      <div>{food.itemInfo.price * food.quantity}</div>
                    </div>
                  );
                }
                return null;
              })}
            </div>

            {// render only if there is food in order
            foodTaxValue > 0 ? <hr /> : ""}

            <div>
              {selectedOrder.foods.map((food, index) => {
                if (!isFood(food.itemInfo.category)) {
                  otherTaxValue +=
                    food.itemInfo.price * food.quantity * otherTaxRate;
                  return (
                    <div key={index} className="row-container">
                      <div>
                        {food.itemInfo.name} x {food.quantity}
                      </div>
                      <div>{food.itemInfo.price * food.quantity}</div>
                    </div>
                  );
                }
                return null;
              })}
            </div>

            {// render only if there is drink or dessert in order
            otherTaxValue > 0 ? <hr /> : ""}

            <div className="row-container">
              <div>VAT 14%</div>
              <div>{Math.round(foodTaxValue * 100) / 100}</div>
            </div>
            <div className="row-container">
              <div>VAT 24%</div>
              <div>{Math.round(otherTaxValue * 100) / 100}</div>
            </div>
            <hr />

            <div className="row-container">
              <div>Total</div>
              <div>${Math.round(selectedOrder.totalPrice * 100) / 100}</div>
            </div>
            <button
              style={{ margin: "1em 0" }}
              className="primary-btn full-btn"
              disabled={selectedOrder.isPaid}
            >
              Charge customer
            </button>
          </div>
        );
      }}
    </VibamiConsumer>
  );
};
