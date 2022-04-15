import classNames from "classnames";
import React from "react";

import styles from "./appl.module.css";
import { BasePage } from "~/app/uikit/components";

type AppLayoutProps = {
  className?: string;
};

const AppLayout: React.FC<AppLayoutProps> = ({ children, className }) => {
  return <BasePage className={classNames(styles.comp, className)}>{children}</BasePage>;
};

export default AppLayout;
