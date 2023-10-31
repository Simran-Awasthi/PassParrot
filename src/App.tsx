import { useState } from "react";
import AddingPassword from "./AddingPassword";
import { Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import Auth from "./pages/Auth";
import ProtectedRoute from "./widgets/ProtectedRoute";
import { Sign } from "crypto";
import SignUp from "./pages/SignUp";
import AccountInfo from "./pages/AccountInfo";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/signup" element={<SignUp />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/account-info"
          element={
            <ProtectedRoute>
              <AccountInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/account-info"
          element={
            <ProtectedRoute>
              <AccountInfo />
            </ProtectedRoute>
          }
        />

        <Route
          path="/addfriends"
          element={
            <ProtectedRoute>
              <AccountInfo />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
