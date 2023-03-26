// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyBQmBCtyfU_NOkuSM8sj4e4p66fVf5gXwk",
    authDomain: "solar-manager-fccd4.firebaseapp.com",
    projectId: "solar-manager-fccd4",
    storageBucket: "solar-manager-fccd4.appspot.com",
    messagingSenderId: "798151230370",
    appId: "1:798151230370:web:9a9ce3aae1785d858828fb",
    measurementId: "G-BSVLQ70M8J",
};
// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
