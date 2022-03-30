import classNames from "classnames";
import React from "react";

import styles from "./input.module.css";

export type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & { expanded?: boolean; flat?: boolean };

const Input: React.FC<InputProps> = ({ className, expanded, flat, type, ...props }) => {
  const classes = classNames(
    styles.comp,
    { [styles.expanded]: expanded },
    { [styles.flat]: flat },
    className,
  );

  return <input {...props} className={classes} type={type || "text"} />;
};

export default Input;
