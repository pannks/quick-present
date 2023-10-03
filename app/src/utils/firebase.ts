// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    Timestamp,
    collection,
    deleteDoc,
    doc,
    getDocs,
    getFirestore,
    setDoc,
} from "firebase/firestore";
import { SharedFile } from "../data/type";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDQmGll3lwW3Kyg_tVcXIwewgzM-sb1JCo",
    authDomain: "quick-shared.firebaseapp.com",
    projectId: "quick-shared",
    storageBucket: "quick-shared.appspot.com",
    messagingSenderId: "853583178731",
    appId: "1:853583178731:web:b44e9d75a9f46c73d6c7ae",
    measurementId: "G-RNYSZ8FS02",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export const getSharedFiles = async (): Promise<SharedFile[]> => {
    try {
        const snapshot = await getDocs(collection(db, "shared_file"));
        return snapshot.docs.map(
            (doc) =>
                ({
                    ...doc.data(),
                    id: doc.id,
                } as SharedFile)
        );
    } catch (error) {
        console.error("Error getting shared files:", error);
        throw error;
    }
};

export const createSharedFile = async (
    file: Omit<SharedFile, "share_time">
): Promise<void> => {
    try {
        const newFileRef = doc(collection(db, "shared_file"));
        await setDoc(newFileRef, {
            ...file,
            share_time: Timestamp.now(),
        });
    } catch (error) {
        console.error("Error creating shared file:", error);
        throw error;
    }
};

export const deleteSharedFile = async (docId: string): Promise<void> => {
    try {
        const fileRef = doc(db, "shared_file", docId);
        await deleteDoc(fileRef);
    } catch (error) {
        console.error("Error deleting shared file:", error);
        throw error;
    }
};
