import React from "react";
import { Todo } from "../types";
import TodoCard from "./TodoCard";
import { Actions } from "../TodoReducer";

import "./TodoList.css";
import { Droppable } from "react-beautiful-dnd";

interface Props {
  state: { activeTodos: Todo[]; completedTodos: Todo[] };
  dispatch: React.Dispatch<Actions>;
}

const TodoList: React.FC<Props> = ({ state, dispatch }) => {
  return (
    <div className="container">
      <div>
        <h3>Active Tasks</h3>
        <Droppable droppableId="activeTodosList">
          {(provided) => (
            <div
              className="todo_list todo_list-active"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
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

      <div>
        <h3>Completed Tasks</h3>
        <Droppable droppableId="completedTodosList">
          {(provided) => (
            <div
              className="todo_list todo_list-remove"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
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
