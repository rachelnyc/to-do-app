import React from "react";
import Task from "./Task";

const TodoList = ({ tasks, onToggleTask }) => {
  return (
    <div>
      {tasks.map((task) => (
        <Task key={task._id} task={task} onToggle={onToggleTask} />
      ))}
    </div>
  );
};

export default TodoList;
