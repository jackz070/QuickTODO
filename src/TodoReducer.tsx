import { Todo } from "./types";

export type Actions =
  | { type: "add_todo"; payload: string }
  | { type: "delete_todo"; payload: number }
  | { type: "done_todo"; payload: number }
  | { type: "edit_todo"; payload: any };

export type State = { activeTodos: Todo[]; completedTodos: Todo[] };

export const TodoReducer = (state: State, action: Actions) => {
  switch (action.type) {
    case "add_todo":
      return {
        ...state,
        activeTodos: [
          ...state.activeTodos,
          { id: Date.now(), task: action.payload, isDone: false },
        ],
      };
    case "delete_todo":
      if (state.activeTodos.some((todo) => todo.id === action.payload)) {
        return {
          ...state,
          activeTodos: state.activeTodos.filter(
            (todo) => todo.id !== action.payload
          ),
        };
      } else if (
        state.completedTodos.some((todo) => todo.id === action.payload)
      ) {
        return {
          ...state,
          completedTodos: state.completedTodos.filter(
            (todo) => todo.id !== action.payload
          ),
        };
      }
    case "done_todo":
      if (state.activeTodos.some((todo) => todo.id === action.payload)) {
        return {
          ...state,
          activeTodos: state.activeTodos.map((todo) =>
            todo?.id === action.payload
              ? { ...todo, isDone: !todo.isDone }
              : todo
          ),
        };
      } else if (
        state.completedTodos.some((todo) => todo.id === action.payload)
      ) {
        return {
          ...state,
          completedTodos: state.completedTodos.map((todo) =>
            todo?.id === action.payload
              ? { ...todo, isDone: !todo.isDone }
              : todo
          ),
        };
      }

    case "edit_todo":
      if (state.activeTodos.some((todo) => todo.id === action.payload.id)) {
        return {
          ...state,
          activeTodos: state.activeTodos.map((todo) =>
            todo.id === action.payload.id
              ? { ...todo, task: action.payload.updatedTask }
              : todo
          ),
        };
      } else if (
        state.completedTodos.some((todo) => todo.id === action.payload.id)
      ) {
        return {
          ...state,
          completedTodos: state.completedTodos.map((todo) =>
            todo.id === action.payload.id
              ? { ...todo, task: action.payload.updatedTask }
              : todo
          ),
        };
      }

    default:
      return state;
  }
};
