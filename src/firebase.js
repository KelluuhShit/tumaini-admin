import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBUj7ODPZzRbNU17KVO3DmAY5R43X5wPXQ",
  authDomain: "portfolio-f9c03.firebaseapp.com",
  projectId: "portfolio-f9c03",
  storageBucket: "portfolio-f9c03.firebasestorage.app",
  messagingSenderId: "920375923735",
  appId: "1:920375923735:web:3f1b9c12fbe10a7ede7852",
  measurementId: "G-W6PRGJH8H5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };