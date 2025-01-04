import React, { useState } from 'react';

export function Todos({ todos, setTodos }) {
  
  const handleMarkComplete = async (id, completed) => {
    try {
      // Send the PUT request to update the completed status
      const response = await fetch(`http://localhost:3000/completed`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id, completed: !completed }), // Toggle the completed status
      });

      if (response.ok) {
        const updatedTodo = await response.json();
        console.log(updatedTodo);

        // Optimistic update to reflect the change immediately in the UI
        setTodos(prevTodos =>
          prevTodos.map(todo =>
            todo._id === id ? { ...todo, completed: !completed } : todo
          )
        );
      } else {
        console.error('Failed to update todo');
      }
    } catch (error) {
      console.error('Error marking todo as complete:', error);
    }
  };
  const handleDelete = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/todo/${id}`, {
            method: 'DELETE',
        });
  
      if (response.ok) {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      } else {
        console.error('Failed to delete todo');
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <ul className="todos">
      {todos.map((todo) => (
        <li key={todo._id} className="todo-item"> {/* Use todo._id for the key */}
          <div className="todo-content">
            <h1 className="todo-title">{todo.title}</h1>
            <h2 className="todo-description">{todo.description}</h2>
          </div>
          <div className="todo-actions">
            {/* Mark as Complete Button */}
            <button
              className="complete-button"
              onClick={() => handleMarkComplete(todo._id, todo.completed)} // Pass the correct ID and completed status
            >
              {todo.completed ? 'Completed' : 'Mark as Complete'}
            </button>
  
            {/* Remove Button */}
            <button
              className="delete-button"
              onClick={() => handleDelete(todo._id)}
            >
              Remove
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
  
}
