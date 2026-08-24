import React, { createContext, useContext, useState } from "react";

// Esto es un puente simple hasta el Módulo 6 (Redux Toolkit), donde este
// Context va a ser reemplazado por un store central.
const TasksContext = createContext(null);

export const TasksProvider = ({ children }) => {

    const [tasks, setTasks] = useState([]);

    const addTask = (newTask) => {

        setTasks((currentTasks) => [
            ...currentTasks,
            newTask,
        ]);
    };

    return (
        <TasksContext.Provider value={{ tasks, addTask }}>
            {children}
        </TasksContext.Provider>
    );
};

export const useTasks = () => {

    const context = useContext(TasksContext);

    if (!context) {
        throw new Error("useTasks debe usarse dentro de un TasksProvider");
    }

    return context;
};
