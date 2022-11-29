import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";
import "firebase/performance";
var firebaseConfig = {
  apiKey: "AIzaSyBjHXwDZafkJiHEYGhUsk7bf5YCDp4ozeY",
  authDomain: "discord-clone-b635c.firebaseapp.com",
  projectId: "discord-clone-b635c",
  storageBucket: "discord-clone-b635c.appspot.com",
  messagingSenderId: "408323592696",
  appId: "1:408323592696:web:f1815a21fdec0a5e04860d",
  measurementId: "G-WT8LKTQFW7"
};
firebase.initializeApp(firebaseConfig);
export const firestore = firebase.firestore();
export default firebase;
export const auth = firebase.auth();
export const storage = firebase.storage();
export const perf = firebase.performance();
export const db = firebase.database();
export const Googleprovider = new firebase.auth.GoogleAuthProvider();
// const signinWithGithub=()=>{
//   const provider=new firebase.auth.GithubAuthProvider();
//   auth.signInWithPopup(provider).catch(alert);
// }
export const CreateUserProfileDocument = () => {
  const userRef = firestore.collection("users").doc(auth.currentUser.uid);
  userRef.set(
    {
      username: auth.currentUser.displayName,
      useremail: auth.currentUser.email,
      userphoto: auth.currentUser.photoURL,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      roles: {},
    },
    { merge: true }
  );
};
