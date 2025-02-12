import React from "react";
import FirestoreData from "./components/FirestoreData"; // Adjust the path
import styles from './App.css';

const App = () => {
  return (
    <div>
      <h2 className={styles.header}>KopaKash Admin</h2>
      <FirestoreData />
    </div>
  );
};

export default App;
