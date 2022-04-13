import classNames from "classnames";
import React from "react";
import { useSWRConfig } from "swr";

import styles from "./tsbn.module.css";
import { TodoState } from "~/app/core/contracts";
import { TODO_LIST_KEY } from "~/app/core/hooks";
import { todoRepo } from "~/app/repositories";
import { Button } from "~/app/uikit/components";

type TodoStateButtonProps = {
  itemID: string;
  state: TodoState;
};

const stateTranslation: Record<TodoState, string> = {
  [TodoState.Open]: "Open",
  [TodoState.Ongoing]: "Ongoing",
  [TodoState.Done]: "Done",
};

const TodoStateButton: React.FC<TodoStateButtonProps> = ({ itemID, state }) => {
  const { mutate } = useSWRConfig();

  const handleToggleState = React.useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();

      switch (state) {
        case TodoState.Open:
          await todoRepo.editTodoItem(itemID, { state: TodoState.Ongoing });
          break;

        case TodoState.Ongoing:
          await todoRepo.editTodoItem(itemID, { state: TodoState.Done });
          break;

        case TodoState.Done:
          await todoRepo.editTodoItem(itemID, { state: TodoState.Open });
          break;

        default:
          break;
      }
      mutate(TODO_LIST_KEY, () => todoRepo.getTodoList());
    },
    [mutate, itemID, state],
  );

  return (
    <Button
      secondary
      expanded
      className={classNames(styles.comp, {
        [styles.open]: state === TodoState.Open,
        [styles.done]: state === TodoState.Done,
      })}
      onClick={handleToggleState}
    >
      {stateTranslation[state]}
    </Button>
  );
};

export default TodoStateButton;
