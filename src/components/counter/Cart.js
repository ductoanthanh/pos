import React from "react";
import { socket } from "../../global/header";
import { VibamiConsumer } from "../../context/context";

export const Cart = () => {
  return (
    <VibamiConsumer>
      {value => {
        const { cart, modifyCart, setSideView } = value;

        const addToKitchen = cart => {
          const lineItems = [];

          // reconstruct cart object to array
          for (let [id, food] of Object.entries(cart)) {
            let lineItem = {};
            lineItem["itemInfo"] = id.match(/^[^-]*[^ -]/)[0]; // get everything before -
            lineItem["quantity"] = food.quantity;
            lineItem["variant"] = id.match(/\w[^-]*$/)[0]; // get everything after -
            lineItem["price"] =
              parseInt(food.basePrice) * parseInt(food.quantity);
            lineItems.push(lineItem);
          }

          const request = {
            title: "Giang Toan",
            guests: 12,
            totalPrice: lineItems.reduce(
              (accumulator, item) => accumulator + item.price,
              0
            ),
            foods: lineItems
          };

          // submit order to kitchen
          socket.emit("add_order", request);

          // empty cart
          modifyCart({});

          // set side view back to all orders
          setSideView("orders-manage");
        };

        return (
          <div>
            <h2 className="h2Class">Cart</h2>
            {Object.keys(cart).map(key => (
              <div className="row-container" key={key}>
                <p>
                  {cart[key]["quantity"]}x {cart[key]["name"]} -&nbsp;
                  {cart[key]["fillings"]}
                  <br />
                  {cart[key]["additionalInfo"]}
                </p>
                <p>${cart[key]["basePrice"] * cart[key]["quantity"]}</p>
              </div>
            ))}
            <hr />
            <div className="row-container">
              {console.log(cart)}
              <p>Total</p>
              <p>
                $
                {Object.values(cart).reduce(
                  (accumulator, object) =>
                    accumulator + object.basePrice * object.quantity,
                  0
                )}
              </p>
            </div>
            <button
              className="primary-btn full-btn"
              onClick={() => addToKitchen(cart)}
            >
              Send orders
            </button>
          </div>
        );
      }}
    </VibamiConsumer>
  );
};
