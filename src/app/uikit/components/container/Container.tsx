import classNames from "classnames";
import React from "react";

import styles from "./cont.module.css";

type ContainerProps = {
  className?: string;
};

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return <div className={classNames(styles.comp, className)}>{children}</div>;
};

export default Container;
