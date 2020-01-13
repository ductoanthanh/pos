import React, { Component } from "react";
import "./App.css";
import { Header } from "./global/header";
import { Switch, Route } from "react-router-dom";
import OrderListing from "./components/order/order-listing/OrderListing";
import Counter from "./components/counter/Counter";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={Counter} />
          <Route path="/kitchen" component={OrderListing} />
        </Switch>
      </div>
    );
  }
}

export default App;
