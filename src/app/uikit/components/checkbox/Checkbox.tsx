import React from "react";

import { Input, InputProps } from "../input";

type CheckboxProps = Omit<InputProps, "type">;

const Checkbox: React.FC<CheckboxProps> = ({ ...props }) => {
  return <Input {...props} type="checkbox" />;
};

export default Checkbox;
