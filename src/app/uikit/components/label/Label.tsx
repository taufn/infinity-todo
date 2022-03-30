import React from "react";

import styles from "./labl.module.css";
import strings from "~/libs/strings";

export type LabelProps = { children: string; htmlFor?: string };

const Label: React.FC<LabelProps> = ({ children, htmlFor }) => {
  const labelFor = htmlFor || "";
  return (
    <label className={styles.comp} htmlFor={labelFor}>
      {strings.capitalize(children, { eachWord: true })}
    </label>
  );
};

export default Label;
