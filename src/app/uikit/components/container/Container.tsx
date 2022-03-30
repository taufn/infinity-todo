import React from "react";

import styles from "./cont.module.css";

const Container: React.FC = ({ children }) => {
  return <div className={styles.comp}>{children}</div>;
};

export default Container;
