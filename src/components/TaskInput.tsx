import { useRef, useState } from "react";
import { Actions } from "../TodoReducer";

import { Plus } from "tabler-icons-react";

import "./TaskInput.css";

interface Props {
  dispatch: React.Dispatch<Actions>;
}

export const InputField = ({ dispatch }: Props) => {
  const [todo, setTodo] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      dispatch({ type: "add_todo", payload: todo });
      setTodo("");
    }
  };

  return (
    <form
      className="input"
      onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur();
      }}
    >
      <input
        type="input"
        placeholder="Add a task"
        className="input_box"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        ref={inputRef}
      />
      <button className="input_submit" type="submit" title="Create task">
        <Plus size={48} strokeWidth={2.5} color={"var(--blue)"} />
      </button>
    </form>
  );
};
