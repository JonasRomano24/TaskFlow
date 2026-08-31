import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    filter: "all", // 'all' | 'pending' | 'completed'
};

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {

        // Recibe { title, description, category } desde el formulario y acá
        // se arma el objeto final: el id único y la fecha de creación los
        // genera el reducer, no el componente que dispara la acción.
        addTask: {
            reducer: (state, action) => {
                state.items.push(action.payload);
            },
            prepare: ({ title, description, category }) => ({
                payload: {
                    id: nanoid(),
                    title,
                    description,
                    category,
                    completed: false,
                    createdAt: new Date().toISOString(),
                },
            }),
        },

        toggleTaskStatus: (state, action) => {
            const task = state.items.find((t) => t.id === action.payload);
            if (task) {
                task.completed = !task.completed;
            }
        },

        deleteTask: (state, action) => {
            state.items = state.items.filter((t) => t.id !== action.payload);
        },

        setFilter: (state, action) => {
            state.filter = action.payload;
        },

    },
});

export const { addTask, toggleTaskStatus, deleteTask, setFilter } = taskSlice.actions;

// Selectores: las pantallas no filtran "a mano", solo leen esto con
// useSelector. Así el componente queda puro y la regla de filtrado
// vive en un solo lugar.
export const selectAllTasks = (state) => state.tasks.items;

export const selectFilter = (state) => state.tasks.filter;

export const selectFilteredTasks = (state) => {
    const { items, filter } = state.tasks;

    if (filter === "pending") {
        return items.filter((t) => !t.completed);
    }

    if (filter === "completed") {
        return items.filter((t) => t.completed);
    }

    return items;
};

export const selectTaskById = (id) => (state) =>
    state.tasks.items.find((t) => t.id === id);

export default taskSlice.reducer;
