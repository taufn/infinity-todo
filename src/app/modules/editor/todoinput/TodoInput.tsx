import React from "react";

import styles from "./tinp.module.css";
import { Button, FormField, Input } from "~/app/uikit/components";
import hooks from "~/libs/hooks";

type TodoInputProps = {
  formType: "create" | "update";
  onSubmit: () => void;
  onChange: (item: string) => void;
  item: string;
  isLoading?: boolean;
  onBlur?: () => void;
};

const TodoInput: React.FC<TodoInputProps> = ({
  formType,
  isLoading = false,
  item,
  onBlur,
  onChange,
  onSubmit,
}) => {
  const formTypeIsUpdate = formType === "update";
  const label: string = formTypeIsUpdate ? "" : "Create Item";
  const [inputFocus, setInputFocus] = React.useState<boolean>(formTypeIsUpdate);
  const [buttonFocus, setButtonFocus] = React.useState<boolean>(false);

  const handleOnSubmit: React.FormEventHandler = e => {
    const canSubmit: boolean = typeof item === "string" || item !== "" || !isLoading;
    e.preventDefault();
    if (canSubmit) {
      onSubmit();
    }
  };

  const withTimeout = (fn: () => void) => () => hooks.useTimeout(fn, 100);

  React.useEffect(() => {
    if (formTypeIsUpdate && typeof onBlur === "function" && !inputFocus && !buttonFocus) {
      onBlur();
    }
  }, [formTypeIsUpdate, inputFocus, buttonFocus]);

  return (
    <form onSubmit={handleOnSubmit}>
      <div className={styles.comp}>
        <div className={styles.input}>
          <FormField stripped htmlFor="todo-item" label={label}>
            <Input
              expanded
              autoFocus
              id="todo-item"
              placeholder="Do something magical..."
              disabled={isLoading}
              value={item}
              onChange={e => onChange(e.target.value)}
              onFocus={() => setInputFocus(true)}
              onBlur={withTimeout(() => setInputFocus(false))}
            />
          </FormField>
        </div>
        <div className={styles.button}>
          <Button
            expanded
            type="submit"
            disabled={(item ?? "") === "" || isLoading}
            onFocus={() => setButtonFocus(true)}
            onBlur={withTimeout(() => setButtonFocus(false))}
          >
            Save
          </Button>
        </div>
      </div>
    </form>
  );
};

export default TodoInput;
