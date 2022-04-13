import React from "react";
import { useSWRConfig } from "swr";

import { TodoInput } from "../todoinput";
import { TODO_LIST_KEY } from "~/app/core/hooks";
import { todoRepo } from "~/app/repositories";
import { Card } from "~/app/uikit/components";

const CreateTodoInput: React.FC = () => {
  const [item, setItem] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { mutate } = useSWRConfig();

  const handleCreateTodo = React.useCallback(async () => {
    setIsLoading(true);
    await todoRepo.addTodoItem(item);
    setIsLoading(false);
    setItem("");
    mutate(TODO_LIST_KEY, () => todoRepo.getTodoList());
    // TODO: rewrite this in react way
    document.getElementById("todo-input-create")?.focus();
  }, [item, setIsLoading, setItem, mutate]);

  return (
    <Card>
      <TodoInput
        formType="create"
        onSubmit={handleCreateTodo}
        onChange={setItem}
        item={item}
        isLoading={isLoading}
      />
    </Card>
  );
};

export default CreateTodoInput;
