import React, { useReducer, useEffect, useState } from "react";
import { TodoReducer } from "./TodoReducer";
import { InputField } from "./components/TaskInput";
import TodoList from "./components/TodoList";

import { Actions } from "./TodoReducer";
import { Todo } from "./types";
import { State } from "./TodoReducer";

import { DragDropContext, DropResult } from "react-beautiful-dnd";

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

  const [state, dispatch] = useReducer(TodoReducer, initialState, initializer);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state));
  }, [state]);

  const onDragEnd = (result: DropResult) => {
    console.log(result);

    const { source, destination } = result;
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }

    let add,
      active = state.activeTodos,
      complete = state.completedTodos;

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
    // TODO how to do this with my usereducer dispatch???
    state.completedTodos = complete;
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="app_container">
        <header className="header">Toodoo appoo</header>
        <main>
          <InputField dispatch={dispatch} />
          <TodoList state={state} dispatch={dispatch} />
        </main>
      </div>
    </DragDropContext>
  );
};

export default App;
