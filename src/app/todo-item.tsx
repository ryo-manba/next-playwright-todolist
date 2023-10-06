"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faSave } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import type { Todo } from "./todo-list";

type TodoItemProps = {
  todo: Todo;
  toggleComplete: () => void;
  removeTodo: () => void;
  updateTodo: (newContent: string) => void;
};

export const TodoItem = ({
  todo,
  toggleComplete,
  removeTodo,
  updateTodo,
}: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingValue, setEditingValue] = useState(todo.content);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingValue(e.target.value);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    if (editingValue.trim() !== "") {
      updateTodo(editingValue);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <li className="border-b p-2 flex items-center justify-between">
        <input
          type="text"
          value={editingValue}
          onChange={handleEditChange}
          className="border rounded mr-2"
        />
        <button
          onClick={handleSaveClick}
          className="text-blue-500 hover:text-blue-700"
        >
          <FontAwesomeIcon icon={faSave} title="save" />
        </button>
      </li>
    );
  }

  return (
    <li className="border-b p-2 flex items-center justify-between">
      <div className="flex items-center">
        <input
          type="checkbox"
          id={`todoCheckbox-${todo.id}`}
          checked={todo.completed}
          onChange={() => toggleComplete()}
          className="mr-2"
        />
        <label
          htmlFor={`todoCheckbox-${todo.id}`}
          className={todo.completed ? "line-through" : ""}
        >
          {todo.content}
        </label>
      </div>
      <div className="flex items-center gap-x-4">
        <button
          onClick={handleEditClick}
          className="text-yellow-500 hover:text-yellow-700"
        >
          <FontAwesomeIcon icon={faEdit} title="edit" />
        </button>
        <button
          onClick={() => removeTodo()}
          className="text-red-500 hover:text-red-700"
        >
          <FontAwesomeIcon icon={faTrash} title="delete" />
        </button>
      </div>
    </li>
  );
};
