import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export const ItemModal = props => {
  const { isOpen, toggle, addToCart, food } = props;
  const { register, handleSubmit, errors } = useForm();
  console.log(food);
  const onSubmit = data => {
    addToCart(food);
    console.log(data);
  };
  return (
    <Modal isOpen={isOpen} toggle={toggle} className="">
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}

          <label>Fillings</label>
          <ul>
            <li>
              <input
                type="radio"
                value="e-bill"
                name="billing_method"
                id="billing_method-1"
              />
              <label className="override-label">E-lasku</label>
            </li>
            <li>
              <input
                type="radio"
                value="paper-bill"
                name="billing_method"
                id="billing_method-2"
              />
              <label className="override-label">Paperilasku</label>
            </li>
          </ul>

          {/* register your input into the hook by invoking the "register" function */}
          <div>
            <label>Special Instructions</label>
            <input name="instructions" defaultValue="test" ref={register} />
          </div>

          <div>
            <label>Quantity</label>
            <input name="exampleRequired" ref={register} />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            <input type="submit" value="Add To Order" />
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};
