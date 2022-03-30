import classNames from "classnames";
import React from "react";

import styles from "./appl.module.css";
import { BasePage } from "~/app/uikit/components";
import { UIColors } from "~/app/uikit/tokens";

const AppLayout: React.FC = ({ children }) => {
  return <BasePage className={classNames(styles.comp, UIColors.bgBlueGrey50)}>{children}</BasePage>;
};

export default AppLayout;
