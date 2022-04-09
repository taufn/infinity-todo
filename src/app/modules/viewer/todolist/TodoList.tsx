import React from "react";

import { ViewTodoItem } from "../models";
import { TodoItem } from "../todoitem";
import styles from "./list.module.css";
import { Card, Text } from "~/app/uikit/components";

type TodoListProps = {
  items: ViewTodoItem[];
};

const TodoList: React.FC<TodoListProps> = ({ items }) => {
  const hasItems = items.length > 0;

  return (
    <div className={styles.comp}>
      <Card noSpace={hasItems}>
        {hasItems ? (
          <ol className={styles.list}>
            {items.map(item => (
              <li key={item.id}>
                <TodoItem item={item} />
              </li>
            ))}
          </ol>
        ) : (
          <Text align="center" trim="top bottom">
            No items yet in todo list
          </Text>
        )}
      </Card>
    </div>
  );
};

export default TodoList;
