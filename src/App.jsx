import React, { useState, useEffect } from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import SearchBar from "./components/SearchBar";
import AddTaskForm from "./components/AddTaskForm";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleToggleTask = async (taskId) => {
    try {
      const completedAt = new Date().toISOString();
      const updatedTasks = tasks.map((task) =>
        task._id === taskId
          ? {
              ...task,
              completed: !task.completed,
              completedAt: !task.completed ? completedAt : null,
            }
          : task,
      );

      setTasks(updatedTasks);

      const updatedTask = updatedTasks.find((task) => task._id === taskId);
      await axios.put(`http://localhost:5000/tasks/${taskId}`, updatedTask);
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  };

  const handleAddTask = async (taskName) => {
    try {
      const response = await axios.post("http://localhost:5000/tasks", {
        taskName,
        completed: false,
      });

      setTasks((prevTasks) => [...prevTasks, response.data]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleDeleteAllTasks = async () => {
    if (window.confirm("Are you sure you want to delete all tasks?")) {
      try {
        await axios.delete("http://localhost:5000/tasks");
        setTasks([]);
      } catch (error) {
        console.error("Error deleting tasks:", error);
      }
    }
  };

  const filteredTasks = tasks.filter((task) =>
    task.taskName.toLowerCase().includes(searchText.toLowerCase()),
  );

  const sortTasksByName = (taskA, taskB) =>
    taskA.taskName.toLowerCase().localeCompare(taskB.taskName.toLowerCase());

  const todoTasks = filteredTasks
    .filter((task) => !task.completed)
    .sort(sortTasksByName);

  const doneTasks = filteredTasks
    .filter((task) => task.completed)
    .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
    .slice(0, 10)
    .sort(sortTasksByName);

  return (
    <div className="App">
      <div className="container">
        <h2>Marvelous v2.0</h2>
        <div className="item-container">
          <button className="delete-button" onClick={handleDeleteAllTasks}>
            Delete all tasks
          </button>
        </div>
      </div>
      <div className="container">
        <div className="item-container">
          <AddTaskForm onAddTask={handleAddTask} />
        </div>
        <div className="item-container">
          <SearchBar searchText={searchText} setSearchText={setSearchText} />
        </div>
      </div>

      <div className="container">
        <div className="list-container">
          <h3>To Do</h3>
          <TodoList tasks={todoTasks} onToggleTask={handleToggleTask} />
        </div>
        <div className="list-container">
          <h3>Done</h3>
          <TodoList tasks={doneTasks} onToggleTask={handleToggleTask} />
        </div>
      </div>
    </div>
  );
}

export default App;
