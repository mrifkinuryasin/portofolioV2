// firebase.js
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAiTDZf60Yza0us2fzuX_UCHj40AVfWm6U",
  authDomain: "portfolio-ef09a.firebaseapp.com",
  projectId: "portfolio-ef09a",
  storageBucket: "portfolio-ef09a.firebasestorage.app",
  messagingSenderId: "965627315723",
  appId: "1:965627315723:web:1faf234e451758a21ba90e",
  measurementId: "G-0J2DKMVGKR"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
  db,
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
};
