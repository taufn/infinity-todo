import React from "react";
import { useSWRConfig } from "swr";

import { TodoInput } from "../todoinput";
import { TODO_LIST_KEY } from "~/app/core/hooks";
import { todoRepo } from "~/app/repositories";

type UpdateTodoInputProps = {
  currentID: string;
  currentValue: string;
  onSubmit: (item: string) => void;
  onAbort: () => void;
};

const UpdateTodoInput: React.FC<UpdateTodoInputProps> = ({
  currentID,
  currentValue,
  onAbort,
  onSubmit,
}) => {
  const [item, setItem] = React.useState<string>(currentValue);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { mutate } = useSWRConfig();

  const handleUpdateTodo = React.useCallback(async () => {
    if (item === "currentValue") {
      return;
    }

    setIsLoading(true);
    await todoRepo.editTodoItem(currentID, { summary: item });
    setIsLoading(false);
    onSubmit(item);
    mutate(TODO_LIST_KEY, () => todoRepo.getTodoList());
  }, [item, setIsLoading, onSubmit, mutate]);

  return (
    <TodoInput
      formType="update"
      onSubmit={handleUpdateTodo}
      onChange={setItem}
      item={item}
      isLoading={isLoading}
      onBlur={onAbort}
    />
  );
};

export default UpdateTodoInput;
