import React from "react";

import { AppLayout } from "~/app/layouts";
import { CreateTodoInput } from "~/app/modules/editor";
import { TodoList } from "~/app/modules/viewer";
import { ViewTodoItem } from "~/app/modules/viewer/models";
import { Container } from "~/app/uikit/components";

const HomePage: React.FC = () => {
  const sampleItems: ViewTodoItem[] = [
    { id: "unique1", summary: "First item" },
    { id: "unique3", summary: "Another item" },
    { id: "unique6", summary: "What about a very long item description" },
    { id: "unique2", summary: "More item" },
    { id: "unique39", summary: "And many more item" },
    {
      id: "unique123",
      summary: "And one more that has a very long item description it does not fit in two lines",
    },
  ];

  return (
    <>
      <AppLayout>
        <Container>
          <CreateTodoInput />
          <TodoList items={sampleItems} />
        </Container>
      </AppLayout>
    </>
  );
};

export default HomePage;
