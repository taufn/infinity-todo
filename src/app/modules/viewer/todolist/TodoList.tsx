import React from "react";

import { ViewTodoItem } from "../models";
import TodoListCard from "./TodoListCard";
import styles from "./list.module.css";
import { TodoState } from "~/app/core/contracts";
import { Card, Text } from "~/app/uikit/components";

type TodoListProps = {
  items: ViewTodoItem[];
};

const TodoList: React.FC<TodoListProps> = ({ items }) => {
  const [openList, setOpenList] = React.useState<ViewTodoItem[]>([]);
  const [doneList, setDoneList] = React.useState<ViewTodoItem[]>([]);
  const hasItems = items.length > 0;

  React.useEffect(() => {
    setOpenList(items.filter(item => item.state !== TodoState.Done));
    setDoneList(items.filter(item => item.state === TodoState.Done));
  }, [items, setOpenList, setDoneList]);

  return (
    <div className={styles.comp}>
      {!hasItems && (
        <Card>
          <Text align="center" trim="top bottom">
            No items yet in todo list
          </Text>
        </Card>
      )}
      {hasItems && <TodoListCard list={openList} state="open" />}
      {hasItems && <TodoListCard list={doneList} state="done" />}
    </div>
  );
};

export default TodoList;
