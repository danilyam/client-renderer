import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const SERVER_URL = 'https://render-test-gzhv.onrender.com';

  // Получение списка задач с сервера
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/todos`);
        setTodos(response.data);
      } catch (error) {
        console.error("Ошибка при получении задач:", error);
      }
    };

    fetchTodos();
  }, []);

  // Добавление новой задачи
  const addTodo = async () => {
    if (newTodo.trim()) {
      try {
        const response = await axios.post(`${SERVER_URL}/todos`, { title: newTodo });
        setTodos([...todos, response.data]);
        setNewTodo('');
      } catch (error) {
        console.error("Ошибка при добавлении задачи:", error);
      }
    }
  };

  // Удаление задачи по ID
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${SERVER_URL}/todos/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error("Ошибка при удалении задачи:", error);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Новая задача"
        style={{ padding: '10px', width: '100%', marginBottom: '10px' }}
      />
      <button onClick={addTodo} style={{ padding: '10px', width: '100%' }}>Добавить задачу</button>

      <ul style={{ listStyle: 'none', padding: '0', marginTop: '20px' }}>
        {todos.map((todo) => (
          <li key={todo.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #ccc' }}>
            <span>{todo.title}</span>
            <button onClick={() => deleteTodo(todo.id)} style={{ padding: '5px 10px' }}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
