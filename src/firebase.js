import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore  } from "firebase/firestore";
import { getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
 apiKey: "AIzaSyAnxhOJkGzCMxsGq3txpqdcfUDbKxmZnAQ",
  authDomain: "traviweb-peru.firebaseapp.com",
  projectId: "traviweb-peru",
  storageBucket: "traviweb-peru.appspot.com",
  messagingSenderId: "42392203234",
  appId: "1:42392203234:web:3acfaec0f9d2ad04f153bb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db=getFirestore(app)
export const storage = getStorage(app)
