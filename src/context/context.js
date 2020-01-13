import React, { useState, createContext } from "react";

export const VibamiContext = createContext();

export const VibamiProvider = props => {
  const [cart, setCart] = useState({});

  const modifyCart = cart => {
    setCart({ ...cart });
  };

  return (
    <VibamiContext.Provider
      value={{
        cart,
        modifyCart
      }}
    >
      {props.children}
    </VibamiContext.Provider>
  );
};

export const VibamiConsumer = VibamiContext.Consumer;
