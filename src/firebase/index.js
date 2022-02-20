import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB5GgtGcOX-TXCb7dMUUsqweZC8yc_XFls",
  authDomain: "gallery-953fa.firebaseapp.com",
  projectId: "gallery-953fa",
  storageBucket: "gallery-953fa.appspot.com",
  messagingSenderId: "1045938552621",
  appId: "1:1045938552621:web:a1c4c217f0a1982c82dda4"
};

// init firebase
const app = initializeApp(firebaseConfig);

// get firebase auth instance
const auth = getAuth();

// get firebase firestore instance
const db = getFirestore(app);

// get firebase storage instance
const storage = getStorage(app);

export { app as default, auth, db, storage };
