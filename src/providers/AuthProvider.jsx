import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import auth from "../firebase/firebase.config"; 
import axios from "axios";

export const authContext = createContext();

const AuthProvider = ({ children }) => {
  const googleProvider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleRegister = (email, password, name, photoURL) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const newUser = userCredential.user;

        updateProfile(newUser, {
          displayName: name,
          photoURL: photoURL,
        }).then(() => {
          setUser({
            uid: newUser.uid,
            email: newUser.email,
            displayName: newUser.displayName,
            photoURL: newUser.photoURL,
          });

          axios
            .get(`http://localhost:5000/api/users/${newUser.uid}`)
            .then((response) => {
              console.log("User already exists:", response.data);
            })
            .catch(() => {
              axios
                .post("http://localhost:5000/api/users", {
                  email: newUser.email,
                  name: newUser.displayName,
                  photoURL: newUser.photoURL,
                  role: "student", 
                  uid: newUser.uid, 
                })
                .then((response) => {
                  console.log("User data saved:", response.data);
                })
                .catch((error) => {
                  console.error("Error saving user data:", error);
                });
            });
        });
      });
  };

  const handleLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const handleGoogleLogin = () => {
    return signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;

        axios
          .get(`http://localhost:5000/api/users/${user.uid}`)
          .then((response) => {
            console.log("User already exists:", response.data);
          })
          .catch(() => {
            axios
              .post("http://localhost:5000/api/users", {
                email: user.email,
                name: user.displayName,
                photoURL: user.photoURL,
                role: "student", 
                uid: user.uid,
              })
              .then((response) => {
                console.log("User data saved:", response.data);
              })
              .catch((error) => {
                console.error("Error saving user data:", error);
              });
          });
      });
  };

  const sendPasswordResetEmailHandler = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const handleLogout = () => {
    return signOut(auth);
  };

  const manageProfile = (name, image) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: image,
    })
      .then(() => {
        setUser((prevUser) => ({
          ...prevUser,
          displayName: name,
          photoURL: image,
        }));
      })
      .catch((error) => {
        console.log("Error updating profile:", error);
        throw error;
      });
  };

  const authInfo = {
    handleRegister,
    handleLogin,
    handleGoogleLogin,
    handleLogout,
    manageProfile,
    sendPasswordResetEmail: sendPasswordResetEmailHandler,
    user,
    setUser,
    loading,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(true);
      if (currentUser?.email) {
        setUser({
          uid: currentUser.uid, 
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL, 
        });
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <authContext.Provider value={authInfo}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
