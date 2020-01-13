import React, { Component } from "react";
import { FoodList } from "./FoodList";
import { socket } from "../../global/header";

class FoodListing extends Component {
  constructor() {
    super();
    this.state = {
      foodData: [] // connect to sockets,
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
    return (
      <div>
        <FoodList foods={this.state.foodData} />
      </div>
    );
  }
}

export default FoodListing;
