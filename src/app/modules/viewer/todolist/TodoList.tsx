import React from "react";

import { ViewTodoItem } from "../models";
import { TodoItem } from "../todoitem";
import styles from "./list.module.css";
import { Card } from "~/app/uikit/components";

type TodoListProps = {
  items: ViewTodoItem[];
};

const TodoList: React.FC<TodoListProps> = ({ items }) => {
  return (
    <div className={styles.comp}>
      <Card noSpace>
        <ol className={styles.list}>
          {items.map(item => (
            <li key={item.id}>
              <TodoItem item={item} />
            </li>
          ))}
        </ol>
      </Card>
    </div>
  );
};

export default TodoList;
