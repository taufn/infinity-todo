import React from "react";

import { useTodoList } from "~/app/core/hooks";
import { AppLayout } from "~/app/layouts";
import { CreateTodoInput } from "~/app/modules/editor";
import { TodoList } from "~/app/modules/viewer";
import { Container } from "~/app/uikit/components";

const HomePage: React.FC = () => {
  const result = useTodoList();

  return (
    <>
      <AppLayout>
        <Container>
          <CreateTodoInput />
          {result.state === "success" && <TodoList items={result.data} />}
        </Container>
      </AppLayout>
    </>
  );
};

export default HomePage;
