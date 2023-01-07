import { describe, test, expect } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

describe("Initial app view is alright", () => {
  test("App mounts properly, header and todo input are displayed, counters in both lists display 0", () => {
    const app = render(<App />);
    expect(app).toBeTruthy();
    expect(app.getByRole("heading", { level: 1 }).textContent).toBe(
      "QuickTODO"
    );
    expect(app.getByRole("textbox")).toBeTruthy();
    expect(app.getByTestId("activeCounter").textContent).toBe("0");
    expect(app.getByTestId("completedCounter").textContent).toBe("0");
  });
});

describe("add todo functionality works", () => {
  test("it's not possible to add an empty todo", async () => {
    const app = render(<App />);
    const user = userEvent.setup();
    const todoInput = app.getByRole("textbox");
    await user.click(todoInput);
    fireEvent.submit(todoInput);
    await waitFor(() => {
      expect(app.getByText("Task can't be empty")).toBeTruthy();
    });
  });
  test("it's possible to add a new todo and delete it", async () => {
    const app = render(<App />);
    const user = userEvent.setup();
    const exampleTaskText = "Test task";

    const todoInput = app.getByRole("textbox");
    await user.click(todoInput);

    await user.keyboard(exampleTaskText);
    fireEvent.submit(todoInput);

    await waitFor(() => {
      expect(app.getByTestId("activeCounter").textContent).toBe("1");
      expect(app.getByText(exampleTaskText).textContent).toBe(exampleTaskText);
    });
    screen.debug();
    const deleteButton = app.getByTitle("Delete task");
    expect(deleteButton).toBeTruthy();
    await user.click(deleteButton);
    await waitFor(() => {
      expect(app.getByTestId("activeCounter").textContent).toBe("0");
    });
  });
});
