import classNames from "classnames";
import React from "react";

import styles from "./appl.module.css";
import { BasePage } from "~/app/uikit/components";

const AppLayout: React.FC = ({ children }) => {
  return <BasePage className={classNames(styles.comp)}>{children}</BasePage>;
};

export default AppLayout;
