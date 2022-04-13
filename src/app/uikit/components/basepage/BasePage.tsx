import classNames from "classnames";
import React from "react";
import { Helmet } from "react-helmet-async";

import styles from "./page.module.css";

type BasePageProps = {
  className?: string;
  title?: string;
};

const BasePage: React.FC<BasePageProps> = ({ children, className, title }) => {
  const classes: string = classNames(styles.comp, className);
  let pageTitle = "Infinity";

  if (typeof title === "string" && title.length > 0) {
    pageTitle += ` - ${title}`;
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <div className={classes}>{children}</div>
    </React.Fragment>
  );
};

export default BasePage;
