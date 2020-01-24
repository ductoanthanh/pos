import React, { Component } from "react";
import "./App.scss";
import { Header } from "./global/header";
import { Switch, Route } from "react-router-dom";
import { OrderListing } from "./components/order/order-listing/OrderListing";
import { Counter } from "./pages/counter/Counter";
import axios from "axios";

class App extends Component {
  state = {
    values: ""
  };

  componentDidMount() {
    this.fetchValues();
  }

  async fetchValues() {
    const values = await axios.get("/api");
    this.setState({ values: values.data });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="main-pane">
          <p>{this.state.values}</p>
          <Switch>
            <Route exact path="/" component={Counter} />
            <Route path="/kitchen" component={OrderListing} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
