// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDf7zzBhB6Fr9iWlW6BBzSUJzx-Do08Geg",
  authDomain: "binarc9.firebaseapp.com",
  projectId: "binarc9",
  storageBucket: "binarc9.appspot.com",
  messagingSenderId: "49461714632",
  appId: "1:49461714632:web:a998e5a63bf05ed7d64ffd",
  databaseURL:
    "https://binarc9-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const storage = getStorage(app);
const db = getDatabase(app);
export { auth, storage, db };
export default app;
