import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export const ItemModal = props => {
  const { isOpen, toggle, addToCart, food } = props;
  const { register, handleSubmit, errors } = useForm();
  const [fillings, setFillings] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const onSubmit = data => {
    console.log(data);
    addToCart(food, data);
    setQuantity(1); // reset quantity to 1
    toggle(); // if submit successfully then close modal
  };
  return (
    <Modal isOpen={isOpen} toggle={toggle} className="">
      {/* "handleSubmit" will validate inputs before invoking "onSubmit" */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader toggle={toggle}>{food.name}</ModalHeader>
        <ModalBody>
          <label>Fillings</label>
          <ul>
            {/* register your input into the hook by invoking the "register" function */}
            {food.variants.length > 0 &&
              food.variants.map((variant, index) => {
                return (
                  <li key={index}>
                    <input
                      type="radio"
                      value={JSON.stringify(variant)}
                      name="fillings"
                      id={variant._id}
                      checked={fillings === index}
                      onChange={() => setFillings(index)}
                      ref={register}
                    />
                    <label
                      className="override-label"
                      onClick={() => setFillings(index)}
                    >
                      {variant.title}
                    </label>
                  </li>
                );
              })}
          </ul>

          <div>
            <label>Additional Info</label>
            <input
              name="additionalInfo"
              placeholder="No pepper"
              ref={register}
            />
          </div>

          <div>
            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              value={quantity}
              ref={register({ min: 1 })}
              readOnly
            />
            {/* errors will return when field validation fails  */}
            {errors.quantity && <span>Minimum number is 1</span>}
            <Button color="primary" onClick={() => setQuantity(quantity + 1)}>
              +
            </Button>
            <Button color="danger" onClick={() => setQuantity(quantity - 1)}>
              -
            </Button>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary">
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
