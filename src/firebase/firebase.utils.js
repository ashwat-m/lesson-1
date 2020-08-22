import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyD1o8A8YuOaU-JYc9D60KfhabVsGjl-Cyg",
  authDomain: "react-store-b24c9.firebaseapp.com",
  databaseURL: "https://react-store-b24c9.firebaseio.com",
  projectId: "react-store-b24c9",
  storageBucket: "react-store-b24c9.appspot.com",
  messagingSenderId: "183750607566",
  appId: "1:183750607566:web:2542f7afa74bd35f45469f",
  measurementId: "G-BCVG2QNWXW",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
