import React from "react";

import { TasksProvider } from "./src/context/TasksContext";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {

    return (
        <TasksProvider>
            <AppNavigator />
        </TasksProvider>
    );
}
