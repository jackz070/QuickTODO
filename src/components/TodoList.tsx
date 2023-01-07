import React, { useEffect } from "react";
import { Todo } from "../types";
import TodoCard from "./TodoCard";
import { Actions } from "../TodoReducer";

import "./TodoList.css";
import { Droppable } from "react-beautiful-dnd";

interface Props {
  state: { activeTodos: Todo[]; completedTodos: Todo[] };
  dispatch: React.Dispatch<Actions>;
  activeLength: number;
  completedLength: number;
}

const TodoList: React.FC<Props> = ({
  state,
  dispatch,
  activeLength,
  completedLength,
}) => {
  return (
    <div className="container">
      <div className="todo_list">
        <div className="todo_list-header">
          <h3>Active Tasks</h3>{" "}
          <span data-testid="activeCounter">{activeLength}</span>
        </div>
        <Droppable droppableId="activeTodosList">
          {(provided, snapshot) => (
            <div
              className={`todo_list-active todo_list-side  ${
                snapshot.isDraggingOver && "todo_list-draggingOver"
              }`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {state.activeTodos.length === 0 && (
                <div className="todo_list-empty">
                  There are no active tasks.
                  <br />
                  Try adding one!
                </div>
              )}
              {state?.activeTodos?.map((todo, index) => (
                <TodoCard
                  todo={todo}
                  dispatch={dispatch}
                  index={index}
                  key={todo?.id}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>

      <div className="todo_list">
        <div className="todo_list-header">
          <h3>Completed Tasks</h3>
          <span data-testid="completedCounter">{completedLength}</span>
        </div>
        <Droppable droppableId="completedTodosList">
          {(provided, snapshot) => (
            <div
              className={`todo_list-remove todo_list-side  ${
                snapshot.isDraggingOver && "todo_list-draggingOver"
              }`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {state.completedTodos.length === 0 && (
                <div className="todo_list-empty">
                  No tasks completed yet. <br />
                  Get to work!
                </div>
              )}
              {state?.completedTodos?.map((todo, index) => (
                <TodoCard
                  todo={todo}
                  dispatch={dispatch}
                  key={todo?.id}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default TodoList;
