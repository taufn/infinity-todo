import React from "react";

import styles from "./home.module.css";
import { useTodoList } from "~/app/core/hooks";
import { AppLayout } from "~/app/layouts";
import { CreateTodoInput } from "~/app/modules/editor";
import { TodoList } from "~/app/modules/viewer";
import { Container } from "~/app/uikit/components";

const HomePage: React.FC = () => {
  const result = useTodoList();

  return (
    <>
      <AppLayout className={styles.page}>
        <div className={styles.input}>
          <Container>
            <CreateTodoInput />
          </Container>
        </div>
        <div className={styles.list}>
          <Container>{result.state === "success" && <TodoList items={result.data} />}</Container>
        </div>
      </AppLayout>
    </>
  );
};

export default HomePage;
