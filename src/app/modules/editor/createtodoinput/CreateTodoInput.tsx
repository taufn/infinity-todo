import React from "react";

import { TodoInput } from "../todoinput";
import { Card } from "~/app/uikit/components";

const CreateTodoInput: React.FC = () => {
  const [item, setItem] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleCreateTodo = () => {
    setIsLoading(true);

    const emulator = window.setTimeout(() => {
      window.clearTimeout(emulator);
      // TODO: remove console.log
      // eslint-disable-next-line no-console
      console.log(item);
      setIsLoading(false);
      setItem("");
    }, 2e3);
  };

  return (
    <Card>
      <TodoInput onSubmit={handleCreateTodo} onChange={setItem} item={item} isLoading={isLoading} />
    </Card>
  );
};

export default CreateTodoInput;
