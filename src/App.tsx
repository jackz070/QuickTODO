import React, { useReducer, useEffect } from "react";
import { TodoReducer } from "./TodoReducer";
import { InputField } from "./components/TaskInput";
import TodoList from "./components/TodoList";

import { Todo } from "./types";
import { State } from "./TodoReducer";

import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Bulb } from "tabler-icons-react";
import "./App.css";

const App: React.FunctionComponent = () => {
  const initialState: State = { activeTodos: [], completedTodos: [] };

  // Initializer function for useReducer retrieves todos from localStorage if there are any. Empty string in getItem is there for TS to be happy, it's an impossible case (if "todos" are there they will be retrieved, if not state will be set to default by what's in the other part of the expression)
  const initializer = () => {
    return localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos") || "")
      : { activeTodos: [], completedTodos: [] };
  };

  // Declare state from reducer for whole app, to be passed down as prop
  const [state, dispatch] = useReducer(TodoReducer, initialState, initializer);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state));
  }, [state]);

  // Function comes from React Beautiful Drag and Drop
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    // First check if the draggable item is not dropped outside of the lists or in the same list, same index => no change
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    // Then create helpers: the todo that is dragged and copies of state representing both lists. Copies because we don't want to mutate state.
    let add: Todo,
      active: Todo[] = [...state.activeTodos],
      complete: Todo[] = [...state.completedTodos];
    // Step 1: see where the item is picked up from, save it to add variable, remove from source list
    if (source.droppableId === "activeTodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }
    // Step 2: depending on which list it's dropped to set correct isDone state, update correct todo list in reducer state with isDone status so that it displays correct buttons, update temporary copy of correct list
    if (destination.droppableId === "activeTodosList") {
      add.isDone = false;
      dispatch({
        type: "set_active",
        payload: [...state.activeTodos, add],
      });
      active.splice(destination.index, 0, add);
    } else {
      add.isDone = true;
      dispatch({
        type: "set_complete",
        payload: [...state.completedTodos, add],
      });
      complete.splice(destination.index, 0, add);
    }
    // Step 3 update correct piece of state with right copy
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
