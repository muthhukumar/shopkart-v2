import React from "react";
import "./Input.css";

export default React.forwardRef(
  ({ title, placeholder, inputType, error }, ref) => {
    return (
      <div className="input-container">
        <label htmlFor={title}>{title}</label>
        <input
          placeholder={placeholder}
          ref={ref}
          name={title}
          type={inputType}
        />
        <p>{error}</p>
      </div>
    );
  }
);
