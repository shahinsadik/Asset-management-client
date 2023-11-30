import { createContext, useEffect, useState } from "react";

import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

// import useAxiosPublic from './../Hooks/useAxiosPublic';
import app from './../Config/firebase.config';
export const AuthContext = createContext(null);
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

//   const axiosPublic = useAxiosPublic()


  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    setLoading(true);
    signOut(auth);
  };
  const updateUserProfile = (name, photo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    //   if (currentUser) {
    //     // get token and store
    //     const userInfo ={email: currentUser.email}
    //     axiosPublic.post('/jwt', userInfo)
    //     .then(res=>{
          
    //       if(res.data.token){
    //         localStorage.setItem('access-token', res.data.token);
    //       }
    //     })
    //   } else {
    //     localStorage.removeItem('access-token')
    //   }
      setLoading(false);
    });

    return unSubscribe;
  }, 
//   [axiosPublic]
  );
  const AuthInfo = {
    user,
    loading,
    createUser,
    signInUser,
    logOut,
    updateUserProfile,
    signInGoogle,
  };
  return (
    <AuthContext.Provider value={AuthInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
