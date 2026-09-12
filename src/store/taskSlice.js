import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
    getTasks,
    createTask,
    updateTask,
    removeTask,
} from "../services/taskService";

const initialState = {
    items: [],
    filter: "all",
    loading: false,
    error: null,
};

// Cargar tareas desde Firestore
export const fetchTasks = createAsyncThunk(
    "tasks/fetchTasks",
    async (_, { rejectWithValue }) => {
        try {
            return await getTasks();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Crear tarea en Firestore
export const addTask = createAsyncThunk(
    "tasks/addTask",
    async ({ title, description, category }, { rejectWithValue }) => {
        try {
            const task = {
                title,
                description,
                category,
                completed: false,
                createdAt: new Date().toISOString(),
            };

            return await createTask(task);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Cambiar estado de una tarea
export const toggleTaskStatus = createAsyncThunk(
    "tasks/toggleTaskStatus",
    async ({ id, completed }, { rejectWithValue }) => {
        try {
            await updateTask(id, {
                completed: !completed,
            });

            return {
                id,
                completed: !completed,
            };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Eliminar tarea
export const deleteTask = createAsyncThunk(
    "tasks/deleteTask",
    async (id, { rejectWithValue }) => {
        try {
            await removeTask(id);

            return id;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const taskSlice = createSlice({
    name: "tasks",
    initialState,

    reducers: {
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
    },

    extraReducers: (builder) => {

        // =========================
        // CARGAR TAREAS
        // =========================

        builder
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
                state.error = action.payload;
            });


        // =========================
        // CREAR TAREA
        // =========================

        builder
            .addCase(addTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(addTask.fulfilled, (state, action) => {
                state.loading = false;
                state.items.push(action.payload);
            })

            .addCase(addTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });


        // =========================
        // CAMBIAR ESTADO
        // =========================

        builder
            .addCase(toggleTaskStatus.fulfilled, (state, action) => {

                const task = state.items.find(
                    (item) => item.id === action.payload.id
                );

                if (task) {
                    task.completed = action.payload.completed;
                }
            })

            .addCase(toggleTaskStatus.rejected, (state, action) => {
                state.error = action.payload;
            });


        // =========================
        // ELIMINAR
        // =========================

        builder
            .addCase(deleteTask.fulfilled, (state, action) => {

                state.items = state.items.filter(
                    (task) => task.id !== action.payload
                );
            })

            .addCase(deleteTask.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { setFilter } = taskSlice.actions;


// =========================
// SELECTORES
// =========================

export const selectAllTasks = (state) =>
    state.tasks.items;

export const selectFilter = (state) =>
    state.tasks.filter;

export const selectLoading = (state) =>
    state.tasks.loading;

export const selectError = (state) =>
    state.tasks.error;

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

export const selectTaskById = (id) => (state) =>
    state.tasks.items.find(
        (task) => task.id === id
    );

export default taskSlice.reducer;