import React, { Component } from "react";
import "./App.scss";
import { Header } from "./global/header";
import { Switch, Route } from "react-router-dom";
import { OrderListing } from "./components/order/order-listing/OrderListing";
import { Counter } from "./pages/counter/Counter";

const App = () => {
  return (
    <div className="App">
      <Header />
      <div className="main-pane">
        <Switch>
          <Route exact path="/" component={Counter} />
          <Route path="/kitchen" component={OrderListing} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
