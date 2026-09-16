import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
    getTasks,
    createTask,
    updateTask,
    removeTask,
    subscribeToTasks,
} from "../services/taskService";

export const fetchTasks = createAsyncThunk(
    "tasks/fetchTasks",
    async (userId) => {
        return await getTasks(userId);
    }
);

export const addTask = createAsyncThunk(
    "tasks/addTask",
    async ({ task, userId }) => {
        const newTask = {
            ...task,
            userId,
            completed: false,
            createdAt: new Date().toISOString(),
        };

        return await createTask(newTask);
    }
);

export const toggleTaskStatus = createAsyncThunk(
    "tasks/toggleTaskStatus",
    async ({ id, completed }) => {
        return await updateTask(id, {
            completed: !completed,
        });
    }
);

export const deleteTask = createAsyncThunk(
    "tasks/deleteTask",
    async (id) => {
        return await removeTask(id);
    }
);

const initialState = {
    items: [],
    filter: "all",
    loading: false,
    error: null,
};

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
    setFilter: (state, action) => {
        state.filter = action.payload;
    },

    setTasks: (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.error = null;
    },
},
    extraReducers: (builder) => {
        builder

            // FETCH TASKS
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })

            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // TOGGLE TASK
            .addCase(toggleTaskStatus.fulfilled, (state, action) => {
                const index = state.items.findIndex(
                    (task) => task.id === action.payload.id
                );

                if (index !== -1) {
                    state.items[index] = {
                        ...state.items[index],
                        ...action.payload,
                    };
                }
            })

            // DELETE TASK
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.items = state.items.filter(
                    (task) => task.id !== action.payload
                );
            });
    },
});

export const { setFilter, setTasks } = taskSlice.actions;

export const selectFilteredTasks = (state) => {
    const { items, filter } = state.tasks;

    if (filter === "pending") {
        return items.filter((task) => !task.completed);
    }

    if (filter === "completed") {
        return items.filter((task) => task.completed);
    }

    return items;
};

export const selectFilter = (state) => state.tasks.filter;

export const selectTaskById = (state, id) =>
    state.tasks.items.find((task) => task.id === id);

export default taskSlice.reducer;