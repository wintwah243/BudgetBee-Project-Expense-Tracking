import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";
import UserProvider from './context/userContext';
import PasswordReset from './components/PasswordReset';
import ForgotPassword from './components/ForgotPassword';
import { Toaster } from "react-hot-toast";
import UserInfo from './components/Dashboard/UserInfo';
import Welcome from './pages/Dashboard/Welcome';
import GoogleAuthCallback from './pages/Auth/GoogleAuthCallback';

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/dashboard" element={<RequireAuth><Home /></RequireAuth>} />
          <Route path="/income" element={<RequireAuth><Income /></RequireAuth>} />
          <Route path="/expense" element={<RequireAuth><Expense /></RequireAuth>} />
          <Route path="/userinfo" element={<RequireAuth><UserInfo /></RequireAuth>} />
          <Route path="/password-reset" element={<PasswordReset />} />
          <Route path="/forgotpassword/:id/:token" element={<ForgotPassword />} />
          <Route path="/google-auth" element={<GoogleAuthCallback />} />
        </Routes>
      </Router>

      <Toaster toastOptions={{ style: { fontSize: '13px' } }} />
    </UserProvider>
  );
};

const RequireAuth = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token");

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};


export default App;
