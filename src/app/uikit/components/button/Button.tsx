import classNames from "classnames";
import React from "react";

import styles from "./button.module.css";

type ButtonSize = "big";
export type ButtonModifierProps = {
  secondary?: boolean;
  bordered?: boolean;
  expanded?: boolean;
  size?: ButtonSize;
};
export type ButtonProps = ButtonModifierProps &
  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({
  bordered,
  className,
  expanded,
  onClick,
  secondary,
  size,
  type,
  ...props
}) => {
  const classes = classNames(
    styles.comp,
    // style
    {
      [styles.secondary]: secondary,
      [styles.bordered]: bordered,
      [styles.disabled]: props.disabled,
    },
    // modifier
    { [styles.expanded]: expanded, [styles.big]: size === "big" },
    className,
  );

  return (
    <button
      {...props}
      type={type || "button"}
      className={classes}
      onClick={props.disabled ? e => e.preventDefault() : onClick}
    />
  );
};

export default Button;
