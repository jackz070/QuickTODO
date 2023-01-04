import React, { useReducer, useEffect, useState } from "react";
import { TodoReducer } from "./TodoReducer";
import { InputField } from "./components/TaskInput";
import TodoList from "./components/TodoList";

import { Actions } from "./TodoReducer";
import { Todo } from "./types";
import { State } from "./TodoReducer";

import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Bulb } from "tabler-icons-react";
import "./App.css";

// TODO re active-completed: option A: create second state reducer option B: use same reducer, add second piece of state to it option C: use a simple flag on task for it (sounds bad, if I add more columns it will get messy)

const App: React.FunctionComponent = () => {
  // Declare reducer state for whole app to use

  const initialState: State = { activeTodos: [], completedTodos: [] };

  const initializer = () => {
    return localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos") || "")
      : { activeTodos: [], completedTodos: [] };
  };
  // TODO fix counter AKA state updates, wiggly animation on drop, edit mode UI
  const [state, dispatch] = useReducer(TodoReducer, initialState, initializer);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state));
  }, [state]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add: Todo,
      active: Todo[] = [...state.activeTodos],
      complete: Todo[] = [...state.completedTodos];
    console.log(source, destination, active, complete);

    if (source.droppableId === "activeTodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === "activeTodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    dispatch({ type: "set_active", payload: active });
    dispatch({ type: "set_complete", payload: complete });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="app_container">
        <header className="header">
          <Bulb size={48} strokeWidth={1.9} />
          <h1>QuickTODO</h1>
        </header>
        <main>
          <InputField dispatch={dispatch} />
          <TodoList
            state={state}
            dispatch={dispatch}
            activeLength={state.activeTodos.length}
            completedLength={state.completedTodos.length}
          />
        </main>
      </div>
    </DragDropContext>
  );
};

export default App;
