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

  React.useEffect(() => {
    setOpenList(items.filter(item => item.state !== TodoState.Done));
    setDoneList(items.filter(item => item.state === TodoState.Done));
  }, [items, setOpenList, setDoneList]);

  return (
    <div className={styles.comp}>
      {items.length < 1 && (
        <Card>
          <Text align="center" trim="top bottom">
            No items yet in todo list
          </Text>
        </Card>
      )}
      {openList.length > 0 && <TodoListCard list={openList} state="open" />}
      {doneList.length > 0 && <TodoListCard list={doneList} state="done" />}
    </div>
  );
};

export default TodoList;
