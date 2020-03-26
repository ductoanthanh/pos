import React from "react";
import { NavLink } from "react-router-dom";
import "./header.scss";

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

export { Header };
