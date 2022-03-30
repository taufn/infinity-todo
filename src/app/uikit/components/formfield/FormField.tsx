import classNames from "classnames";
import React from "react";

import { Label } from "../label";
import styles from "./ffld.module.css";

type FormFieldProps = {
  label?: string;
  htmlFor?: string;
  stripped?: boolean;
};

const FormField: React.FC<FormFieldProps> = ({ children, label, htmlFor, stripped }) => {
  const classes = classNames(styles.comp, { [styles.stripped]: stripped });
  const labelFor = htmlFor || "";

  return (
    <div className={classes}>
      {label && <Label htmlFor={labelFor}>{label}</Label>}
      {children}
    </div>
  );
};

export default FormField;
