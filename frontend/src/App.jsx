import { useState, useEffect } from 'react';
import './App.css';
import { CreateTodo } from './components/CreateTodo';
import { Todos } from './components/Todos';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/todos")
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const json = await res.json();
        setTodos(json); 
      })
      .catch((error) => console.error('Error fetching todos:', error));
  }, []);


  const [greeting, setGreeting] = useState('');
  useEffect(() => {
    fetch('http://localhost:3000/greeting')
      .then((response) => response.json())
      .then((data) => setGreeting(data.greeting))
      .catch((error) => console.error('Error fetching greeting:', error));
  }, []);

  return (
    <div>
      <h1>TODO APP</h1>
      <h2>{greeting}</h2>
      <CreateTodo setTodos= {setTodos} todos= {todos}></CreateTodo>
      <Todos todos={todos} setTodos={setTodos} />
    </div>
  )
}

export default App
