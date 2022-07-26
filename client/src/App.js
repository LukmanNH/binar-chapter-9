import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GameDetail from "./pages/GameDetail";
import GameList from "./pages/GameList";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./services/firebase";
import AuthContext from "./context/AuthContext";

function App() {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setAuthenticatedUser(user);
    });
  }, []);
  return (
    <>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <AuthContext.Provider value={authenticatedUser}>
        <Router>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/games" element={<GameList />} />
            <Route path="/gameDetail" element={<GameDetail />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </>
  );
}

export default App;
