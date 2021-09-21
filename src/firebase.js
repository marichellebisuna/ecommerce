import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDjD-C97UHpkUVXu0BVJD15nPd1C0vSiNw',
  authDomain: 'ecommerce-89bc8.firebaseapp.com',
  projectId: 'ecommerce-89bc8',
  storageBucket: 'ecommerce-89bc8.appspot.com',
  messagingSenderId: '129666925567',
  appId: '1:129666925567:web:13630ccc0b8c8c5169ddca',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
