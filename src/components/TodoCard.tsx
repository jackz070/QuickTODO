import React, { useState, useRef, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Actions } from "../TodoReducer";
import { Todo } from "../types";

import "./TodoCard.css";

interface Props {
  todo: Todo;
  dispatch: React.Dispatch<Actions>;
  index: number;
}

const TodoCard: React.FC<Props> = ({ todo, dispatch, index }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.task);

  const editInputRef = useRef<HTMLInputElement>(null);

  const handleDone = (id: number, e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: "done_todo", payload: id });
  };

  const handleDelete = (id: number, e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: "delete_todo", payload: id });
  };

  const handleEdit = (id: number, e: React.FormEvent) => {
    e.preventDefault();

    dispatch({ type: "edit_todo", payload: { id: id, updatedTask: editTodo } });

    setEdit(false);
  };

  useEffect(() => {
    editInputRef.current?.focus();
  }, [edit]);

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided) => (
        <form
          className="todo_card"
          onSubmit={(e) => handleEdit(todo.id, e)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {edit ? (
            <div>
              <input
                value={editTodo}
                onChange={(e) => {
                  setEditTodo(e.target.value);
                }}
                ref={editInputRef}
              />
              <button type="submit">SAVE</button>
            </div>
          ) : todo.isDone ? (
            <s>{todo.task}</s>
          ) : (
            <div>{todo.task}</div>
          )}

          <div className="todo_buttons">
            <button onClick={(e) => handleDone(todo.id, e)}>Done</button>
            <button
              onClick={(e) => {
                e.preventDefault();
                if (!edit && !todo.isDone) {
                  setEdit(!edit);
                }
              }}
            >
              Edit
            </button>
            <button onClick={(e) => handleDelete(todo.id, e)}>Delete</button>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default TodoCard;
