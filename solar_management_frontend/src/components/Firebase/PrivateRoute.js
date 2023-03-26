import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = (props) => {
  const auth = useSelector((state) => state.auth);
  console.log("auth" + auth);
  console.log("loading" + auth.loading);
  console.log(!auth.loading && (auth.user === null ? <Navigate to="/signIn" /> : <Outlet />));
  return auth.user === null ? <Navigate to="/signIn" /> : <Outlet />;
};

export default PrivateRoute;
