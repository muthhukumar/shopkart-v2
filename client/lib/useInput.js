import { useState } from "react";

export default () => {
  const [value, setValue] = useState("");

  const onInputChange = (event) => {
    setValue(event.target.value);
  };

  return [value, onInputChange];
};
