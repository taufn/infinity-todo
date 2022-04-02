import classNames from "classnames";
import React from "react";

import { UpdateTodoInput } from "../../editor";
import { ViewTodoItem } from "../models";
import styles from "./item.module.css";
import { Button, Checkbox, Text } from "~/app/uikit/components";
import { UIUtilities } from "~/app/uikit/tokens";

type TodoItemProps = {
  item: ViewTodoItem;
};

const TodoItem: React.FC<TodoItemProps> = ({ item }) => {
  const [isEdit, setIsEdit] = React.useState<boolean>(false);

  const handleAction = (): React.MouseEventHandler<HTMLButtonElement> => e => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleUpdateItem = (item: string) => {
    // TODO: remove console.log
    // eslint-disable-next-line no-console
    console.log(item);
    setIsEdit(false);
  };

  return (
    <div className={classNames(UIUtilities.clearfix, styles.comp, { [styles["is-edit"]]: isEdit })}>
      {isEdit ? (
        <UpdateTodoInput
          currentID={item.id}
          currentValue={item.summary}
          onSubmit={handleUpdateItem}
          onAbort={() => setIsEdit(false)}
        />
      ) : (
        <>
          <div className={classNames(UIUtilities.floatLeft, styles.input)}>
            <Checkbox />
          </div>
          <div
            className={classNames(UIUtilities.floatLeft, styles.summary)}
            onClick={() => setIsEdit(true)}
          >
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
        </>
      )}
    </div>
  );
};

export default TodoItem;
