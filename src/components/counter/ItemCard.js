import React, { useState } from "react";
import { VibamiConsumer } from "../../context/context";
import "./ItemCard.scss";
import { ItemModal } from "./ItemModal";

export const ItemCard = props => {
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };

  return (
    <VibamiConsumer>
      {value => {
        const { cart, modifyCart } = value;
        const food = props.food;

        const addToCart = (food, data) => {
          const fillings = JSON.parse(data.fillings);
          let id = `${food._id}-${fillings._id}`;
          let currentCart = { ...cart };
          currentCart[id] = {
            quantity: currentCart[id]
              ? parseInt(currentCart[id].quantity) + parseInt(data.quantity)
              : parseInt(data.quantity),
            name: food.name,
            fillings: fillings.title,
            additionalInfo: data.additionalInfo,
            basePrice: parseInt(food.price) + parseInt(fillings.addOnPrice)
          };
          modifyCart(currentCart);
        };

        return (
          <div>
            <div className={props.colNum} onClick={toggle}>
              <div className="card bwm-card">
                <img
                  className="card-img-top"
                  src="https://d2vwsr3mua7yp8.cloudfront.net/aa1bcb8f-90c1-4ea1-9ff0-039be063b587_d3.jpg" // needs to be changed
                  alt={food.name}
                ></img>
                <div className="card-block">
                  <h4 className="card-title">{food.name}</h4>
                  <p className="card-text">{food._id}</p>
                </div>
              </div>
            </div>
            <ItemModal
              isOpen={modal}
              toggle={toggle}
              addToCart={addToCart}
              food={food}
            />
          </div>
        );
      }}
    </VibamiConsumer>
  );
};
