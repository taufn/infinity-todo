import React from "react";

import styles from "./todo.module.css";
import { Button, FormField, Input } from "~/app/uikit/components";

type TodoInputProps = {
  onSubmit: () => void;
  onChange: (item: string) => void;
  item: string;
  isLoading?: boolean;
};

const TodoInput: React.FC<TodoInputProps> = ({ isLoading = false, item, onChange, onSubmit }) => {
  const handleOnSubmit: React.FormEventHandler = e => {
    const canSubmit: boolean = typeof item === "string" || item !== "" || !isLoading;
    e.preventDefault();
    if (canSubmit) {
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <div className={styles.comp}>
        <div className={styles.input}>
          <FormField stripped htmlFor="todo-item" label="Create Item">
            <Input
              expanded
              id="todo-item"
              placeholder="Do something magical..."
              disabled={isLoading}
              onChange={e => onChange(e.target.value)}
              value={item}
            />
          </FormField>
        </div>
        <div className={styles.button}>
          <Button expanded type="submit" disabled={(item ?? "") === "" || isLoading}>
            Save
          </Button>
        </div>
      </div>
    </form>
  );
};

export default TodoInput;
