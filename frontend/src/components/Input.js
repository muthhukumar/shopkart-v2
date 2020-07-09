import React from "react";
import "./Input.css";

export default function Input({
  value,
  onChange,
  title,
  placeholder,
  inputType,
  required,
}) {
  return (
    <div className="input-container">
      <label htmlFor={title}>{title}</label>
      <input
        placeholder={placeholder}
        value={value}
        type={inputType}
        required={required}
        onChange={onChange}
      />
    </div>
  );
}
