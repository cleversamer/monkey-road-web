import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCjl0VJDO8ea-7pWcvEzo6p0R6LSYw38Zk",
  authDomain: "monkey-road.firebaseapp.com",
  projectId: "monkey-road",
  storageBucket: "monkey-road.appspot.com",
  messagingSenderId: "462310581267",
  appId: "1:462310581267:web:1a962bf4f4f1c1532a0be6",
  measurementId: "G-J1ZVHLV488",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
