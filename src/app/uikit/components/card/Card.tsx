import classNames from "classnames";
import React from "react";

import styles from "./card.module.css";

type CardProps = {
  className?: string;
  expanded?: boolean;
  noSpace?: boolean;
};

const Card: React.FC<CardProps> = ({ children, className, expanded, noSpace }) => {
  return (
    <div
      className={classNames(
        styles.comp,
        { [styles.expanded]: expanded, [styles["no-space"]]: noSpace },
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Card;
