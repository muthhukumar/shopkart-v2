import { useState } from "react";

export default (initialValue) => {
  const [value, setValue] = useState(initialValue || "");
  const onInputChange = (event) => {
    setValue(event.target.value);
  };
  return [value, onInputChange];
};
