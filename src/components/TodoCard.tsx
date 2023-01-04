import React, { useState, useRef, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Actions } from "../TodoReducer";
import { Todo } from "../types";
import { Check, Edit, Trash, DeviceFloppy } from "tabler-icons-react";

import "./TodoCard.css";

interface Props {
  todo: Todo;
  dispatch: React.Dispatch<Actions>;
  index: number;
}

const TodoCard: React.FC<Props> = ({ todo, dispatch, index }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.task);

  const editInputRef = useRef<HTMLTextAreaElement>(null);

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

  useEffect(() => {}, [todo.isDone]);

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`todo_card ${snapshot.isDragging && "todo_card-dragging"}`}
          onSubmit={(e) => handleEdit(todo.id, e)}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          {edit ? (
            <div className="todo_card-edit">
              <textarea
                value={editTodo}
                onChange={(e) => {
                  setEditTodo(e.target.value);
                }}
                ref={editInputRef}
              />
            </div>
          ) : (
            <div className="todo_card-text">{todo.task}</div>
          )}
          <div {...provided.dragHandleProps} className="todo_card-dragHandle">
            ....
          </div>
          <div className={`todo_buttons ${edit ? "todo_buttons-edit" : null}`}>
            {edit ? (
              <div>
                <button
                  type="submit"
                  title="Save changes"
                  className="greenButtonHover"
                >
                  <DeviceFloppy
                    size={20}
                    strokeWidth={2}
                    color={"var(--darkerGray)"}
                  />
                </button>
              </div>
            ) : null}
            <div>
              {!edit && !todo.isDone ? (
                <button
                  onClick={(e) => handleDone(todo.id, e)}
                  title="Mark as done"
                  className={`greenButtonHover`}
                >
                  <Check
                    size={20}
                    strokeWidth={2}
                    color={"var(--darkerGray)"}
                  />
                </button>
              ) : null}
              {!todo.isDone ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    if (!todo.isDone) {
                      if (edit === true) {
                        setEditTodo(todo.task);
                      }
                      setEdit(!edit);
                    }
                  }}
                  title={edit ? "Discard changes" : "Edit task"}
                  className={`${edit && "redButtonHover"}`}
                >
                  <Edit size={20} strokeWidth={2} color={"var(--darkerGray)"} />
                </button>
              ) : null}
              {!edit ? (
                <button
                  onClick={(e) => handleDelete(todo.id, e)}
                  title="Delete task"
                  className="redButtonHover"
                >
                  <Trash
                    size={20}
                    strokeWidth={2}
                    color={"var(--darkerGray)"}
                  />
                </button>
              ) : null}
            </div>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default TodoCard;
