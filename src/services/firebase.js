import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyArOJ-EHzapFUpZ7-a_VLsxa4FOEC9bRc4",
    authDomain: "taskflow-414e7.firebaseapp.com",
    projectId: "taskflow-414e7",
    storageBucket: "taskflow-414e7.firebasestorage.app",
    messagingSenderId: "979403278990",
    appId: "1:979403278990:web:005582f390a56c31a317df",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;