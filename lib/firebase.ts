import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // <-- добавили Firestore

const firebaseConfig = {
  apiKey: "AIzaSyDmrcsDwn1_PJ4QPjHJAV59PA8W9pZYpZo",
  authDomain: "competitor-monitor-c0339.firebaseapp.com",
  projectId: "competitor-monitor-c0339",
  storageBucket: "competitor-monitor-c0339.firebasestorage.app",
  messagingSenderId: "1076902905436",
  appId: "1:1076902905436:web:656866b02c08834dcec899"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app); // <-- экспортируем Firestore