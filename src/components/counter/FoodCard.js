import React, { Component } from "react";

class FoodCard extends Component {
  constructor() {
    super();
    this.state = {};
  }

  addToCart = food => {
    let id = food._id;
    let currentCart = { ...this.props.cart };
    currentCart[id] = {
      quantity: currentCart[id] ? currentCart[id].quantity + 1 : 1,
      name: food.name
    };
    this.props.modifyCart(currentCart);
  };

  render() {
    const food = this.props.food;
    return (
      <div className={this.props.colNum}>
        <div className="card bwm-card">
          <img
            className="card-img-top"
            src="https://d2vwsr3mua7yp8.cloudfront.net/aa1bcb8f-90c1-4ea1-9ff0-039be063b587_d3.jpg" // needs to be changed
            alt={food.name}
          ></img>
          <div className="card-block">
            <h4 className="card-title">{food.name}</h4>
            <p className="card-text">{food._id}</p>
            <button onClick={() => this.addToCart(food)}>Add to Cart</button>
          </div>
        </div>
      </div>
    );
  }
}

export default FoodCard;
