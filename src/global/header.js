import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import socketIOClient from "socket.io-client";
import "./header.css";

// The Header creates links that can be used to navigate
// between routes.
let socket;
class Header extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "http://localhost:3001/" // Update 3001 with port on which backend-my-app/server.js is running.
    };

    socket = socketIOClient(this.state.endpoint);
  }

  render() {
    return (
      <header>
        <nav>
          <ul className="NavClass">
            <li>
              <NavLink exact to="/">
                Place Order
              </NavLink>
            </li>
            <li>
              <NavLink to="/kitchen"> Kitchen </NavLink>
            </li>
            <li>
              <NavLink to="/kitchen-new"> Kitchen New</NavLink>
            </li>
            <li>
              <NavLink to="/counter"> Counter</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export { Header, socket };
