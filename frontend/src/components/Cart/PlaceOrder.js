import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import "./PlaceOrder.css";
import Input from "../Input";
import {
  closeBackdropAction,
  NotifyAction,
} from "../../redux/ErrorHandlerStore/actionCreators";

export default function ({ onClick }) {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();

  const saveDetails = (data) => {
    onClick(data);
    dispatch(NotifyAction("Order Placed"));
    dispatch(closeBackdropAction());
  };
  const closeModal = () => {
    onClick();
    dispatch(closeBackdropAction());
  };

  return (
    <div className="place-order_container">
      <h4>Delivery Address</h4>
      <div className="delivery-address">
        <form onSubmit={handleSubmit(saveDetails)}>
          <Input
            title="Name"
            placeholder="Name"
            inputType="text"
            ref={register({
              required: true,
              minLength: 4,
              pattern: /^[A-Za-z]+$/i,
            })}
            error={errors.Name && "Name should be atleast 4 characters"}
          />
          <Input
            title="PhoneNumber"
            placeholder="Phone number"
            inputType="tel"
            ref={register({
              required: true,
              minLength: 10,
              pattern: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im,
              maxLength: 10,
            })}
            error={errors.PhoneNumber && "Please enter valid Phone number"}
          />
          <Input
            placeholder="Pincode"
            title="Pincode"
            inputType="text"
            ref={register({
              required: true,
              minLength: 6,
            })}
            error={errors.Pincode && "Please enter valid pincode"}
          />
          <Input
            placeholder="address"
            inputType="textarea"
            title="Address"
            ref={register({ required: true })}
            error={errors.Address && "Please enter valid address"}
          />
          <Input
            placeholder="city"
            inputType="text"
            title="City"
            ref={register({ required: true })}
            error={errors.City && "Please enter valid city"}
          />
          <div className="button-container">
            <button type="submit">confirm & place order</button>
            <button onClick={closeModal}>cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
