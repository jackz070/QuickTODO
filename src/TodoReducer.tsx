//@ts-nocheck
import { Todo } from "./types";

export type Actions =
  | { type: "add_todo"; payload: string }
  | { type: "delete_todo"; payload: number }
  | { type: "done_todo"; payload: number }
  | { type: "edit_todo"; payload: { id: number; updatedTask: string } }
  | { type: "set_active"; payload: Todo[] }
  | { type: "set_complete"; payload: Todo[] };

export type State = { activeTodos: Todo[]; completedTodos: Todo[] };

export const TodoReducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case "add_todo":
      return {
        activeTodos: [
          ...state.activeTodos,
          { id: Date.now(), task: action.payload, isDone: false },
        ],
        completedTodos: [...state.completedTodos],
      };
    case "delete_todo":
      if (state.activeTodos.some((todo) => todo.id === action.payload)) {
        return {
          activeTodos: state.activeTodos.filter(
            (todo) => todo.id !== action.payload
          ),
          completedTodos: [...state.completedTodos],
        };
      } else if (
        state.completedTodos.some((todo) => todo.id === action.payload)
      ) {
        return {
          activeTodos: [...state.activeTodos],
          completedTodos: state.completedTodos.filter(
            (todo) => todo.id !== action.payload
          ),
        };
      }
    case "done_todo":
      const thisTodo = state.activeTodos.find(
        (todo) => todo.id === action.payload
      );

      if (thisTodo !== undefined) {
        return {
          activeTodos: state.activeTodos.filter(
            (todo) => todo.id !== action.payload
          ),
          completedTodos: [
            ...state.completedTodos,
            { id: thisTodo?.id, task: thisTodo?.task, isDone: true },
          ],
        };
      }
    // if (state.activeTodos.some((todo) => todo.id === action.payload)) {
    //   return {
    //     activeTodos: state.activeTodos.map((todo) =>
    //       todo?.id === action.payload
    //         ? { ...todo, isDone: !todo.isDone }
    //         : todo
    //     ),
    //     completedTodos: [...state.completedTodos],
    //   };
    // } else if (
    //   state.completedTodos.some((todo) => todo.id === action.payload)
    // ) {
    //   return {
    //     activeTodos: [...state.activeTodos],
    //     completedTodos: state.completedTodos.map((todo) =>
    //       todo?.id === action.payload
    //         ? { ...todo, isDone: !todo.isDone }
    //         : todo
    //     ),
    //   };
    // }

    case "edit_todo":
      if (state.activeTodos.some((todo) => todo.id === action.payload.id)) {
        return {
          activeTodos: state.activeTodos.map((todo) =>
            todo.id === action.payload.id
              ? { ...todo, task: action.payload.updatedTask }
              : todo
          ),
          completedTodos: [...state.completedTodos],
        };
      } else if (
        state.completedTodos.some((todo) => todo.id === action.payload.id)
      ) {
        return {
          activeTodos: [...state.activeTodos],
          completedTodos: state.completedTodos.map((todo) =>
            todo.id === action.payload.id
              ? { ...todo, task: action.payload.updatedTask }
              : todo
          ),
        };
      }

    case "set_active":
      return {
        activeTodos: action.payload,
        completedTodos: [...state.completedTodos],
      };
    case "set_complete":
      return {
        activeTodos: [...state.activeTodos],
        completedTodos: action.payload,
      };
    default:
      return state;
  }
};
