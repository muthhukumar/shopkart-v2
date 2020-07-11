import React, { useState } from "react";
import { useDispatch } from "react-redux";

import "./PlaceOrder.css";
import Input from "../Input";
import useInput from "../../lib/input-hook";
import {
  closeBackdropAction,
  NotifyAction,
} from "../../redux/ErrorHandlerStore/actionCreators";

export default function ({ onClick }) {
  const dispatch = useDispatch();
  const [name, setName] = useInput();
  const [phonenumber, setPhonenumber] = useInput();
  const [pincode, setPincode] = useInput();
  const [address, setAddress] = useInput();
  const [city, setCity] = useInput();
  const [formData, setformData] = useState({});

  const saveDetails = (event) => {
    event.preventDefault();
    setformData({
      name,
      phonenumber,
      pincode,
      address,
      city,
    });
    onClick(formData);
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
        <form onSubmit={saveDetails}>
          <Input
            title="Name"
            required={true}
            placeholder="Name"
            inputType="text"
            value={name}
            onChange={setName}
          />
          <Input
            required={true}
            title="Phone Number"
            placeholder="Phone number"
            inputType="tel"
            value={phonenumber}
            onChange={setPhonenumber}
          />
          <Input
            required={true}
            placeholder="Pincode"
            title="Pincode"
            inputType="text"
            value={pincode}
            onChange={setPincode}
          />
          <Input
            required={true}
            placeholder="address"
            inputType="textarea"
            title="Address"
            value={address}
            onChange={setAddress}
          />
          <Input
            required={true}
            placeholder="city"
            inputType="text"
            value={city}
            title="City"
            onChange={setCity}
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
