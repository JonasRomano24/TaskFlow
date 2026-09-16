import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
} from "firebase/auth";

import {
    doc,
    setDoc,
} from "firebase/firestore";

import { auth, db } from "./firebase";

export const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

export const register = async (email, password, firstName, lastName) => {
    const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );

    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        email: user.email,
        createdAt: new Date().toISOString(),
    });

    return userCredential;
};

export const logout = () => signOut(auth);