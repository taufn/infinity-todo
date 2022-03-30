import classNames from "classnames";
import React from "react";

import { UIColors, UIDepths } from "../../tokens";
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
        UIColors.bgWhite,
        UIDepths.shadowShallow,
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Card;
