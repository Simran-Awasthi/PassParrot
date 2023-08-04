import { auth } from "@/firebase";
import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  let navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log(user);
      if (!user) {
        // return <Navigate to="/auth"></Navigate>;
        navigate("/auth");
      }
    });
    return unsubscribe;
  }, []);

  return children;
};

export default ProtectedRoute;
