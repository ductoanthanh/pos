import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import socketIOClient from "socket.io-client";
import "./header.scss";

const socket = socketIOClient();

const Header = () => {
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
};

export { Header, socket };
