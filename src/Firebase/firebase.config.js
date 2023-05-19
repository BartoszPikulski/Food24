
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAA3Am2xzDSwvw7W1oIUKoQWe5LtPH-crs",
  authDomain: "food24-94f35.firebaseapp.com",
  projectId: "food24-94f35",
  storageBucket: "food24-94f35.appspot.com",
  messagingSenderId: "848707085500",
  appId: "1:848707085500:web:27d515fcef7e86eb4a9cb9",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
