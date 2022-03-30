import classNames from "classnames";
import React from "react";

import { UIColors, UIDepths } from "../../tokens";
import styles from "./moda.module.css";

type ModalCloseTrigger = "button" | "overlay";
export type ModalProps = {
  isOpen: boolean;
  onTriggerClose: (source: ModalCloseTrigger) => void;
  noLayer?: boolean;
};

const Modal: React.FC<ModalProps> = ({ children, isOpen, noLayer, onTriggerClose }) => {
  const handleTriggerClose = (source: ModalCloseTrigger) => (e: React.SyntheticEvent) => {
    e.stopPropagation();
    onTriggerClose(source);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div
        className={classNames(styles.background, { [styles["bg-transparent"]]: noLayer })}
        onClick={handleTriggerClose("overlay")}
      />
      <div className={classNames(styles.modal, UIColors.bgWhite, UIDepths.shadowMedium)}>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
