import React from "react";
import { socket } from "../../global/header";
import { VibamiConsumer } from "../../context/context";

export const Cart = () => {
  return (
    <VibamiConsumer>
      {value => {
        const { cart, modifyCart } = value;

        const addToKitchen = cart => {
          const lineItems = [];

          // reconstruct cart object to array
          for (let [id, food] of Object.entries(cart)) {
            let lineItem = {};
            lineItem["_id"] = id;
            lineItem["quantity"] = food.quantity;
            lineItems.push(lineItem);
          }

          const request = {
            title: "Giang Toan",
            guests: 12,
            totalPrice: 224,
            foods: lineItems
          };

          // submit order to kitchen
          socket.emit("add_order", request);

          // empty cart
          modifyCart({});
        };

        return (
          <div>
            <h2 className="h2Class">Cart</h2>
            {Object.keys(cart).map(key => (
              <p key={key}>
                {cart[key]["quantity"]}x {cart[key]["name"]}
              </p>
            ))}
            <button className="primary-btn" onClick={() => addToKitchen(cart)}>
              Submit Order
            </button>
          </div>
        );
      }}
    </VibamiConsumer>
  );
};
