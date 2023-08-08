import React, { useState } from "react";

const AddTaskForm = ({ onAddTask }) => {
  const [newTaskName, setNewTaskName] = useState("");

  const addTask = () => {
    if (newTaskName.trim() !== "") {
      onAddTask(newTaskName);
      setNewTaskName("");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  return (
    <div className="add-task-container">
      <input
        type="text"
        placeholder="Enter task name..."
        value={newTaskName}
        onChange={(e) => setNewTaskName(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={addTask}>Add</button>
    </div>
  );
};

export default AddTaskForm;
