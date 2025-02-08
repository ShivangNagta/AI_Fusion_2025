import React from "react";
import { auth, googleProvider } from "./firebase";
import { signInWithPopup } from "firebase/auth";
import { BrowserRouter as Router } from "react-router-dom";
import { DarkModeProvider } from "./components/DarkModeContext";
import AppRoutes from "./routes/Routes";

const App = () => {

  return (
    <DarkModeProvider>
      <Router>
        <AppRoutes />
      </Router>
    </DarkModeProvider>
  );
};

export default App;