import { useState } from "react";
import AddingPassword from "./AddingPassword";
import { Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import Auth from "./pages/Auth";
import ProtectedRoute from "./widgets/ProtectedRoute";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
