import classNames from "classnames";
import React from "react";

import { ViewTodoItem } from "../models";
import { TodoItem } from "../todoitem";
import styles from "./list.module.css";
import { Card } from "~/app/uikit/components";

type TodoListCardProps = {
  list: ViewTodoItem[];
  state: "open" | "done";
};

const TodoListCard: React.FC<TodoListCardProps> = ({ list, state }) => {
  return (
    <Card
      noSpace
      className={classNames(styles.card, {
        [styles["card-open"]]: state === "open",
        [styles["card-done"]]: state === "done",
      })}
    >
      <ol className={styles.list}>
        {list.map(item => (
          <li key={item.id}>
            <TodoItem item={item} />
          </li>
        ))}
      </ol>
    </Card>
  );
};

export default TodoListCard;
