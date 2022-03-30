import React from "react";

import { AppLayout } from "~/app/layouts";
import { Container } from "~/app/uikit/components";

const HomePage: React.FC = () => {
  return (
    <>
      <AppLayout>
        <Container>Homepage</Container>
      </AppLayout>
    </>
  );
};

export default HomePage;
