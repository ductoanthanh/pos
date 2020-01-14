import React, { Component } from "react";
import { ItemList } from "./ItemList";
import { socket } from "../../global/header";
import "./ItemListing.scss";

class ItemListing extends Component {
  constructor() {
    super();
    this.state = {
      foodData: [], // connect to sockets,
      time: "lunch",
      category: "appertizer"
    };
  }

  getFoodsData = foods => {
    this.setState({ foodData: foods });
  };

  changeData = () => socket.emit("get_foods");

  componentDidMount() {
    socket.emit("get_foods");
    socket.on("get_food_data", this.getFoodsData);
    socket.on("change_data", this.changeData);
  }

  componentWillUnmount() {
    socket.off("get_food_data");
    socket.off("change_data");
  }

  render() {
    const availableTimes = ["Lunch", "Dinner", "Weekends"];
    const itemCategories = ["Appertizer", "Main", "Drinks", "Desserts"];
    return (
      <div>
        <div className="tab time-tab">
          {availableTimes.map(time => {
            return (
              <button
                key={time}
                className={`tablinks ${
                  this.state.time === time.toLowerCase() ? "active" : ""
                }`}
                onClick={() => this.setState({ time: time.toLowerCase() })}
              >
                {time}
              </button>
            );
          })}
        </div>
        <div className="tab category-tab">
          {itemCategories.map(category => {
            return (
              <button
                key={category}
                className={`tablinks ${
                  this.state.category === category.toLowerCase() ? "active" : ""
                }`}
                onClick={() =>
                  this.setState({ category: category.toLowerCase() })
                }
              >
                {category}
              </button>
            );
          })}
        </div>
        <ItemList
          foods={this.state.foodData.filter(
            item => item.category === this.state.category // render item within certain category
          )}
        />
      </div>
    );
  }
}

export default ItemListing;
