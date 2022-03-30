import React from "react";

import { AppLayout } from "~/app/layouts";
import { CreateTodoInput } from "~/app/modules/editor";
import { Container } from "~/app/uikit/components";

const HomePage: React.FC = () => {
  return (
    <>
      <AppLayout>
        <Container>
          <CreateTodoInput />
        </Container>
      </AppLayout>
    </>
  );
};

export default HomePage;
