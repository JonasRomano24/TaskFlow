import {
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";

import { db } from "./firebase";

const tasksCollection = collection(db, "tasks");

export const getTasks = async () => {
    const snapshot = await getDocs(tasksCollection);

    return snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
    }));
};

export const createTask = async (task) => {
    const documentRef = await addDoc(tasksCollection, task);

    return {
        id: documentRef.id,
        ...task,
    };
};

export const updateTask = async (id, changes) => {
    const taskRef = doc(db, "tasks", id);

    await updateDoc(taskRef, changes);

    return {
        id,
        ...changes,
    };
};

export const removeTask = async (id) => {
    const taskRef = doc(db, "tasks", id);

    await deleteDoc(taskRef);

    return id;
};