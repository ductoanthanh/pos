import React, { useState, createContext } from "react";

export const VibamiContext = createContext();

export const VibamiProvider = props => {
  const [cart, setCart] = useState({});
  const [sideView, setSideView] = useState("orders-manage");
  const [selectedOrder, setSelectedOrder] = useState({});

  const modifyCart = cart => {
    setCart({ ...cart });
  };

  return (
    <VibamiContext.Provider
      value={{
        cart,
        modifyCart,
        sideView,
        setSideView,
        selectedOrder,
        setSelectedOrder
      }}
    >
      {props.children}
    </VibamiContext.Provider>
  );
};

export const VibamiConsumer = VibamiContext.Consumer;
