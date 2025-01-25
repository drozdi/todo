import { initializeApp } from "firebase/app";
import { Database, getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD__qc9aW80nUADwHwlsKvPGFuodz_v91k",
  authDomain: "todo-a3334.firebaseapp.com",
  projectId: "todo-a3334",
  storageBucket: "todo-a3334.appspot.com",
  messagingSenderId: "447288052677",
  appId: "1:447288052677:web:7139e09fb174bbe72419ac",
  databaseURL: 'https://todo-a3334-default-rtdb.europe-west1.firebasedatabase.app/'
};
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app); 