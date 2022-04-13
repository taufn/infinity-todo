import classNames from "classnames";
import React from "react";
import { useSWRConfig } from "swr";

import { UpdateTodoInput } from "../../editor";
import { ViewTodoItem } from "../models";
import styles from "./item.module.css";
import { TODO_LIST_KEY } from "~/app/core/hooks";
import { todoRepo } from "~/app/repositories";
import { Button, Checkbox, Text } from "~/app/uikit/components";
import { UIUtilities } from "~/app/uikit/tokens";

type TodoItemProps = {
  item: ViewTodoItem;
};

const TodoItem: React.FC<TodoItemProps> = ({ item }) => {
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const { mutate } = useSWRConfig();

  const handleAction = React.useCallback(
    (action: "move_up" | "move_down" | "remove") =>
      async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (action === "remove") {
          await todoRepo.removeTodoItem(item.id);
        } else {
          await todoRepo.moveTodoItem(item.id, action === "move_up" ? "up" : "down");
        }
        mutate(TODO_LIST_KEY, () => todoRepo.getTodoList());
      },
    [item, mutate],
  );

  return (
    <div className={classNames(UIUtilities.clearfix, styles.comp, { [styles["is-edit"]]: isEdit })}>
      {isEdit ? (
        <UpdateTodoInput
          currentID={item.id}
          currentValue={item.summary}
          onSubmit={() => setIsEdit(false)}
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
            <Button secondary squared onClick={handleAction("move_up")}>
              <span className={styles["icon-up"]}>&#x27A4;</span>
            </Button>
            <Button secondary squared onClick={handleAction("move_down")}>
              <span className={styles["icon-down"]}>&#x27A4;</span>
            </Button>
            <Button secondary squared onClick={handleAction("remove")}>
              <span className={styles["icon-erase"]}>&#10010;</span>
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoItem;
