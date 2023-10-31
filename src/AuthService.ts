// import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  query,
  collection,
  where,
  getDocs,
  addDoc,
  setDoc,
  doc,
} from "firebase/firestore";
// import toast from "react-hot-toast";
import { auth, googleProvider, db } from "./firebase";
import { FirebaseError } from "firebase/app";

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const docs = await getDocs(
      query(collection(db, "users"), where("uid", "==", user.uid))
    ); // fetch db for this userid
    if (docs.docs.length === 0) {
      // add data if no doc exists
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }

    // toast.success(`Signed in as ${user.displayName}!`);
    return res;
  } catch (err) {
    if (err instanceof FirebaseError) {
      console.error(`Error Signing in!\n${err.message}`);
    }
    console.error(err);
  }
  return null;
};

const signUpWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const user = cred.user;
    const docs = await getDocs(
      query(collection(db, "users"), where("uid", "==", user.uid))
    ); // fetch db for this userid
    if (docs.docs.length === 0) {
      // add data if no doc exists
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: name,
        authProvider: "email",
        email: user.email,
      });
    }
    await updateProfile(user, {
      displayName: name,
    });
    await user.reload();
    // toast.success(`Signed in as ${user.email}!`);
    return cred;
  } catch (err: unknown) {
    console.error(err);
    // if (err instanceof FirebaseError) {
    //   toast.error(`Error Creating Account!\n${err.message}`);
    // }
    return null;
  }
};

const loginWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const user = cred.user;
    // toast.success(`Signed in as ${user.email}!`);
    return cred;
  } catch (err: unknown) {
    // if (err instanceof FirebaseError) {
    //   toast.error(`Error Signing in!\n${err.message}`);
    // }
    return null;
  }
};

const logout = async () => {
  await signOut(auth);
};

export {
  signInWithGoogle,
  signUpWithEmailAndPassword,
  loginWithEmailAndPassword,
  logout,
};
