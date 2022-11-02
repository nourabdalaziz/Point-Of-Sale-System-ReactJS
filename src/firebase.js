import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCSTPGufN_F7CtRvIN9M5ML7g5VmUj1PeU",
  authDomain: "pos-sys-auth.firebaseapp.com",
  projectId: "pos-sys-auth",
  storageBucket: "pos-sys-auth.appspot.com",
  messagingSenderId: "710509271294",
  appId: "1:710509271294:web:b187981f28277cbd58adaf",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
