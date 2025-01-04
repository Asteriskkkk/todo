import { useState } from 'react';

export function CreateTodo({ setTodos, todos }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTodo = async () => {
    const newTodo = { title, description };

    try {
      const response = await fetch('http://localhost:3000/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      });
      if (response.ok) {
        const result = await response.json();
        setTodos([...todos, result]); // Update the todos list with the new todo
        setTitle('');
        setDescription('');
      } else {
        console.error('Failed to add todo:', response.statusText);
      }
    } catch (error) {
      console.error('Error while adding todo:', error);
    }
  };  
  

  return (
    <div className="create-todo">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      
      <button onClick={handleAddTodo}>Add Todo</button>
    </div>
  );
}
