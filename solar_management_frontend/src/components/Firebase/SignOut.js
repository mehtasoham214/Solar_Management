import React from "react";
import { logout } from "./../../store/features/auth/authSlice";
import firebaseApp from "./../firebase/Firebase";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const SignOut = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  if (!auth.user) {
    return <Navigate to={`/`} />;
  }

  const logOut = async () => {
    window.localStorage.removeItem("token");
    firebaseApp
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        dispatch(logout());
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };
  logOut();
  return (
    <div>
      <h2>Sign Out</h2>
    </div>
  );
};

export default SignOut;
