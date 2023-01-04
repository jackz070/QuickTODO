//@ts-nocheck
// line above here to disable errors related to wrong types inferred by TypeScript for action.payload in "edit_todo" case, where it infers type "number" | (correct object type) which leads to heaps of "property X doesn't exist in type number". It's impossible for action.payload to be number, it;s never dispatched that way and it just doesn't make sense for it to be. StackOverflow and discussion over in TS repo issues suggests that it's their problem.
import { Todo } from "./types";

export type Actions =
  | { type: "add_todo"; payload: string }
  | { type: "delete_todo"; payload: number }
  | { type: "done_todo"; payload: number }
  | { type: "edit_todo"; payload: { id: number; updatedTask: string } }
  | { type: "set_active"; payload: Todo[] }
  | { type: "set_complete"; payload: Todo[] };

export type State = { activeTodos: Todo[]; completedTodos: Todo[] };

// state is updated with all the copies so that it is not mutated. This fixed the problem I had at the beginning with values displayed in the DOM not updating correctly; it turned out that I'm mutating state which makes React not realize it's changing at all as reference stays the same.
export const TodoReducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case "add_todo":
      return {
        activeTodos: [
          ...state.activeTodos,
          { id: Date.now(), task: action.payload.trim(), isDone: false },
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

    case "edit_todo":
      if (state.activeTodos.some((todo) => todo.id === action.payload.id)) {
        return {
          activeTodos: state.activeTodos.map((todo) =>
            todo.id === action.payload.id
              ? { ...todo, task: action.payload.updatedTask.trim() }
              : todo
          ),
          completedTodos: [...state.completedTodos],
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
