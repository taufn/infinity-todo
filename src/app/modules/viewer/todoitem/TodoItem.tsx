import classNames from "classnames";
import React from "react";

import { ViewTodoItem } from "../models";
import styles from "./item.module.css";
import { Button, Checkbox, Text } from "~/app/uikit/components";
import { UIUtilities } from "~/app/uikit/tokens";

type TodoItemProps = {
  item: ViewTodoItem;
};

const TodoItem: React.FC<TodoItemProps> = ({ item }) => {
  const handleAction = (): React.MouseEventHandler<HTMLButtonElement> => e => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className={classNames(UIUtilities.clearfix, styles.comp)}>
      <div className={classNames(UIUtilities.floatLeft, styles.input)}>
        <Checkbox />
      </div>
      <div className={classNames(UIUtilities.floatLeft, styles.summary)}>
        <Text trim="top bottom">{item.summary}</Text>
      </div>
      <div className={classNames(UIUtilities.floatRight, styles.cta)}>
        <Button secondary onClick={handleAction()}>
          <span className={styles["icon-up"]}>&#x27A4;</span>
        </Button>
        <Button secondary onClick={handleAction()}>
          <span className={styles["icon-down"]}>&#x27A4;</span>
        </Button>
        <Button secondary onClick={handleAction()}>
          <span className={styles["icon-erase"]}>&#10010;</span>
        </Button>
      </div>
    </div>
  );
};

export default TodoItem;
