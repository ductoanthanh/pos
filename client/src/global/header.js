import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import socketIOClient from "socket.io-client";
import "./header.scss";

// The Header creates links that can be used to navigate
// between routes.
let socket;
class Header extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: `${window.location.hostname}:5000` // Update 5000 with port on which backend is running.
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
                Counter
              </NavLink>
            </li>
            <li>
              <NavLink to="/kitchen"> Kitchen</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export { Header, socket };
