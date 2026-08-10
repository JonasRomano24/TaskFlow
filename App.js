import React, { useState } from "react";

import HomeScreen from "./src/screens/HomeScreen";
import AddTaskScreen from "./src/screens/AddTaskScreen";

export default function App() {

  const [tasks, setTasks] = useState([]);

  const [currentScreen, setCurrentScreen] = useState("home");

  const handleTaskCreated = (newTask) => {

    setTasks((currentTasks) => [
      ...currentTasks,
      newTask,
    ]);

    setCurrentScreen("home");
  };

  if (currentScreen === "add") {

    return (
      <AddTaskScreen
        onTaskCreated={handleTaskCreated}
        onBack={() => setCurrentScreen("home")}
      />
    );
  }

  return (
    <HomeScreen
      tasks={tasks}
      onAddTask={() => setCurrentScreen("add")}
    />
  );
}