import React, { Component } from "react";
import "./App.css";
import { Header } from "./global/header";
import { Switch, Route } from "react-router-dom";

import PlaceOrder from "./main/PlaceOrder";
import UpdatePredicted from "./main/UpdatePredicted";
import Kitchen from "./main/Kitchen";
import OrderListing from "./components/order/order-listing/OrderListing";
import Counter from "./components/counter/Counter";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={PlaceOrder} />
          <Route path="/updatepredicted" component={UpdatePredicted} />
          <Route path="/kitchen-new" component={OrderListing} />
          <Route path="/kitchen" component={Kitchen} />
          <Route path="/counter" component={Counter} />
        </Switch>
      </div>
    );
  }
}

export default App;
