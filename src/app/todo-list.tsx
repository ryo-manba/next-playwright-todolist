"use client";

import { useState, useReducer } from "react";
import { TodoItem } from "./todo-item";

export type Todo = {
  id: number;
  content: string;
  completed: boolean;
};

type Action =
  | { type: "ADD_TODO"; content: string }
  | { type: "REMOVE_TODO"; id: number }
  | { type: "TOGGLE_COMPLETE"; id: number }
  | { type: "UPDATE_TODO"; id: number; newContent: string };

type State = {
  todos: Todo[];
  nextId: number;
};

const todoReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: state.nextId, content: action.content, completed: false },
        ],
        nextId: state.nextId + 1,
      };
    case "REMOVE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.id),
      };
    case "TOGGLE_COMPLETE":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    case "UPDATE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.id ? { ...todo, content: action.newContent } : todo
        ),
      };
    default:
      return state;
  }
};

export const TodoApp = () => {
  const [state, dispatch] = useReducer(todoReducer, { todos: [], nextId: 0 });
  const [inputValue, setInputValue] = useState<string>("");

  const handleAddTodo = (event: React.FormEvent) => {
    event.preventDefault();
    if (inputValue.trim()) {
      dispatch({ type: "ADD_TODO", content: inputValue.trim() });
      setInputValue("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-lg w-full">
      <h1 className="text-2xl font-semibold mb-4">Todo App</h1>
      <form className="mb-4" onSubmit={handleAddTodo}>
        <label
          htmlFor="todoInput"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Todo
        </label>
        <input
          type="text"
          id="todoInput"
          name="todo"
          className="p-2 border rounded w-full"
          value={inputValue}
          onChange={handleInputChange}
        />
      </form>
      <div>
        <ul>
          {state.todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleComplete={() =>
                dispatch({ type: "TOGGLE_COMPLETE", id: todo.id })
              }
              removeTodo={() => dispatch({ type: "REMOVE_TODO", id: todo.id })}
              updateTodo={(newContent: string) =>
                dispatch({ type: "UPDATE_TODO", id: todo.id, newContent })
              }
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
