import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAgWjzsufYBki8zV-rhND4bH7EPuni5zgU",
  authDomain: "besolve-3286d.firebaseapp.com",
  databaseURL: "https://besolve-3286d.firebaseio.com",
  projectId: "besolve-3286d",
  storageBucket: "besolve-3286d.appspot.com",
  messagingSenderId: "509715205753",
  appId: "1:509715205753:web:46460b099911dddb720ea8",
  measurementId: "G-6CGX5VW9CK"
};

  const app = firebase.initializeApp(firebaseConfig);
  export const auth = app.auth();
  export const firestore = app.firestore();
  export const storage = app.storage();
  