import React from "react";

import { TodoInput } from "../todoinput";

type UpdateTodoInputProps = {
  currentID: string;
  currentValue: string;
  onSubmit: (item: string) => void;
  onAbort: () => void;
};

const UpdateTodoInput: React.FC<UpdateTodoInputProps> = ({ currentValue, onAbort, onSubmit }) => {
  const [item, setItem] = React.useState<string>(currentValue);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleUpdateTodo = () => {
    setIsLoading(true);

    const emulator = window.setTimeout(() => {
      window.clearTimeout(emulator);
      onSubmit(item);
      setIsLoading(false);
    }, 2e3);
  };

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
